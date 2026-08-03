"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Wrong password. Try again.");
    }
  }

  return (
    <div className="min-h-screen bg-bg text-white flex items-center justify-center px-5">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card border border-border rounded-2xl p-8"
      >
        <h1 className="font-heading text-xl mb-1 grad">CRC Core Admin</h1>
        <p className="text-sm text-textSub mb-6">Log in to manage site content.</p>

        <label htmlFor="password" className="text-xs text-textMuted block mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
          className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm mb-4 focus:outline-none focus:border-accent"
        />

        {error && <p className="text-sm text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-br from-accent to-accentLight text-white py-3 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {loading ? "Checking…" : "Log In"}
        </button>
      </form>
    </div>
  );
}
