"use client";

/** Persist a dot-path value via the host app's admin API. */
export async function saveContentPath(path: string, value: unknown) {
  const res = await fetch("/api/admin/visual-content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, value }),
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (payload as { error?: { message?: string }; message?: string })?.error?.message ??
        (payload as { message?: string })?.message ??
        "Save failed",
    );
  }
}
