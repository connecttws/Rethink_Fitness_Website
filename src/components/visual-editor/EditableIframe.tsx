"use client";

import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Map, Loader2, Check, X } from "lucide-react";
import { useEditMode } from "./EditModeContext";
import { getByPath } from "@/lib/visual-data/setByPath";

type Props = {
  path: string;
  fallback: string;
  className?: string;
  iframeClassName?: string;
};

type Status = "idle" | "saving" | "saved" | "error";

export function EditableIframe({ path, fallback, className = "", iframeClassName = "" }: Props) {
  const { isEditMode, applyPatch, visualContent, pageSlug } = useEditMode();

  const baseValue = useMemo(() => {
    const resolved = getByPath<unknown>(visualContent as Record<string, unknown>, path);
    if (resolved === undefined || resolved === null) return fallback;
    return String(resolved);
  }, [visualContent, path, fallback]);

  const [status, setStatus] = useState<Status>("idle");
  const [showModal, setShowModal] = useState(false);
  const [draft, setDraft] = useState(baseValue);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!isEditMode) {
    return (
      <div className={className}>
        <iframe src={baseValue} className={iframeClassName} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    );
  }

  async function save() {
    if (draft.trim() === baseValue.trim()) {
      setShowModal(false);
      return;
    }

    setStatus("saving");
    try {
      const res = await fetch("/api/admin/visual-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, value: draft, slug: pageSlug }),
      });
      if (!res.ok) throw new Error("Save failed");

      applyPatch(path, draft);
      setStatus("saved");
      setTimeout(() => { setShowModal(false); setStatus("idle"); }, 1000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  function cancel() { setShowModal(false); setDraft(baseValue); setStatus("idle"); }

  return (
    <>
      {/* Wrapper with edit overlay */}
      <div 
        className={`relative inline-block ${className}`} 
        style={{ cursor: "pointer", display: "inline-block", width: "100%", height: "100%" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 0 0 4px rgba(59, 130, 246, 0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
        }}
        onClick={(e) => {
          e.preventDefault();
          setDraft(baseValue);
          setShowModal(true);
        }}
      >
        <iframe src={baseValue} className={iframeClassName} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ pointerEvents: 'none' }} />
        
        <span 
          style={{
            position: "absolute", top: "8px", right: "8px", zIndex: 10,
            display: "flex", alignItems: "center", gap: "4px",
            background: "#2563eb", color: "#fff", padding: "6px 10px",
            borderRadius: "20px", fontSize: "12px", fontWeight: "bold",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)", pointerEvents: "none"
          }}
        >
          <Map size={14} />
          Edit Map
        </span>
      </div>

      {/* Edit modal */}
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
              width: "100%", maxWidth: "500px",
              background: "#ffffff", borderRadius: "16px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              display: "flex", flexDirection: "column", color: "#000"
            }}
          >
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              borderBottom: "1px solid #e5e7eb", padding: "16px 20px"
            }}>
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "900", margin: 0, color: "#0f172a" }}>Edit Map URL</h3>
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
              <label style={{ display: "block", fontSize: "12px", fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                Google Maps Embed URL
              </label>
              <textarea
                autoFocus
                onChange={(e) => setDraft(e.target.value)}
                value={draft}
                rows={4}
                style={{
                  width: "100%", borderRadius: "8px", border: "2px solid #93c5fd",
                  background: "#f8fafc", padding: "12px 16px", fontSize: "14px", color: "#0f172a",
                  outline: "none", fontFamily: "inherit", resize: "vertical"
                }}
              />
              <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>
                Go to Google Maps &gt; Share &gt; Embed a map. Copy the URL inside the src="..." attribute.
              </p>

              {status === "error" && (
                <p style={{ marginTop: "12px", color: "#dc2626", fontSize: "14px", fontWeight: "bold" }}>Save failed. Try again.</p>
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
                  disabled={status === "saving" || status === "saved"}
                  onClick={save}
                  type="button"
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    padding: "12px", borderRadius: "8px", border: "none",
                    background: "#2563eb", color: "#fff", fontSize: "14px", fontWeight: "bold", cursor: "pointer",
                    opacity: (status === "saving" || status === "saved") ? 0.6 : 1
                  }}
                >
                  {status === "saving" && <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />}
                  {status === "saved" && <Check size={16} />}
                  {status === "saving" ? "Saving…" : status === "saved" ? "Saved!" : "Save Map"}
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
