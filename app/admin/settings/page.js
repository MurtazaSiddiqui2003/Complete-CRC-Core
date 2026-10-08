"use client";

import { useEffect, useState } from "react";

const FIELDS = [
  ["siteName", "Site Name"],
  ["tagline", "Tagline"],
  ["email", "Public Email"],
  ["phone", "Public Phone"],
  ["location", "Location"],
  ["instagram", "Instagram URL"],
  ["facebook", "Facebook URL"],
  ["linkedin", "LinkedIn URL"],
  ["whatsapp", "WhatsApp URL"],
  ["metaTitle", "Default SEO Title"],
  ["metaDescription", "Default SEO Description"],
  ["ogImage", "Social Preview Image URL"],
];

export default function SettingsPage() {
  const [form, setForm] = useState({});
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/site-settings")
      .then((r) => r.json())
      .then(setForm)
      .catch(() => setStatus("Couldn't load settings."))
      .finally(() => setLoading(false));
  }, []);

  function update(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus("");
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Couldn't save settings.");
      setForm(data);
      setStatus("Saved successfully.");
    } catch (err) {
      setStatus(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-sm text-textMuted">Loading settings…</p>;

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accentLight">System</p>
        <h1 className="font-heading text-3xl">Site Settings</h1>
        <p className="mt-2 text-sm text-textSub">Centralize the brand, contact, social and SEO defaults used by CRC Core.</p>
      </div>

      <form onSubmit={save} className="space-y-5 border border-border bg-card p-5 sm:p-7">
        <Section title="Brand & Contact">
          <div className="grid gap-4 sm:grid-cols-2">
            {FIELDS.slice(0, 5).map(([name, label]) => <Input key={name} name={name} label={label} value={form[name]} onChange={update} />)}
          </div>
        </Section>
        <Section title="Social Links">
          <div className="grid gap-4 sm:grid-cols-2">
            {FIELDS.slice(5, 9).map(([name, label]) => <Input key={name} name={name} label={label} value={form[name]} onChange={update} />)}
          </div>
        </Section>
        <Section title="SEO Defaults">
          <div className="space-y-4">
            {FIELDS.slice(9).map(([name, label]) => <Input key={name} name={name} label={label} value={form[name]} onChange={update} textarea={name === "metaDescription"} />)}
          </div>
        </Section>

        <div className="flex items-center justify-between gap-4 border-t border-border pt-5">
          <p className={`text-xs ${status.includes("success") ? "text-emerald-400" : "text-textMuted"}`}>{status}</p>
          <button disabled={saving} className="bg-gradient-to-br from-accent to-accentLight px-5 py-2.5 text-sm font-medium disabled:opacity-60">{saving ? "Saving…" : "Save Settings"}</button>
        </div>
      </form>
    </div>
  );
}

function Section({ title, children }) {
  return <section><h2 className="mb-3 font-heading text-lg">{title}</h2>{children}</section>;
}

function Input({ name, label, value, onChange, textarea }) {
  const className = "w-full border border-border bg-surface px-3 py-2.5 text-sm text-white placeholder:text-textMuted focus:border-accent focus:outline-none";
  return <label className="block"><span className="mb-1.5 block text-xs text-textMuted">{label}</span>{textarea ? <textarea rows={4} value={value || ""} onChange={(e) => onChange(name, e.target.value)} className={className} /> : <input value={value || ""} onChange={(e) => onChange(name, e.target.value)} className={className} />}</label>;
}
