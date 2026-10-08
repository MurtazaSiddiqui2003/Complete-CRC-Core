"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  ["Hero", [["heroEyebrow","Eyebrow"],["heroTitle","Headline"],["heroDescription","Description"],["heroPrimaryCta","Primary Button"],["heroSecondaryCta","Secondary Button"]]],
  ["About", [["aboutEyebrow","Eyebrow"],["aboutTitle","Headline"],["aboutDescription","Description"]]],
  ["Our Story", [["storyEyebrow","Eyebrow"],["storyTitle","Headline"],["storyDescription","Description"]]],
  ["Problem", [["problemEyebrow","Eyebrow"],["problemTitle","Headline"],["problemDescription","Description"]]],
  ["Contact", [["contactEyebrow","Eyebrow"],["contactTitle","Headline"],["contactDescription","Description"]]],
  ["Footer", [["footerDescription","Description"],["footerTagline","Tagline"]]],
];

export default function ContentPage() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("/api/site-content").then((r) => r.json()).then(setForm)
      .catch(() => setStatus("Couldn't load homepage content."))
      .finally(() => setLoading(false));
  }, []);

  function update(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setStatus("");
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true); setStatus("");
    try {
      const res = await fetch("/api/site-content", { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Couldn't save content.");
      setForm(data); setStatus("Saved successfully.");
    } catch (err) { setStatus(err.message); }
    finally { setSaving(false); }
  }

  if (loading) return <p className="text-sm text-textMuted">Loading content…</p>;

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accentLight">Content Studio</p>
        <h1 className="font-heading text-3xl">Homepage Content</h1>
        <p className="mt-2 text-sm text-textSub">Edit the core messaging without touching code. Changes appear on the live site on the next visit.</p>
      </div>
      <form onSubmit={save} className="space-y-5">
        {SECTIONS.map(([title, fields]) => (
          <section key={title} className="border border-border bg-card p-5 sm:p-7">
            <h2 className="mb-5 font-heading text-lg">{title}</h2>
            <div className="space-y-4">
              {fields.map(([name,label]) => <Input key={name} name={name} label={label} value={form[name]} onChange={update} multiline={name.toLowerCase().includes("description")} />)}
            </div>
          </section>
        ))}
        <div className="sticky bottom-4 flex items-center justify-between gap-4 border border-border bg-card/95 p-4 backdrop-blur">
          <p className={`text-xs ${status.includes("success") ? "text-emerald-400" : "text-textMuted"}`}>{status}</p>
          <button disabled={saving} className="bg-gradient-to-br from-accent to-accentLight px-5 py-2.5 text-sm font-medium disabled:opacity-60">{saving ? "Saving…" : "Save Homepage"}</button>
        </div>
      </form>
    </div>
  );
}

function Input({ name, label, value, onChange, multiline }) {
  const className = "w-full border border-border bg-surface px-3 py-2.5 text-sm text-white placeholder:text-textMuted focus:border-accent focus:outline-none";
  return <label className="block"><span className="mb-1.5 block text-xs text-textMuted">{label}</span>{multiline ? <textarea rows={4} value={value || ""} onChange={(e)=>onChange(name,e.target.value)} className={className}/> : <input value={value || ""} onChange={(e)=>onChange(name,e.target.value)} className={className}/>}</label>;
}
