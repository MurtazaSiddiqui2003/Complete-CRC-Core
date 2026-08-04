"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// A single reusable "add / edit / delete" screen, used by every content
// type (case studies, blog, faq, services, testimonials). Each page just
// tells this component WHICH fields to show and WHERE to save them --
// all the actual add/edit/delete logic lives here in one place, so if
// you ever want to change how saving works, you only change it once.
//
// field.type can be:
//   "text"     -> single-line input
//   "textarea" -> multi-line input
//   "list"     -> multi-line input, saved as an array (one line = one item)
//   "checkbox" -> on/off switch (used for "featured")

export default function AdminEditor({ title, description, apiPath, fields, backHref = "/admin" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState(() => makeEmptyItem(fields));
  const [savingId, setSavingId] = useState(null);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    setLoading(true);
    const res = await fetch(apiPath);
    const data = await res.json();
    setItems(data);
    setLoading(false);
  }

  function makeEmptyItem(fieldList) {
    const obj = {};
    fieldList.forEach((f) => {
      obj[f.name] = f.type === "checkbox" ? false : "";
    });
    return obj;
  }

  // Converts a "list" field's raw textarea text into an array of lines,
  // and leaves every other field type as-is, right before sending to the API.
  function serialize(itemData) {
    const out = { ...itemData };
    fields.forEach((f) => {
      if (f.type === "list" && typeof out[f.name] === "string") {
        out[f.name] = out[f.name]
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean);
      }
    });
    return out;
  }

  // Converts an array back into newline-separated text so it can be
  // edited in a textarea.
  function deserialize(item) {
    const out = { ...item };
    fields.forEach((f) => {
      if (f.type === "list" && Array.isArray(out[f.name])) {
        out[f.name] = out[f.name].join("\n");
      }
    });
    return out;
  }

  async function handleAdd(e) {
    e.preventDefault();
    await fetch(apiPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serialize({ ...newItem, order: items.length + 1 })),
    });
    setNewItem(makeEmptyItem(fields));
    loadItems();
  }

  async function handleSave(item) {
    setSavingId(item._id);
    await fetch(`${apiPath}/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(serialize(item)),
    });
    setSavingId(null);
    loadItems();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this? This can't be undone.")) return;
    await fetch(`${apiPath}/${id}`, { method: "DELETE" });
    loadItems();
  }

  function updateItemField(id, name, value) {
    setItems((prev) => prev.map((it) => (it._id === id ? { ...it, [name]: value } : it)));
  }

  return (
    <div className="min-h-screen bg-bg text-white px-5 py-10">
      <div className="max-w-3xl mx-auto">
        <Link href={backHref} className="text-sm text-textSub hover:text-white">
          ← Back to dashboard
        </Link>

        <h1 className="font-heading text-2xl grad mt-4">{title}</h1>
        {description && <p className="text-sm text-textSub mt-1 mb-8">{description}</p>}

        {/* Add new item */}
        <form onSubmit={handleAdd} className="bg-card border border-border rounded-xl p-5 mb-10 space-y-4">
          <h2 className="text-sm font-semibold text-textSub">Add New</h2>
          {fields.map((f) => (
            <Field
              key={f.name}
              field={f}
              value={newItem[f.name]}
              onChange={(v) => setNewItem((prev) => ({ ...prev, [f.name]: v }))}
            />
          ))}
          <button
            type="submit"
            className="bg-gradient-to-br from-accent to-accentLight text-white px-5 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            + Add
          </button>
        </form>

        {/* Existing items */}
        {loading ? (
          <p className="text-textMuted text-sm">Loading…</p>
        ) : items.length === 0 ? (
          <p className="text-textMuted text-sm">Nothing here yet — add your first one above.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item._id} className="bg-card border border-border rounded-xl p-5 space-y-4">
                {fields.map((f) => (
                  <Field
                    key={f.name}
                    field={f}
                    value={deserialize(item)[f.name]}
                    onChange={(v) => updateItemField(item._id, f.name, v)}
                  />
                ))}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSave(item)}
                    disabled={savingId === item._id}
                    className="text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors disabled:opacity-60"
                  >
                    {savingId === item._id ? "Saving…" : "Save Changes"}
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-sm text-red-400 hover:text-red-300 px-4 py-2 rounded-full transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ field, value, onChange }) {
  const baseClass =
    "w-full bg-surface border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-accent";

  if (field.type === "checkbox") {
    return (
      <label className="flex items-center gap-2 text-sm text-textSub">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 accent-accent"
        />
        {field.label}
      </label>
    );
  }

  if (field.type === "textarea" || field.type === "list") {
    return (
      <div>
        <label className="text-xs text-textMuted block mb-1">
          {field.label}
          {field.type === "list" && " (one per line)"}
        </label>
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={field.rows || (field.type === "list" ? 4 : 3)}
          placeholder={field.placeholder}
          className={baseClass}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="text-xs text-textMuted block mb-1">{field.label}</label>
      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={baseClass}
      />
    </div>
  );
}
