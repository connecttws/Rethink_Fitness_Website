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
      className="fixed inset-0 z-[300] flex items-end justify-center bg-slate-950/50 backdrop-blur-sm sm:items-center sm:px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
    >
      {/* Sheet on mobile, centered card on desktop */}
      <div
        className="w-full max-h-[90vh] overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Edit Text</p>
            {label && <p className="mt-0.5 text-sm font-black text-slate-800">{label}</p>}
          </div>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 active:bg-slate-200"
            onClick={onCancel}
            type="button"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Input */}
        <div className="p-5 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Text Content</label>
            {multiline ? (
              <textarea
                autoFocus
                className="w-full resize-y rounded-xl border-2 border-blue-400 bg-slate-50 px-4 py-3 text-base text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                rows={Math.max(4, draft.split("\n").length + 1)}
                value={draft}
              />
            ) : (
              <input
                autoFocus
                className="w-full rounded-xl border-2 border-blue-400 bg-slate-50 px-4 py-3 text-base text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={onKeyDown}
                type="text"
                value={draft}
              />
            )}
          </div>

          {hrefDraft !== undefined && setHrefDraft && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Link URL</label>
              <input
                className="w-full rounded-xl border-2 border-blue-400 bg-slate-50 px-4 py-3 text-base text-slate-950 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                onChange={(e) => setHrefDraft(e.target.value)}
                onKeyDown={onKeyDown}
                type="text"
                value={hrefDraft}
                placeholder="https://..."
              />
            </div>
          )}

          {status === "error" && (
            <p className="text-sm font-bold text-red-600">Save failed. Try again.</p>
          )}
          <p className="text-xs text-slate-400">
            {multiline ? "Tap Save when done" : "Enter to save · Esc to cancel"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t border-slate-100 px-5 py-4 pb-safe">
          <button
            className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-black text-slate-700 active:bg-slate-50"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-black text-white active:bg-blue-700 disabled:opacity-60"
            disabled={status === "saving" || status === "saved"}
            onClick={onSave}
            type="button"
          >
            {status === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
            {status === "saved" && <Check className="h-4 w-4" />}
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
  const sectionId = path.split(".")[0];
  const { isEditMode, applyPatch, visualContent } = useEditMode();
  const isActive = useIsSectionActive(sectionId);

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

  if (!isEditMode || !isActive) {
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
          body: JSON.stringify({ path, value: draft }),
        });
        if (!res.ok) throw new Error("Save text failed");
        applyPatch(path, draft);
      }

      if (hrefChanged && hrefPath && hrefDraft !== undefined) {
        const res = await fetch("/api/admin/visual-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: hrefPath, value: hrefDraft }),
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
