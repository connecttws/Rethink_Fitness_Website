"use client";

import { useMemo, useState, useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Camera, Loader2, Check, X, Pencil } from "lucide-react";
import { useEditMode } from "./EditModeContext";
import { getByPath } from "@/lib/visual-data/setByPath";
import imageCompression from 'browser-image-compression';

export type GroupField = {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image';
};

type Props = {
  basePath: string;
  schema: GroupField[];
  children: ReactNode;
  className?: string;
};

type Status = "idle" | "saving" | "done" | "error";

export function EditableGroup({ basePath, schema, children, className = "" }: Props) {
  const { isEditMode, applyPatch, visualContent, pageSlug } = useEditMode();
  const [mounted, setMounted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [previews, setPreviews] = useState<Record<string, string | null>>({});

  useEffect(() => { setMounted(true); }, []);

  const currentValues = useMemo(() => {
    const vals: Record<string, string> = {};
    for (const field of schema) {
      const fullPath = `${basePath}.${field.key}`;
      const resolved = getByPath<unknown>(visualContent as Record<string, unknown>, fullPath);
      vals[field.key] = resolved !== undefined && resolved !== null ? String(resolved) : "";
    }
    return vals;
  }, [visualContent, basePath, schema]);

  if (!isEditMode) {
    return <>{children}</>;
  }

  function openModal() {
    setDrafts({ ...currentValues });
    setFiles({});
    setPreviews({});
    setErrorMsg("");
    setStatus("idle");
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setStatus("idle");
    setErrorMsg("");
  }

  function onFileChange(fieldKey: string, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];
    if (!validTypes.includes(file.type)) {
      setErrorMsg(`Unsupported file format for ${fieldKey}! Please use JPEG, PNG, or WEBP.`);
      return;
    }

    setFiles(prev => ({ ...prev, [fieldKey]: file }));
    setPreviews(prev => ({ ...prev, [fieldKey]: URL.createObjectURL(file) }));
    setErrorMsg("");
  }

  async function save() {
    setStatus("saving");
    setErrorMsg("");
    
    try {
      const finalValues = { ...drafts };

      for (const field of schema) {
        if (field.type === 'image' && files[field.key]) {
          const file = files[field.key]!;
          
          const options = { maxSizeMB: 3.5, maxWidthOrHeight: 2500, useWebWorker: true };
          const compressedBlob = await imageCompression(file, options);
          const compressedFile = new File([compressedBlob], file.name, {
            type: compressedBlob.type, lastModified: Date.now(),
          });

          const formData = new FormData();
          formData.set("file", compressedFile);
          formData.set("path", `${basePath}.${field.key}`);
          formData.set("slug", pageSlug);

          const res = await fetch("/api/admin/upload-image", { method: "POST", body: formData });
          const payload = await res.json();
          if (!res.ok) throw new Error(payload.message || `Upload failed for ${field.label}`);

          finalValues[field.key] = payload.url;
        }
      }

      for (const field of schema) {
        const fullPath = `${basePath}.${field.key}`;
        const newValue = finalValues[field.key];
        
        if (newValue !== currentValues[field.key] || files[field.key]) {
          const res = await fetch("/api/admin/visual-content", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ path: fullPath, value: newValue, slug: pageSlug }),
          });
          if (!res.ok) throw new Error(`Save failed for ${field.label}`);
          
          applyPatch(fullPath, newValue);
        }
      }

      setStatus("done");
      setTimeout(() => { closeModal(); }, 1000);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Save failed");
    }
  }

  return (
    <>
      <div 
        className={`relative inline-block group/eg cursor-pointer ${className}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openModal();
        }}
        title="Tap to edit card"
      >
        <div className="transition-all group-hover/eg:ring-4 group-hover/eg:ring-blue-500 group-hover/eg:ring-offset-2 rounded-lg group-hover/eg:opacity-90 h-full w-full">
          {children}
        </div>
        
        <span 
          style={{
            position: "absolute", top: "12px", right: "12px", zIndex: 100,
            display: "none", alignItems: "center", gap: "6px",
            background: "#2563eb", color: "#fff", padding: "8px 12px",
            borderRadius: "20px", fontSize: "12px", fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)", pointerEvents: "none"
          }}
          className="group-hover/eg:!flex"
        >
          <Pencil size={14} />
          Edit Card
        </span>
      </div>

      {showModal && mounted && createPortal(
        <div
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(4px)", padding: "20px"
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto",
              background: "#ffffff", borderRadius: "16px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              display: "flex", flexDirection: "column", color: "#000"
            }}
          >
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderBottom: "1px solid #e5e7eb", padding: "20px"
            }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "900", margin: 0, color: "#0f172a" }}>Edit Card</h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748b" }}>Update the contents of this component</p>
              </div>
              <button
                onClick={closeModal}
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

            <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
              {schema.map((field) => (
                <div key={field.key} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ fontSize: "13px", fontWeight: "bold", color: "#475569", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    {field.label}
                  </label>
                  
                  {field.type === 'text' && (
                    <input
                      type="text"
                      value={drafts[field.key] || ""}
                      onChange={(e) => setDrafts(prev => ({ ...prev, [field.key]: e.target.value }))}
                      style={{
                        width: "100%", borderRadius: "8px", border: "2px solid #cbd5e1",
                        padding: "12px", fontSize: "15px", color: "#0f172a", boxSizing: "border-box"
                      }}
                    />
                  )}
                  
                  {field.type === 'textarea' && (
                    <textarea
                      value={drafts[field.key] || ""}
                      onChange={(e) => setDrafts(prev => ({ ...prev, [field.key]: e.target.value }))}
                      rows={4}
                      style={{
                        width: "100%", borderRadius: "8px", border: "2px solid #cbd5e1",
                        padding: "12px", fontSize: "15px", color: "#0f172a", boxSizing: "border-box",
                        resize: "vertical"
                      }}
                    />
                  )}
                  
                  {field.type === 'image' && (
                    <div style={{ position: "relative" }}>
                      <div
                        style={{
                          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                          border: "2px dashed #cbd5e1", borderRadius: "12px", background: "#f8fafc",
                          padding: "16px", transition: "background 0.2s", overflow: "hidden", position: "relative"
                        }}
                      >
                        {(previews[field.key] || drafts[field.key]) ? (
                          <img 
                            src={previews[field.key] || drafts[field.key]} 
                            alt="Preview" 
                            style={{ maxHeight: "160px", width: "100%", objectFit: "contain", borderRadius: "4px" }} 
                          />
                        ) : (
                          <div style={{ textAlign: "center", padding: "20px 0" }}>
                            <Camera size={32} color="#94a3b8" style={{ margin: "0 auto 8px" }} />
                            <p style={{ fontSize: "14px", color: "#64748b", margin: 0 }}>No image set</p>
                          </div>
                        )}
                        <input 
                          accept="image/*" 
                          style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", height: "100%", width: "100%" }} 
                          onChange={(e) => onFileChange(field.key, e)} 
                          type="file" 
                          title="Click to upload"
                        />
                      </div>
                      <p style={{ fontSize: "12px", color: "#94a3b8", margin: "6px 0 0 0", textAlign: "right" }}>Click box to upload new image</p>
                    </div>
                  )}
                </div>
              ))}

              {errorMsg && (
                <p style={{ padding: "12px", borderRadius: "8px", background: "#fef2f2", color: "#b91c1c", fontSize: "14px", fontWeight: "bold", margin: "0" }}>
                  {errorMsg}
                </p>
              )}
            </div>

            <div style={{ display: "flex", gap: "12px", padding: "20px", borderTop: "1px solid #e5e7eb", background: "#f8fafc", borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px" }}>
              <button
                onClick={closeModal}
                type="button"
                style={{
                  flex: 1, padding: "14px", borderRadius: "8px", border: "1px solid #cbd5e1",
                  background: "#fff", color: "#334155", fontSize: "15px", fontWeight: "bold", cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                disabled={status === "saving" || status === "done"}
                onClick={save}
                type="button"
                style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "14px", borderRadius: "8px", border: "none",
                  background: "#2563eb", color: "#fff", fontSize: "15px", fontWeight: "bold", cursor: "pointer",
                  opacity: (status === "saving" || status === "done") ? 0.7 : 1
                }}
              >
                {status === "saving" && <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />}
                {status === "done" && <Check size={18} />}
                {status === "saving" ? "Saving..." : status === "done" ? "Saved!" : "Save Card"}
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
