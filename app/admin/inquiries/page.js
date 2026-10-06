"use client";

import { useEffect, useMemo, useState } from "react";

const STATUSES = ["New", "Contacted", "Consultation", "Booked", "Closed"];

export default function InquiriesPage() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id, status) {
    await fetch("/api/inquiries/" + id, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setItems((prev) => prev.map((item) => item._id === id ? { ...item, status } : item));
  }

  const visible = useMemo(() => filter === "All" ? items : items.filter((item) => item.status === filter), [items, filter]);
  const newCount = items.filter((item) => item.status === "New").length;

  return (
    <div>
      <div className="mb-7">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accentLight">CRM</p>
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div><h1 className="font-heading text-3xl">Inquiries</h1><p className="mt-2 text-sm text-textSub">Every message submitted through the CRC Core contact form.</p></div>
          <div className="border border-border bg-card px-4 py-3 text-xs text-textSub"><span className="font-medium text-white">{newCount}</span> new</div>
        </div>
      </div>

      <div className="mb-5 flex gap-2 overflow-x-auto pb-1">
        {["All", ...STATUSES].map((status) => (
          <button key={status} onClick={() => setFilter(status)} className={`shrink-0 border px-3 py-2 text-xs ${filter === status ? "border-accent bg-accent/15 text-white" : "border-border text-textSub hover:text-white"}`}>
            {status}
          </button>
        ))}
      </div>

      {loading ? <p className="text-sm text-textMuted">Loading inquiries…</p> : visible.length === 0 ? (
        <div className="border border-dashed border-border bg-card p-10 text-center"><p className="text-sm text-textSub">No inquiries in this view yet.</p></div>
      ) : (
        <div className="space-y-3">
          {visible.map((item) => (
            <article key={item._id} className="border border-border bg-card p-5">
              <div className="flex flex-col justify-between gap-4 lg:flex-row">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-medium">{item.name}</h2>
                    <span className="border border-accent/30 bg-accent/10 px-2 py-1 text-[10px] uppercase tracking-wider text-accentLight">{item.status}</span>
                  </div>
                  <a href={`mailto:${item.email}`} className="mt-1 block text-xs text-accentLight hover:underline">{item.email}</a>
                  <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-textSub">{item.message}</p>
                </div>
                <div className="w-full shrink-0 lg:w-44">
                  <label className="mb-1 block text-[10px] uppercase tracking-wider text-textMuted">Pipeline</label>
                  <select value={item.status} onChange={(e) => updateStatus(item._id, e.target.value)} className="w-full border border-border bg-surface px-3 py-2.5 text-xs text-white">
                    {STATUSES.map((status) => <option key={status}>{status}</option>)}
                  </select>
                  <p className="mt-2 text-[10px] text-textMuted">{new Date(item.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
