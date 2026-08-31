"use client";

import { useMemo, useState, type ElementType, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Check, Loader2, Pencil, X } from "lucide-react";
import { useEditMode, useIsSectionActive } from "./EditModeContext";
import { getByPath } from "@/lib/visual-data/setByPath";

type Props = {
  path: string;
  fallback: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
  label?: string;
  hrefPath?: string;
  hrefFallback?: string;
  pencilPosition?: "left" | "right";
};

type Status = "idle" | "saving" | "saved" | "error";

function EditModal({
  label, draft, setDraft, multiline, status, onSave, onCancel,
  hrefDraft, setHrefDraft
}: {
  label?: string; draft: string; setDraft: (v: string) => void;
  multiline: boolean; status: Status; onSave: () => void; onCancel: () => void;
  hrefDraft?: string; setHrefDraft?: (v: string) => void;
}) {
  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) {
    if (!multiline && e.key === "Enter") { e.preventDefault(); onSave(); }
    if (e.key === "Escape") onCancel();
  }

  return createPortal(
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 300,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur(4px)", padding: "20px"
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "500px", maxHeight: "90vh", overflowY: "auto",
          background: "#ffffff", borderRadius: "16px", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          display: "flex", flexDirection: "column", color: "#000"
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderBottom: "1px solid #e5e7eb", padding: "16px 20px"
        }}>
          <div>
            <p style={{ fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", color: "#2563eb", margin: 0 }}>
              Edit Text
            </p>
            {label && <p style={{ fontSize: "14px", fontWeight: "900", color: "#1f2937", margin: "4px 0 0 0" }}>{label}</p>}
          </div>
          <button
            onClick={onCancel}
            type="button"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "32px", height: "32px", borderRadius: "50%", background: "#f3f4f6",
              border: "none", cursor: "pointer", color: "#6b7280"
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Input area */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ fontSize: "12px", fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
              Text Content
            </label>
            {multiline ? (
              <textarea
                autoFocus
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                rows={Math.max(4, draft.split("\n").length + 1)}
                value={draft}
                style={{
                  width: "100%", resize: "vertical", borderRadius: "8px", border: "2px solid #93c5fd",
                  background: "#f8fafc", padding: "12px 16px", fontSize: "16px", color: "#0f172a",
                  outline: "none", fontFamily: "inherit"
                }}
              />
            ) : (
              <input
                autoFocus
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                type="text"
                value={draft}
                style={{
                  width: "100%", borderRadius: "8px", border: "2px solid #93c5fd",
                  background: "#f8fafc", padding: "12px 16px", fontSize: "16px", color: "#0f172a",
                  outline: "none", fontFamily: "inherit", boxSizing: "border-box"
                }}
              />
            )}
          </div>

          {hrefDraft !== undefined && setHrefDraft && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold", color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                Link URL
              </label>
              <input
                onChange={(e) => setHrefDraft(e.target.value)}
                onKeyDown={onKeyDown}
                type="text"
                value={hrefDraft}
                placeholder="https://..."
                style={{
                  width: "100%", borderRadius: "8px", border: "2px solid #93c5fd",
                  background: "#f8fafc", padding: "12px 16px", fontSize: "16px", color: "#0f172a",
                  outline: "none", fontFamily: "inherit", boxSizing: "border-box"
                }}
              />
            </div>
          )}

          {status === "error" && (
            <p style={{ fontSize: "14px", fontWeight: "bold", color: "#dc2626", margin: 0 }}>Save failed. Try again.</p>
          )}
          <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
            {multiline ? "Tap Save when done" : "Enter to save · Esc to cancel"}
          </p>
        </div>

        {/* Actions */}
        <div style={{
          display: "flex", gap: "12px", borderTop: "1px solid #e5e7eb", padding: "16px 20px"
        }}>
          <button
            onClick={onCancel}
            type="button"
            style={{
              flex: 1, borderRadius: "8px", border: "1px solid #e5e7eb", background: "#ffffff",
              padding: "12px", fontSize: "14px", fontWeight: "bold", color: "#374151", cursor: "pointer"
            }}
          >
            Cancel
          </button>
          <button
            disabled={status === "saving" || status === "saved"}
            onClick={onSave}
            type="button"
            style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              borderRadius: "8px", border: "none", background: "#2563eb", padding: "12px",
              fontSize: "14px", fontWeight: "bold", color: "#ffffff", cursor: "pointer",
              opacity: (status === "saving" || status === "saved") ? 0.6 : 1
            }}
          >
            {status === "saving" && <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />}
            {status === "saved" && <Check size={16} />}
            {status === "saving" ? "Saving…" : status === "saved" ? "Saved!" : "Save"}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export function EditableText({
  path, fallback: initialValue, as: Tag = "span",
  className = "", multiline = false, label,
  hrefPath, hrefFallback, pencilPosition = "right"
}: Props) {
  const { isEditMode, applyPatch, visualContent, pageSlug } = useEditMode();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const baseValue = useMemo(() => {
    const resolved = getByPath<unknown>(visualContent as Record<string, unknown>, path);
    if (resolved === undefined || resolved === null) return initialValue;
    return String(resolved);
  }, [visualContent, path, initialValue]);

  const baseHrefValue = useMemo(() => {
    if (!hrefPath) return undefined;
    const resolved = getByPath<unknown>(visualContent as Record<string, unknown>, hrefPath);
    if (resolved === undefined || resolved === null) return hrefFallback || "";
    return String(resolved);
  }, [visualContent, hrefPath, hrefFallback]);

  const [draft, setDraft] = useState(baseValue);
  const [hrefDraft, setHrefDraft] = useState(baseHrefValue);
  const mounted = true;
  const shownValue = open ? draft : baseValue;

  if (!isEditMode) {
    return <Tag className={className}>{baseValue}</Tag>;
  }

  async function persist() {
    const textChanged = draft.trim() !== baseValue.trim();
    const hrefChanged = hrefPath && hrefDraft !== undefined && hrefDraft.trim() !== (baseHrefValue || "").trim();
    
    if (!textChanged && !hrefChanged) { setOpen(false); return; }
    
    setStatus("saving");
    try {
      if (textChanged) {
        const res = await fetch("/api/admin/visual-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path, value: draft, slug: pageSlug }),
        });
        if (!res.ok) throw new Error("Save text failed");
        applyPatch(path, draft);
      }

      if (hrefChanged && hrefPath && hrefDraft !== undefined) {
        const res = await fetch("/api/admin/visual-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: hrefPath, value: hrefDraft, slug: pageSlug }),
        });
        if (!res.ok) throw new Error("Save href failed");
        applyPatch(hrefPath, hrefDraft);
      }
      
      setStatus("saved");
      setTimeout(() => { setStatus("idle"); setOpen(false); }, 900);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2000);
    }
  }

  function cancel() { setDraft(baseValue); setOpen(false); setStatus("idle"); }

  return (
    <>
      {/*
        Tap/click anywhere on text to open editor.
        Pencil badge: always visible on mobile, hover-only on desktop.
      */}
      <span
        className="group/et relative inline-block cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // Re-seed the editor from the latest content value at open time.
          setDraft(baseValue);
          setHrefDraft(baseHrefValue);
          setOpen(true);
        }}
        title="Tap to edit"
      >
        <Tag
          className={`${className} rounded transition-all group-hover/et:bg-blue-100/70 group-hover/et:ring-2 group-hover/et:ring-blue-400`}
        >
          {shownValue}
        </Tag>
        <span className={`pointer-events-none absolute -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white shadow-md ${pencilPosition === "left" ? "-left-5" : "-right-5"}`}>
          <Pencil className="h-2 w-2" />
        </span>
        {status === "saved" && (
          <span className={`absolute -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md ${pencilPosition === "left" ? "-left-5" : "-right-5"}`}>
            <Check className="h-2 w-2" />
          </span>
        )}
      </span>

      {open && mounted && (
        <EditModal
          draft={draft}
          label={label}
          multiline={multiline}
          onCancel={cancel}
          onSave={persist}
          setDraft={setDraft}
          status={status}
          hrefDraft={hrefDraft}
          setHrefDraft={setHrefDraft}
        />
      )}
    </>
  );
}
