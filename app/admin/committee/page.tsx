"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase client ──────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ─── Types ────────────────────────────────────────────────────────────────────
interface Member {
  id: number;
  name: string;
  position: string;
  phone: string | null;
  photo_url: string | null;
  intro: string | null;
  is_active: boolean;
  created_at: string;
}

type FormData = {
  name: string;
  position: string;
  phone: string;
  intro: string;
  is_active: boolean;
};

type Toast = { id: number; message: string; type: "success" | "error" };

// ─── Sidebar config ────────────────────────────────────────────────────────────
const sidebarItems = [
  { label: "ড্যাশবোর্ড",     icon: "🏠", href: "/admin",              key: "dashboard" },
  { label: "কমিটি সদস্য",    icon: "👥", href: "/admin/committee",     key: "committee" },
  { label: "নোটিশ",          icon: "📋", href: "/admin/notices",        key: "notices" },
  { label: "গ্যালারি",        icon: "🖼️",  href: "/admin/gallery",        key: "gallery" },
  { label: "রক্তদাতা",        icon: "🩸", href: "/admin/blood-donors",   key: "blood" },
  { label: "সদস্য নিবন্ধন",  icon: "📝", href: "/admin/registrations",  key: "registrations" },
  { label: "সেটিংস",         icon: "⚙️",  href: "/admin/settings",       key: "settings" },
];

const POSITIONS = [
  "সভাপতি", "সহ-সভাপতি", "সাধারণ সম্পাদক", "যুগ্ম সম্পাদক",
  "সাংগঠনিক সম্পাদক", "অর্থ সম্পাদক", "প্রচার সম্পাদক",
  "ক্রীড়া সম্পাদক", "সাংস্কৃতিক সম্পাদক", "কার্যনির্বাহী সদস্য",
  "প্রধান উপদেষ্টা", "উপদেষ্টা",
];

const EMPTY_FORM: FormData = {
  name: "", position: "", phone: "", intro: "", is_active: true,
};

// ─── Toast Notification ───────────────────────────────────────────────────────
function ToastContainer({ toasts, remove }: { toasts: Toast[]; remove: (id: number) => void }) {
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl border text-sm font-medium pointer-events-auto transition-all duration-300 ${
            t.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          <span className="text-lg flex-shrink-0">{t.type === "success" ? "✅" : "❌"}</span>
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => remove(t.id)}
            className="text-slate-400 hover:text-slate-600 flex-shrink-0 ml-2"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}

