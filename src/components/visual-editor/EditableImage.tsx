"use client";

import { useMemo, useState, useRef, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Camera, Loader2, Check, X } from "lucide-react";
import { useEditMode } from "./EditModeContext";
import { getByPath } from "@/lib/visual-data/setByPath";
import imageCompression from 'browser-image-compression';

type Props = {
  path: string;
  fallback: string;
  alt: string;
  className?: string;
  imgClassName?: string;
};

type UploadStatus = "idle" | "uploading" | "done" | "error";

export function EditableImage({ path, fallback, alt, className = "", imgClassName = "" }: Props) {
  const { isEditMode, applyPatch, visualContent, pageSlug } = useEditMode();

  const baseValue = useMemo(() => {
    const resolved = getByPath<unknown>(visualContent as Record<string, unknown>, path);
    if (resolved === undefined || resolved === null) return fallback;
    return String(resolved);
  }, [visualContent, path, fallback]);

  const [status, setStatus] = useState<UploadStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  if (!isEditMode) {
    return (
      <div className={className}>
        <img alt={alt} className={imgClassName} src={baseValue} />
      </div>
    );
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg("Unsupported file format! Please convert RAW/CR3 files to JPEG, PNG, or WEBP before uploading.");
      setSelectedFile(null);
      setPreview(null);
      setStatus("idle");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setStatus("idle");
    setErrorMsg("");
  }

  async function upload() {
    if (!selectedFile) return;
    setStatus("uploading");
    setErrorMsg("");
    
    try {
      // 1. Compress the image client-side
      const options = {
        maxSizeMB: 3.5, // Keep it under Vercel's 4.5MB limit
        maxWidthOrHeight: 2500, // Large enough for retina displays, prevents 8k uploads from breaking
        useWebWorker: true,
      };
      
      const compressedBlob = await imageCompression(selectedFile, options);
      // Convert Blob back to File
      const compressedFile = new File([compressedBlob], selectedFile.name, {
        type: compressedBlob.type,
        lastModified: Date.now(),
      });

      // 2. Upload to Server
      const formData = new FormData();
      formData.set("file", compressedFile);
      formData.set("path", path);
      formData.set("slug", pageSlug);

      const res = await fetch("/api/admin/upload-image", { method: "POST", body: formData });
      const payload = await res.json();
      if (!res.ok) throw new Error(payload.message || "Upload failed");

      // 3. Save the new Cloudinary URL to the database
      const dbRes = await fetch("/api/admin/visual-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, value: payload.url, slug: pageSlug }),
      });
      if (!dbRes.ok) throw new Error("Database save failed");

      applyPatch(path, payload.url);
      setStatus("done");
      setTimeout(() => { setShowModal(false); setStatus("idle"); setPreview(null); setSelectedFile(null); }, 1000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Upload failed");
    }
  }

  function cancel() { setShowModal(false); setPreview(null); setSelectedFile(null); setStatus("idle"); setErrorMsg(""); }

  return (
    <>
      {/* Image with edit overlay */}
      <div 
        className={`relative inline-block ${className}`} 
        style={{ cursor: "pointer", display: "inline-block" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        <img alt={alt} className={imgClassName} src={baseValue} />
        
        <span 
          style={{
            position: "absolute", top: "8px", right: "8px", zIndex: 10,
            display: "flex", alignItems: "center", gap: "4px",
            background: "#2563eb", color: "#fff", padding: "6px 10px",
            borderRadius: "20px", fontSize: "12px", fontWeight: "bold",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)", pointerEvents: "none"
          }}
        >
          <Camera size={14} />
          Change
        </span>
      </div>

      {/* Upload modal with inline styles */}
      {showModal && mounted && createPortal(
        <div
          onClick={(e) => { if (e.target === e.currentTarget) cancel(); }}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 300,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)", padding: "20px"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: "450px", maxHeight: "90vh", overflowY: "auto",
              background: "#ffffff", borderRadius: "16px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              display: "flex", flexDirection: "column", color: "#000"
            }}
          >
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderBottom: "1px solid #e5e7eb", padding: "16px 20px"
            }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "900", margin: 0, color: "#0f172a" }}>Replace Image</h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748b" }}>
                  Uploading for: <strong>{alt}</strong>
                </p>
              </div>
              <button
                onClick={cancel}
                type="button"
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "32px", height: "32px", borderRadius: "50%", background: "#f1f5f9",
                  border: "none", cursor: "pointer", color: "#475569"
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: "24px" }}>
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                  border: "2px dashed #cbd5e1", borderRadius: "16px", background: "#f8fafc",
                  padding: "24px", cursor: "pointer", transition: "background 0.2s"
                }}
              >
                {preview ? (
                  <img alt="Preview" src={preview} style={{ maxHeight: "200px", width: "100%", objectFit: "contain", borderRadius: "8px" }} />
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <Camera size={40} color="#94a3b8" style={{ margin: "0 auto 8px" }} />
                    <p style={{ fontSize: "14px", fontWeight: "bold", color: "#475569", margin: 0 }}>Tap to choose image</p>
                    <p style={{ fontSize: "12px", color: "#94a3b8", margin: "4px 0 0 0" }}>PNG, JPG, WEBP · max 5MB</p>
                  </div>
                )}
                <input accept="image/*" style={{ display: "none" }} onChange={onFileChange} ref={fileInputRef} type="file" />
              </div>

              {errorMsg && (
                <p style={{ marginTop: "12px", padding: "12px", borderRadius: "8px", background: "#fef2f2", color: "#b91c1c", fontSize: "14px", fontWeight: "bold", margin: "12px 0 0 0" }}>
                  {errorMsg}
                </p>
              )}

              <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                <button
                  onClick={cancel}
                  type="button"
                  style={{
                    flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #e2e8f0",
                    background: "#fff", color: "#334155", fontSize: "14px", fontWeight: "bold", cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
                <button
                  disabled={!selectedFile || status === "uploading" || status === "done"}
                  onClick={upload}
                  type="button"
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    padding: "12px", borderRadius: "8px", border: "none",
                    background: "#2563eb", color: "#fff", fontSize: "14px", fontWeight: "bold", cursor: "pointer",
                    opacity: (!selectedFile || status === "uploading" || status === "done") ? 0.6 : 1
                  }}
                >
                  {status === "uploading" && <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />}
                  {status === "done" && <Check size={16} />}
                  {status === "uploading" ? "Uploading…" : status === "done" ? "Saved!" : "Upload & Save"}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
