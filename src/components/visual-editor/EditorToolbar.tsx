"use client";

import { Eye, LogOut, Settings, Download, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useEditMode, useActiveSection } from "./EditModeContext";

export function EditorToolbar() {
  const { isEditMode } = useEditMode();
  const activeSection = useActiveSection();
  const [isMinimized, setIsMinimized] = useState(false);
  if (!isEditMode) return null;

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/";
  }

  async function downloadJSON() {
    try {
      const res = await fetch("/api/admin/visual-content");
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "content.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      alert("Failed to download JSON.");
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-[90px] left-1/2 -translate-x-1/2 z-[150] sm:bottom-6 sm:left-4 sm:translate-x-0">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 rounded-full bg-slate-950/95 px-4 py-2 text-xs font-bold text-slate-300 shadow-2xl backdrop-blur-md border border-white/20 hover:bg-slate-800 transition-all"
        >
          <Settings className="h-4 w-4 text-blue-400" />
          <span>Show Editor</span>
        </button>
      </div>
    );
  }

  return (
    /*
      On mobile: full-width bar pinned to bottom edge, above the safe area.
      On desktop: pill centered above bottom.
    */
    <div className="fixed bottom-0 left-0 right-0 z-[150] sm:bottom-6 sm:left-1/2 sm:right-auto sm:w-auto sm:-translate-x-1/2">
      <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-slate-950/95 px-3 py-2 shadow-2xl backdrop-blur-md sm:justify-start sm:gap-3 sm:rounded-full sm:border sm:border-white/20 sm:px-5 sm:py-3">

        {/* Status dot + label */}
        <div className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500" />
          </span>
          <span className="truncate text-xs font-black text-white">
            {activeSection ? (
              <span>
                Editing{" "}
                <span className="capitalize text-blue-400">{activeSection}</span>
              </span>
            ) : (
              <span className="text-slate-300">
                {/* Short text on mobile, full on desktop */}
                <span className="sm:hidden">Edit Mode</span>
                <span className="hidden sm:inline">Edit Mode — tap ✏️ on any section</span>
              </span>
            )}
          </span>
        </div>

        {/* Action buttons — always visible, compact on mobile */}
        <div className="flex flex-shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Minimize */}
          <button
            aria-label="Minimize toolbar"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 transition-colors hover:bg-white/20 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5"
            onClick={() => setIsMinimized(true)}
            type="button"
          >
            <ChevronRight className="h-3.5 w-3.5 sm:hidden" />
            <ChevronLeft className="hidden h-3.5 w-3.5 sm:block" />
            <span className="hidden text-xs font-bold sm:inline">Hide</span>
          </button>

          {/* Download JSON */}
          <button
            aria-label="Download JSON"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 transition-colors hover:bg-white/20 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5"
            onClick={downloadJSON}
            type="button"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden text-xs font-bold sm:inline">Backup</span>
          </button>

          {/* JSON Panel */}
          <a
            aria-label="JSON Panel"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-slate-300 transition-colors hover:bg-white/20 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5"
            href="/secret-admin-portal"
          >
            <Settings className="h-3.5 w-3.5" />
            <span className="hidden text-xs font-bold sm:inline">JSON</span>
          </a>

          {/* Preview */}
          <a
            aria-label="Preview site"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5"
            href="/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Eye className="h-3.5 w-3.5" />
            <span className="hidden text-xs font-bold sm:inline">Preview</span>
          </a>

          {/* Logout */}
          <button
            aria-label="Exit edit mode"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500/20 text-red-300 transition-colors hover:bg-red-500/30 active:scale-95 sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-1.5"
            onClick={logout}
            type="button"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden text-xs font-bold sm:inline">Exit</span>
          </button>
        </div>

      </div>
    </div>
  );
}
