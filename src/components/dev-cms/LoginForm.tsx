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
      className="mx-auto grid w-full max-w-md gap-5 rounded-[2rem] border p-8 shadow-2xl glass backdrop-blur-xl"
      style={{
        background: "rgba(10, 10, 20, 0.95)",
        borderColor: "rgba(245, 197, 24, 0.3)",
      }}
    >
      <div className="text-center mb-2">
        <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "var(--accent-color)" }}>
          Secret admin portal
        </p>
        <h1 className="mt-2 text-2xl font-black text-white">
          Sign in to edit
        </h1>
      </div>
      <input
        className="rounded-xl border px-4 py-3.5 font-medium outline-none focus:border-amber-500 transition-colors"
        style={{ background: "#0a0a14", borderColor: "rgba(255,255,255,0.2)", color: "#fff" }}
        name="password"
        placeholder="Password"
        required
        type="password"
      />
      <button 
        className="btn mt-2 w-full shadow-lg"
      >
        {isLoading ? "Checking..." : "Enter admin"}
      </button>
      {message ? (
        <p
          className={`text-sm font-bold text-center mt-2 ${
            message.startsWith("Login successful")
              ? "text-green-400"
              : "text-red-400"
          }`}
        >
          {message}
        </p>
      ) : null}
      {process.env.NODE_ENV === "development" ? (
        <p className="rounded-xl bg-white/5 p-3 text-[11px] font-medium leading-5 text-gray-400 text-center border border-white/5 mt-2">
          Local default if `.env` is not configured:<br/> Password: <strong className="text-white">change</strong>
        </p>
      ) : null}
    </form>
  );
}