// ─── Gold Divider ─────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="h-px flex-1 bg-gradient-to-r from-yellow-400/60 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ active, open, onClose }: { active: string; open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#071530] border-r border-yellow-400/10 z-40 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:z-auto`}
      >
        <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 flex-shrink-0" />

        <div className="px-5 py-5 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[#0a1f44] font-extrabold text-xs shadow-lg shadow-yellow-500/30 flex-shrink-0">
              BSWU
            </div>
            <div className="min-w-0">
              <p className="text-white font-bold text-sm leading-tight truncate">বিনোদপুর ছাত্র পরিষদ</p>
              <p className="text-yellow-400 text-xs">অ্যাডমিন প্যানেল</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="text-yellow-400/50 text-xs font-semibold uppercase tracking-widest px-3 mb-3">মূল মেনু</p>
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = item.key === active;
              return (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-yellow-400/20 to-yellow-400/5 text-yellow-300 border border-yellow-400/30"
                        : "text-blue-200 hover:bg-white/5 hover:text-yellow-300 border border-transparent"
                    }`}
                  >
                    <span className="text-lg w-6 text-center flex-shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-3 pb-5 flex-shrink-0 border-t border-white/8 pt-4">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[#0a1f44] font-bold text-xs flex-shrink-0">আর</div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">আলফাজ রহমান</p>
              <p className="text-yellow-400/70 text-xs">সুপার অ্যাডমিন</p>
            </div>
            <a href="/" className="ml-auto text-slate-400 hover:text-red-400 transition-colors text-sm flex-shrink-0" title="লগআউট">↩</a>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────
function TopBar({ onMenuClick, onAdd }: { onMenuClick: () => void; onAdd: () => void }) {
  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between flex-shrink-0 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={onMenuClick} aria-label="মেনু">
          <div className="w-5 flex flex-col gap-1">
            <span className="h-0.5 bg-[#0a1f44] block" />
            <span className="h-0.5 bg-[#0a1f44] block" />
            <span className="h-0.5 bg-[#0a1f44] block" />
          </div>
        </button>
        <div>
          <h1 className="text-[#0a1f44] font-bold text-base sm:text-lg leading-tight">কমিটি সদস্য</h1>
          <p className="text-slate-400 text-xs hidden sm:block">
            <a href="/admin" className="hover:text-yellow-600">ড্যাশবোর্ড</a>
            <span className="mx-1">›</span>কমিটি সদস্য
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <a href="/" target="_blank" rel="noopener noreferrer"
          className="text-xs font-semibold text-[#0a1f44] hover:text-yellow-600 bg-[#f0f4ff] hover:bg-yellow-50 border border-blue-100 hover:border-yellow-300 px-3 py-1.5 rounded-lg transition-colors hidden sm:flex items-center gap-1">
          🌐 সাইট দেখুন
        </a>
        <button
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200 text-sm whitespace-nowrap"
        >
          <span className="text-base">+</span>
          <span className="hidden sm:inline">নতুন সদস্য</span>
          <span className="sm:hidden">যোগ</span>
        </button>
      </div>
    </header>
  );
}

// ─── Photo Upload ──────────────────────────────────────────────────────────────
function PhotoUpload({
  current,
  onUpload,
  uploading,
}: {
  current: string | null;
  onUpload: (file: File) => void;
  uploading: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(current);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setPreview(URL.createObjectURL(file));
    onUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="block text-[#0a1f44] font-semibold text-sm mb-2">ছবি আপলোড</label>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="relative border-2 border-dashed border-slate-200 hover:border-yellow-400 rounded-xl cursor-pointer transition-colors duration-200 overflow-hidden group"
      >
        {preview ? (
          <div className="relative h-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-sm font-semibold">ছবি পরিবর্তন করুন</span>
            </div>
          </div>
        ) : (
          <div className="h-40 flex flex-col items-center justify-center gap-2 text-slate-400 group-hover:text-yellow-500 transition-colors">
            <span className="text-4xl">{uploading ? "⏳" : "📸"}</span>
            <p className="text-sm font-medium">{uploading ? "আপলোড হচ্ছে..." : "ছবি টেনে আনুন বা ক্লিক করুন"}</p>
            <p className="text-xs text-slate-300">JPG, PNG — সর্বোচ্চ 5MB</p>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <div className="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}

// ─── Member Form Modal ────────────────────────────────────────────────────────
function MemberFormModal({
  mode,
  initial,
  onClose,
  onSave,
}: {
  mode: "add" | "edit";
  initial: (FormData & { id?: number; photo_url?: string | null }) | null;
  onClose: () => void;
  onSave: (data: FormData, photoFile: File | null) => Promise<void>;
}) {
  const [form, setForm] = useState<FormData>(
    initial ? { name: initial.name, position: initial.position, phone: initial.phone || "", intro: initial.intro || "", is_active: initial.is_active } : EMPTY_FORM
  );
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = (key: keyof FormData, val: string | boolean) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.position.trim()) return;
    setSaving(true);
    await onSave(form, photoFile);
    setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
        {/* Gold top bar */}
        <div className="h-1.5 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 flex-shrink-0" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-[#0a1f44] font-bold text-lg">
              {mode === "add" ? "নতুন সদস্য যোগ করুন" : "সদস্য তথ্য সম্পাদনা"}
            </h2>
            <GoldDivider />
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-slate-500 transition-colors text-sm font-bold">
            ✕
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Photo */}
          <PhotoUpload
            current={initial?.photo_url ?? null}
            onUpload={(f) => { setPhotoFile(f); setUploading(false); }}
            uploading={uploading}
          />

          {/* Name */}
          <div>
            <label className="block text-[#0a1f44] font-semibold text-sm mb-1.5">
              নাম <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="সম্পূর্ণ নাম লিখুন"
              className="w-full border border-slate-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 rounded-xl px-4 py-2.5 text-sm text-[#0a1f44] outline-none transition-all"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-[#0a1f44] font-semibold text-sm mb-1.5">
              পদবি <span className="text-red-500">*</span>
            </label>
            <select
              value={form.position}
              onChange={(e) => set("position", e.target.value)}
              className="w-full border border-slate-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 rounded-xl px-4 py-2.5 text-sm text-[#0a1f44] outline-none transition-all bg-white"
            >
              <option value="">পদবি নির্বাচন করুন</option>
              {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-[#0a1f44] font-semibold text-sm mb-1.5">ফোন নম্বর</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="+৮৮০১XXXXXXXXX"
              className="w-full border border-slate-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 rounded-xl px-4 py-2.5 text-sm text-[#0a1f44] outline-none transition-all"
            />
          </div>

          {/* Intro */}
          <div>
            <label className="block text-[#0a1f44] font-semibold text-sm mb-1.5">সংক্ষিপ্ত পরিচিতি</label>
            <textarea
              rows={3}
              value={form.intro}
              onChange={(e) => set("intro", e.target.value)}
              placeholder="সদস্য সম্পর্কে সংক্ষেপে লিখুন..."
              className="w-full border border-slate-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 rounded-xl px-4 py-2.5 text-sm text-[#0a1f44] outline-none transition-all resize-none"
            />
          </div>

          {/* Status */}
          <div className="flex items-center justify-between bg-[#f5f8ff] border border-blue-100 rounded-xl px-4 py-3">
            <div>
              <p className="text-[#0a1f44] font-semibold text-sm">সক্রিয় অবস্থা</p>
              <p className="text-slate-400 text-xs mt-0.5">নিষ্ক্রিয় সদস্য ওয়েবসাইটে দেখাবে না</p>
            </div>
            <button
              type="button"
              onClick={() => set("is_active", !form.is_active)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${form.is_active ? "bg-emerald-500" : "bg-slate-300"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${form.is_active ? "translate-x-6" : "translate-x-0.5"}`} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex gap-3 flex-shrink-0 bg-[#fafbff]">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-sm"
          >
            বাতিল
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving || !form.name.trim() || !form.position.trim()}
            className="flex-1 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-[1.02] transition-all duration-200 text-sm disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <span className="w-4 h-4 border-2 border-[#0a1f44]/30 border-t-[#0a1f44] rounded-full animate-spin" />
                সংরক্ষণ হচ্ছে...
              </>
            ) : (
              mode === "add" ? "✅ সদস্য যোগ করুন" : "✅ পরিবর্তন সংরক্ষণ"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ──────────────────────────────────────────────────────
function DeleteModal({ member, onClose, onConfirm }: { member: Member; onClose: () => void; onConfirm: () => Promise<void> }) {
  const [deleting, setDeleting] = useState(false);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-red-500 to-red-700 flex-shrink-0" />
        <div className="p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl mx-auto mb-4">🗑️</div>
          <h3 className="text-[#0a1f44] font-bold text-lg mb-2">সদস্য মুছে ফেলুন</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-1">
            আপনি কি <span className="font-bold text-[#0a1f44]">{member.name}</span>-কে কমিটি থেকে মুছে ফেলতে চান?
          </p>
          <p className="text-red-500 text-xs font-medium mb-6">এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।</p>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-sm">
              বাতিল
            </button>
            <button
              onClick={async () => { setDeleting(true); await onConfirm(); setDeleting(false); }}
              disabled={deleting}
              className="flex-1 py-2.5 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold rounded-xl hover:scale-[1.02] transition-all duration-200 text-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {deleting ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />মুছছে...</> : "হ্যাঁ, মুছে ফেলুন"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ member, size = "md" }: { member: Member; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm";
  return member.photo_url ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={member.photo_url} alt={member.name} className={`${dim} rounded-full object-cover ring-2 ring-yellow-400/30 flex-shrink-0`} />
  ) : (
    <div className={`${dim} rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[#0a1f44] font-bold flex-shrink-0`}>
      {member.name.charAt(0)}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CommitteeAdmin() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Modals
  const [addModal, setAddModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Member | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);

  // ── Toast helpers ──
  const addToast = useCallback((message: string, type: Toast["type"]) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4000);
  }, []);
  const removeToast = (id: number) => setToasts((t) => t.filter((x) => x.id !== id));

  // ── Fetch ──
  const fetchMembers = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("committee_members")
      .select("*")
      .order("id", { ascending: true });
    if (error) addToast("ডেটা লোড করতে সমস্যা হয়েছে: " + error.message, "error");
    else setMembers(data ?? []);
    setLoading(false);
  }, [addToast]);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  // ── Photo upload to Supabase Storage ──
  const uploadPhoto = async (file: File): Promise<string | null> => {
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("committee-photos").upload(path, file, { upsert: true });
    if (error) { addToast("ছবি আপলোড ব্যর্থ: " + error.message, "error"); return null; }
    const { data } = supabase.storage.from("committee-photos").getPublicUrl(path);
    return data.publicUrl;
  };

  // ── Add member ──
  const handleAdd = async (form: FormData, photoFile: File | null) => {
    let photo_url: string | null = null;
    if (photoFile) photo_url = await uploadPhoto(photoFile);

    const { error } = await supabase.from("committee_members").insert([{
      name: form.name.trim(),
      position: form.position,
      phone: form.phone.trim() || null,
      intro: form.intro.trim() || null,
      is_active: form.is_active,
      photo_url,
    }]);

    if (error) { addToast("সদস্য যোগ ব্যর্থ: " + error.message, "error"); return; }
    addToast(`${form.name} সফলভাবে যোগ করা হয়েছে!`, "success");
    setAddModal(false);
    fetchMembers();
  };

  // ── Edit member ──
  const handleEdit = async (form: FormData, photoFile: File | null) => {
    if (!editTarget) return;
    let photo_url = editTarget.photo_url;
    if (photoFile) photo_url = await uploadPhoto(photoFile);

    const { error } = await supabase.from("committee_members").update({
      name: form.name.trim(),
      position: form.position,
      phone: form.phone.trim() || null,
      intro: form.intro.trim() || null,
      is_active: form.is_active,
      photo_url,
    }).eq("id", editTarget.id);

    if (error) { addToast("আপডেট ব্যর্থ: " + error.message, "error"); return; }
    addToast(`${form.name}-এর তথ্য আপডেট হয়েছে!`, "success");
    setEditTarget(null);
    fetchMembers();
  };

  // ── Delete member ──
  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from("committee_members").delete().eq("id", deleteTarget.id);
    if (error) { addToast("মুছতে সমস্যা হয়েছে: " + error.message, "error"); return; }
    addToast(`${deleteTarget.name}-কে তালিকা থেকে মুছে ফেলা হয়েছে।`, "success");
    setDeleteTarget(null);
    fetchMembers();
  };

  // ── Toggle status ──
  const toggleStatus = async (member: Member) => {
    const { error } = await supabase
      .from("committee_members")
      .update({ is_active: !member.is_active })
      .eq("id", member.id);
    if (error) { addToast("স্ট্যাটাস পরিবর্তন ব্যর্থ", "error"); return; }
    addToast(`${member.name}-এর স্ট্যাটাস পরিবর্তন হয়েছে।`, "success");
    fetchMembers();
  };

  // ── Filtered list ──
  const filtered = members.filter((m) => {
    const q = search.toLowerCase();
    const matchSearch = m.name.toLowerCase().includes(q) || m.position.toLowerCase().includes(q) || (m.phone ?? "").includes(q);
    const matchStatus = filterStatus === "all" || (filterStatus === "active" ? m.is_active : !m.is_active);
    return matchSearch && matchStatus;
  });

  const activeCount   = members.filter((m) => m.is_active).length;
  const inactiveCount = members.filter((m) => !m.is_active).length;

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex font-sans">
      <ToastContainer toasts={toasts} remove={removeToast} />

      <Sidebar active="committee" open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} onAdd={() => setAddModal(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">

          {/* ── Summary cards ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "মোট সদস্য",   value: members.length, icon: "👥", color: "from-[#0a1f44] to-[#143166]", ring: "ring-blue-400/20" },
              { label: "সক্রিয়",       value: activeCount,   icon: "✅", color: "from-emerald-600 to-emerald-800", ring: "ring-emerald-400/20" },
              { label: "নিষ্ক্রিয়",   value: inactiveCount, icon: "⏸️",  color: "from-slate-500 to-slate-700",    ring: "ring-slate-400/20" },
              { label: "পদবি",         value: new Set(members.map((m) => m.position)).size, icon: "🏅", color: "from-yellow-500 to-yellow-700", ring: "ring-yellow-400/20" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-center gap-3 hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} ring-4 ${s.ring} flex items-center justify-center text-xl shadow flex-shrink-0`}>
                  {s.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-2xl font-extrabold text-[#0a1f44] leading-none">{s.value}</p>
                  <p className="text-slate-500 text-xs font-medium mt-0.5 truncate">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── Search & filter bar ── */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-4 py-3 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="নাম, পদবি বা ফোন নম্বর দিয়ে খুঁজুন..."
                className="w-full pl-9 pr-4 py-2 border border-slate-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 rounded-xl text-sm text-[#0a1f44] outline-none transition-all"
              />
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {(["all", "active", "inactive"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    filterStatus === s
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] shadow-lg shadow-yellow-500/20"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {s === "all" ? "সবাই" : s === "active" ? "সক্রিয়" : "নিষ্ক্রিয়"}
                </button>
              ))}
            </div>
          </div>

          {/* ── Table ── */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            {/* Table header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-[#0a1f44] font-bold text-base">সদস্য তালিকা</h2>
                <GoldDivider />
              </div>
              <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
                {filtered.length} জন পাওয়া গেছে
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
                <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">লোড হচ্ছে...</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-3">🔍</div>
                <p className="text-slate-400 font-medium">কোনো সদস্য পাওয়া যায়নি</p>
                <p className="text-slate-300 text-sm mt-1">অনুসন্ধান পরিবর্তন করে আবার চেষ্টা করুন</p>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-[#f5f8ff] border-b border-slate-100">
                        <th className="text-left px-6 py-3 text-[#0a1f44] font-semibold text-xs uppercase tracking-wider">ছবি ও নাম</th>
                        <th className="text-left px-4 py-3 text-[#0a1f44] font-semibold text-xs uppercase tracking-wider">পদবি</th>
                        <th className="text-left px-4 py-3 text-[#0a1f44] font-semibold text-xs uppercase tracking-wider">ফোন</th>
                        <th className="text-center px-4 py-3 text-[#0a1f44] font-semibold text-xs uppercase tracking-wider">স্ট্যাটাস</th>
                        <th className="text-right px-6 py-3 text-[#0a1f44] font-semibold text-xs uppercase tracking-wider">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {filtered.map((m) => (
                        <tr key={m.id} className="hover:bg-[#f9fafb] transition-colors group">
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-3">
                              <Avatar member={m} />
                              <div className="min-w-0">
                                <p className="font-semibold text-[#0a1f44] truncate">{m.name}</p>
                                {m.intro && <p className="text-xs text-slate-400 truncate max-w-[180px]">{m.intro}</p>}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-block bg-[#f0f4ff] text-[#0a1f44] border border-blue-100 text-xs font-semibold px-2.5 py-1 rounded-full">
                              {m.position}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-500 text-sm">{m.phone || "—"}</td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => toggleStatus(m)}
                              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full transition-all hover:scale-105 ${
                                m.is_active
                                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200 hover:bg-emerald-200"
                                  : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200"
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${m.is_active ? "bg-emerald-500" : "bg-slate-400"}`} />
                              {m.is_active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                            </button>
                          </td>
                          <td className="px-6 py-3">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditTarget(m)}
                                className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                                title="সম্পাদনা"
                              >
                                ✏️
                              </button>
                              <button
                                onClick={() => setDeleteTarget(m)}
                                className="p-2 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                                title="মুছে ফেলুন"
                              >
                                🗑️
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile card list */}
                <div className="md:hidden divide-y divide-slate-50">
                  {filtered.map((m) => (
                    <div key={m.id} className="px-4 py-4 flex items-start gap-3 hover:bg-[#f9fafb] transition-colors">
                      <Avatar member={m} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-semibold text-[#0a1f44] text-sm truncate">{m.name}</p>
                            <span className="inline-block bg-[#f0f4ff] text-[#0a1f44] border border-blue-100 text-xs font-semibold px-2 py-0.5 rounded-full mt-1">
                              {m.position}
                            </span>
                          </div>
                          <button
                            onClick={() => toggleStatus(m)}
                            className={`text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${
                              m.is_active
                                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                : "bg-slate-100 text-slate-500 border border-slate-200"
                            }`}
                          >
                            {m.is_active ? "সক্রিয়" : "নিষ্ক্রিয়"}
                          </button>
                        </div>
                        {m.phone && <p className="text-slate-400 text-xs mt-1">📞 {m.phone}</p>}
                        <div className="flex gap-2 mt-2">
                          <button onClick={() => setEditTarget(m)} className="text-xs text-blue-600 font-semibold hover:underline">✏️ সম্পাদনা</button>
                          <button onClick={() => setDeleteTarget(m)} className="text-xs text-red-500 font-semibold hover:underline">🗑️ মুছুন</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer credit */}
          <p className="text-center text-xs text-slate-400 pb-2">
            ওয়েবসাইটটি তৈরি ও পরিচালনায়:{" "}
            <span className="text-yellow-500 font-semibold">আলফাজ রহমান</span>
          </p>
        </main>
      </div>

      {/* ── Modals ── */}
      {addModal && (
        <MemberFormModal
          mode="add"
          initial={null}
          onClose={() => setAddModal(false)}
          onSave={handleAdd}
        />
      )}

      {editTarget && (
        <MemberFormModal
          mode="edit"
          initial={{
            id: editTarget.id,
            name: editTarget.name,
            position: editTarget.position,
            phone: editTarget.phone || "",
            intro: editTarget.intro || "",
            is_active: editTarget.is_active,
            photo_url: editTarget.photo_url,
          }}
          onClose={() => setEditTarget(null)}
          onSave={handleEdit}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          member={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
