"use client";

import { type FormEvent, useState } from "react";

export function LoginForm() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/admin/login", {
        body: JSON.stringify({
          password: formData.get("password"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const payload = await response.json();

      if (response.ok) {
        setMessage("Login successful. Opening visual editor...");
        window.location.href = "/";
        return;
      }

      setMessage(payload.message || "Login failed. Check your credentials.");
    } catch {
      setMessage("Login request failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      style={{
        width: "100%", maxWidth: "420px", margin: "0 auto",
        backgroundColor: "#121212", borderRadius: "12px",
        padding: "40px 30px", border: "1px solid #333",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
        display: "flex", flexDirection: "column", gap: "24px",
        fontFamily: "var(--font-body), sans-serif",
        position: "relative", overflow: "hidden"
      }}
    >
      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", backgroundColor: "var(--accent-color)" }}></div>

      <div style={{ textAlign: "center" }}>
        <h2 style={{ 
          fontSize: "24px", fontWeight: "700", color: "#ffffff", 
          margin: "0 0 8px 0", fontFamily: "var(--font-heading), sans-serif",
          textTransform: "uppercase", letterSpacing: "1px"
        }}>
          Visual Editor
        </h2>
        <p style={{ fontSize: "14px", color: "#a1a1aa", margin: 0 }}>
          Enter password to unlock page content.
        </p>
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label style={{ fontSize: "12px", fontWeight: "600", color: "#ffffff", textTransform: "uppercase", letterSpacing: "1px" }}>
          Admin Password
        </label>
        <input
          name="password"
          placeholder="••••••••"
          required
          type="password"
          style={{ 
            width: "100%", padding: "14px 16px", borderRadius: "6px",
            border: "1px solid #333", backgroundColor: "#050505", 
            color: "#ffffff", fontSize: "16px", outline: "none",
            boxSizing: "border-box", transition: "border-color 0.2s"
          }}
          onFocus={(e) => e.target.style.borderColor = "var(--accent-color)"}
          onBlur={(e) => e.target.style.borderColor = "#333"}
        />
      </div>
      
      <button 
        type="submit"
        disabled={isLoading}
        style={{ 
          width: "100%", padding: "16px", borderRadius: "6px",
          backgroundColor: "var(--accent-color)", color: "#000",
          border: "none", fontSize: "16px", fontWeight: "700",
          textTransform: "uppercase", letterSpacing: "1px",
          cursor: isLoading ? "not-allowed" : "pointer",
          fontFamily: "var(--font-heading), sans-serif",
          transition: "opacity 0.2s", opacity: isLoading ? 0.7 : 1
        }}
      >
        {isLoading ? "Authenticating..." : "Login"}
      </button>

      {message && (
        <div style={{ 
          padding: "12px", borderRadius: "6px", textAlign: "center", fontSize: "14px", fontWeight: "600",
          backgroundColor: message.startsWith("Login successful") ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)",
          color: message.startsWith("Login successful") ? "#4ade80" : "#f87171",
          border: `1px solid ${message.startsWith("Login successful") ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)"}`
        }}>
          {message}
        </div>
      )}

      {process.env.NODE_ENV === "development" && (
        <div style={{ 
          marginTop: "16px", padding: "12px", borderRadius: "6px", 
          backgroundColor: "rgba(255, 255, 255, 0.03)", border: "1px dashed #333",
          textAlign: "center", fontSize: "12px", color: "#a1a1aa"
        }}>
          Dev Mode Fallback <br/> Password: <strong style={{ color: "#ffffff" }}>change</strong>
        </div>
      )}
    </form>
  );
}
