"use client";

import { Eye, LogOut, Settings, Download, ChevronDown, ChevronUp } from "lucide-react";
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
      <div 
        style={{
          position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", zIndex: 150
        }}
      >
        <button
          onClick={() => setIsMinimized(false)}
          style={{
            display: "flex", alignItems: "center", gap: "8px", borderRadius: "30px",
            background: "rgba(10, 10, 15, 0.95)", border: "1px solid rgba(245, 197, 24, 0.4)",
            padding: "10px 20px", color: "#fff", fontWeight: "bold",
            boxShadow: "0 10px 30px rgba(0,0,0,0.5)", backdropFilter: "blur(10px)"
          }}
        >
          <ChevronUp size={18} color="var(--accent-color)" />
          Open Editor
        </button>
      </div>
    );
  }

  return (
    <div 
      style={{
        position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)",
        zIndex: 150, width: "90%", maxWidth: "800px"
      }}
    >
      <div 
        style={{
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "15px",
          background: "linear-gradient(145deg, rgba(15, 15, 25, 0.98), rgba(5, 5, 10, 0.95))",
          border: "1px solid rgba(245, 197, 24, 0.3)", borderRadius: "16px",
          padding: "15px 25px", boxShadow: "0 20px 50px rgba(0,0,0,0.8), 0 0 20px rgba(245, 197, 24, 0.1)",
          backdropFilter: "blur(20px)"
        }}
      >
        {/* Status Area */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            width: "12px", height: "12px", borderRadius: "50%", background: "var(--accent-color)",
            boxShadow: "0 0 10px var(--accent-color)"
          }}></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.5)", fontWeight: "bold" }}>
              Visual Editor
            </span>
            <span style={{ fontSize: "1.1rem", fontWeight: "900", color: "#fff", lineHeight: "1.2" }}>
              {activeSection ? (
                <>Editing <span style={{ color: "var(--accent-color)" }}>{activeSection}</span></>
              ) : (
                "Click any text to edit"
              )}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          
          <button
            onClick={downloadJSON}
            title="Download JSON Backup"
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px", color: "#fff", fontWeight: "600", cursor: "pointer"
            }}
          >
            <Download size={16} /> Backup
          </button>

          <a
            href="/secret-admin-portal"
            title="Advanced JSON Editor"
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px",
              background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px", color: "#fff", fontWeight: "600", textDecoration: "none"
            }}
          >
            <Settings size={16} /> JSON
          </a>

          <a
            href="/"
            target="_blank"
            title="Preview Live Site"
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px",
              background: "var(--accent-color)", border: "none",
              borderRadius: "8px", color: "#000", fontWeight: "bold", textDecoration: "none"
            }}
          >
            <Eye size={16} /> Preview
          </a>

          <button
            onClick={logout}
            title="Exit Edit Mode"
            style={{
              display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px",
              background: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "8px", color: "#ef4444", fontWeight: "600", cursor: "pointer"
            }}
          >
            <LogOut size={16} /> Exit
          </button>

          <div style={{ width: "1px", height: "30px", background: "rgba(255,255,255,0.1)", margin: "0 5px" }}></div>

          <button
            onClick={() => setIsMinimized(true)}
            title="Minimize Toolbar"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px",
              background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer"
            }}
          >
            <ChevronDown size={24} />
          </button>

        </div>
      </div>
    </div>
  );
}
