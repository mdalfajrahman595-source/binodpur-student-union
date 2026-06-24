"use client";

import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatCard {
  label: string;
  value: number | string;
  icon: string;
  color: string;          // Tailwind gradient classes
  ring: string;           // ring color
  href: string;
  delta?: string;         // e.g. "+৩ এই মাসে"
}

interface RecentActivity {
  id: number;
  action: string;
  target: string;
  time: string;
  icon: string;
  type: "add" | "edit" | "delete" | "notice";
}

interface QuickNotice {
  id: number;
  title: string;
  date: string;
  tag: string;
}

// ─── Sidebar config ────────────────────────────────────────────────────────────
const sidebarItems = [
  { label: "ড্যাশবোর্ড",        icon: "🏠", href: "/admin",               key: "dashboard" },
  { label: "কমিটি সদস্য",       icon: "👥", href: "/admin/committee",      key: "committee" },
  { label: "নোটিশ",            icon: "📋", href: "/admin/notices",         key: "notices" },
  { label: "গ্যালারি",          icon: "🖼️",  href: "/admin/gallery",         key: "gallery" },
  { label: "রক্তদাতা",          icon: "🩸", href: "/admin/blood-donors",    key: "blood" },
  { label: "সদস্য নিবন্ধন",    icon: "📝", href: "/admin/registrations",   key: "registrations" },
  { label: "সেটিংস",           icon: "⚙️",  href: "/admin/settings",        key: "settings" },
];

// ─── Mock stats (replace .value with Supabase count queries) ─────────────────
const statCards: StatCard[] = [
  {
    label: "কমিটি সদস্য",
    value: 14,
    icon: "👥",
    color: "from-[#0a1f44] to-[#143166]",
    ring: "ring-blue-400/20",
    href: "/admin/committee",
    delta: "+২ এই মাসে",
  },
  {
    label: "মোট নোটিশ",
    value: 10,
    icon: "📋",
    color: "from-yellow-500 to-yellow-700",
    ring: "ring-yellow-400/20",
    href: "/admin/notices",
    delta: "+৩ এই সপ্তাহে",
  },
  {
    label: "গ্যালারি ছবি",
    value: 48,
    icon: "🖼️",
    color: "from-purple-700 to-purple-900",
    ring: "ring-purple-400/20",
    href: "/admin/gallery",
    delta: "+৮ এই মাসে",
  },
  {
    label: "রক্তদাতা",
    value: 82,
    icon: "🩸",
    color: "from-red-700 to-red-900",
    ring: "ring-red-400/20",
    href: "/admin/blood-donors",
    delta: "+৫ এই মাসে",
  },
  {
    label: "সদস্য নিবন্ধন",
    value: 130,
    icon: "📝",
    color: "from-emerald-700 to-emerald-900",
    ring: "ring-emerald-400/20",
    href: "/admin/registrations",
    delta: "+১২ এই মাসে",
  },
];

// ─── Mock recent activity (replace with Supabase realtime / audit log) ────────
const recentActivity: RecentActivity[] = [
  { id: 1, action: "নতুন নোটিশ যোগ করা হয়েছে",       target: "বার্ষিক সাধারণ সভার নোটিশ",       time: "১০ মিনিট আগে", icon: "📋", type: "notice" },
  { id: 2, action: "কমিটি সদস্য আপডেট করা হয়েছে",    target: "মোঃ আলফাজ রহমান",                 time: "৩০ মিনিট আগে", icon: "✏️", type: "edit" },
  { id: 3, action: "নতুন রক্তদাতা যোগ হয়েছেন",        target: "মোঃ সাজেদুল ইসলাম (B+)",         time: "২ ঘণ্টা আগে",  icon: "🩸", type: "add" },
  { id: 4, action: "গ্যালারিতে ছবি আপলোড",             target: "রক্তদান ক্যাম্প ২০২৬",           time: "৫ ঘণ্টা আগে",  icon: "🖼️",  type: "add" },
  { id: 5, action: "নতুন সদস্য নিবন্ধন",               target: "মোঃ রেজাউল করিম",                 time: "১ দিন আগে",    icon: "📝", type: "add" },
  { id: 6, action: "নোটিশ মুছে ফেলা হয়েছে",            target: "পুরনো ক্রীড়া বিজ্ঞপ্তি",          time: "২ দিন আগে",    icon: "🗑️", type: "delete" },
];

// ─── Mock latest notices ───────────────────────────────────────────────────────
const latestNotices: QuickNotice[] = [
  { id: 1, title: "বার্ষিক সাধারণ সভার বিজ্ঞপ্তি",     date: "২৫ জুন, ২০২৬", tag: "জরুরি" },
  { id: 2, title: "রক্তদান কর্মসূচিতে স্বেচ্ছাসেবক",   date: "২২ জুন, ২০২৬", tag: "স্বেচ্ছাসেবা" },
  { id: 3, title: "নতুন সদস্য নিবন্ধন শুরু",            date: "১৮ জুন, ২০২৬", tag: "সদস্যপদ" },
  { id: 4, title: "শিক্ষা সহায়তা বৃত্তির আবেদন",       date: "১৫ জুন, ২০২৬", tag: "শিক্ষা" },
];

const tagColors: Record<string, string> = {
  জরুরি:       "bg-red-100 text-red-700 border border-red-200",
  স্বেচ্ছাসেবা: "bg-green-100 text-green-700 border border-green-200",
  সদস্যপদ:     "bg-blue-100 text-blue-700 border border-blue-200",
  শিক্ষা:      "bg-purple-100 text-purple-700 border border-purple-200",
};

const activityColor: Record<string, string> = {
  add:    "bg-emerald-500",
  edit:   "bg-yellow-400",
  delete: "bg-red-500",
  notice: "bg-blue-400",
};

// ─── Gold Divider (shared primitive) ──────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-1">
      <div className="h-px flex-1 bg-gradient-to-r from-yellow-400/60 to-transparent" />
      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  active,
  open,
  onClose,
}: {
  active: string;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#071530] border-r border-yellow-400/10 z-40 flex flex-col transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Gold accent top bar */}
        <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 flex-shrink-0" />

        {/* Brand */}
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

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="text-yellow-400/50 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
            মূল মেনু
          </p>
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = item.key === active;
              return (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? "bg-gradient-to-r from-yellow-400/20 to-yellow-400/5 text-yellow-300 border border-yellow-400/30"
                        : "text-blue-200 hover:bg-white/5 hover:text-yellow-300 border border-transparent"
                    }`}
                  >
                    <span className="text-lg w-6 text-center flex-shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom user strip */}
        <div className="px-3 pb-5 flex-shrink-0 border-t border-white/8 pt-4">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[#0a1f44] font-bold text-xs flex-shrink-0">
              আর
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate">আলফাজ রহমান</p>
              <p className="text-yellow-400/70 text-xs">সুপার অ্যাডমিন</p>
            </div>
            <a href="/" className="ml-auto text-slate-400 hover:text-red-400 transition-colors text-sm flex-shrink-0" title="লগআউট">
              ↩
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────────────────
function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("bn-BD", { hour: "2-digit", minute: "2-digit" }));
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <header className="bg-white border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between flex-shrink-0 shadow-sm">
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-4">
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          onClick={onMenuClick}
          aria-label="মেনু"
        >
          <div className="w-5 flex flex-col gap-1">
            <span className="h-0.5 bg-[#0a1f44] block" />
            <span className="h-0.5 bg-[#0a1f44] block" />
            <span className="h-0.5 bg-[#0a1f44] block" />
          </div>
        </button>
        <div>
          <h1 className="text-[#0a1f44] font-bold text-base sm:text-lg leading-tight">ড্যাশবোর্ড</h1>
          <p className="text-slate-400 text-xs hidden sm:block">স্বাগতম, আলফাজ রহমান</p>
        </div>
      </div>

      {/* Right: time + site link */}
      <div className="flex items-center gap-3">
        <span className="text-slate-400 text-sm hidden sm:block">{time}</span>
        <div className="w-px h-5 bg-slate-200 hidden sm:block" />
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-semibold text-[#0a1f44] hover:text-yellow-600 transition-colors bg-[#f0f4ff] hover:bg-yellow-50 border border-blue-100 hover:border-yellow-300 px-3 py-1.5 rounded-lg"
        >
          <span>🌐</span>
          <span className="hidden sm:inline">ওয়েবসাইট দেখুন</span>
          <span className="sm:hidden">সাইট</span>
        </a>
      </div>
    </header>
  );
}

// ─── Stat Cards ───────────────────────────────────────────────────────────────
function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
      {statCards.map((card, i) => (
        <a
          key={i}
          href={card.href}
          className="group relative bg-white rounded-xl border border-slate-100 hover:border-yellow-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-0.5"
        >
          {/* Thin gold top bar on hover */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="p-5">
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} ring-4 ${card.ring} flex items-center justify-center text-2xl shadow-lg mb-4`}>
              {card.icon}
            </div>

            {/* Value */}
            <p className="text-3xl font-extrabold text-[#0a1f44] leading-none mb-1">
              {card.value}
            </p>
            <p className="text-slate-500 text-sm font-medium">{card.label}</p>

            {card.delta && (
              <p className="mt-2 text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full inline-block">
                ↑ {card.delta}
              </p>
            )}
          </div>

          {/* Arrow */}
          <div className="absolute top-4 right-4 text-slate-200 group-hover:text-yellow-400 text-lg transition-colors group-hover:translate-x-0.5 duration-200">
            →
          </div>
        </a>
      ))}
    </div>
  );
}

// ─── Recent Activity ──────────────────────────────────────────────────────────
function RecentActivityPanel() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-[#0a1f44] font-bold text-base">সাম্প্রতিক কার্যক্রম</h2>
          <GoldDivider />
        </div>
        <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
          সর্বশেষ ৬টি
        </span>
      </div>

      {/* List */}
      <ul className="divide-y divide-slate-50">
        {recentActivity.map((item) => (
          <li
            key={item.id}
            className="flex items-start gap-4 px-6 py-4 hover:bg-[#f5f8ff] transition-colors group"
          >
            {/* Timeline dot */}
            <div className="flex flex-col items-center flex-shrink-0 mt-1">
              <div className={`w-2.5 h-2.5 rounded-full ${activityColor[item.type]}`} />
              <div className="w-px flex-1 bg-slate-100 mt-1 min-h-4" />
            </div>

            {/* Icon */}
            <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-[#0a1f44] text-sm font-semibold group-hover:text-yellow-700 transition-colors">
                {item.action}
              </p>
              <p className="text-slate-500 text-xs mt-0.5 truncate">{item.target}</p>
            </div>

            {/* Time */}
            <span className="text-slate-400 text-xs flex-shrink-0 mt-0.5">{item.time}</span>
          </li>
        ))}
      </ul>

      <div className="px-6 py-3 border-t border-slate-100 text-center">
        <a href="/admin/activity" className="text-xs font-semibold text-[#0a1f44] hover:text-yellow-600 transition-colors">
          সব কার্যক্রম দেখুন →
        </a>
      </div>
    </div>
  );
}

// ─── Latest Notices Panel ─────────────────────────────────────────────────────
function LatestNoticesPanel() {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-[#0a1f44] font-bold text-base">সর্বশেষ নোটিশ</h2>
          <GoldDivider />
        </div>
        <a
          href="/admin/notices"
          className="text-xs font-semibold text-yellow-600 hover:text-yellow-700 bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-full transition-colors"
        >
          সব দেখুন
        </a>
      </div>

      <ul className="divide-y divide-slate-50">
        {latestNotices.map((n) => (
          <li
            key={n.id}
            className="flex items-center gap-4 px-6 py-4 hover:bg-[#f5f8ff] transition-colors group"
          >
            <div className="w-1.5 h-8 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[#0a1f44] text-sm font-semibold group-hover:text-yellow-700 transition-colors truncate">
                {n.title}
              </p>
              <p className="text-slate-400 text-xs mt-0.5">📅 {n.date}</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${tagColors[n.tag] ?? "bg-slate-100 text-slate-600"}`}>
              {n.tag}
            </span>
          </li>
        ))}
      </ul>

      <div className="px-6 py-3 border-t border-slate-100">
        <a
          href="/admin/notices?action=new"
          className="w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-lg text-sm shadow shadow-yellow-300/40 hover:shadow-yellow-400/60 hover:scale-[1.02] transition-all duration-200"
        >
          <span>+</span> নতুন নোটিশ যোগ করুন
        </a>
      </div>
    </div>
  );
}

// ─── Quick Actions ─────────────────────────────────────────────────────────────
function QuickActions() {
  const actions = [
    { label: "নতুন নোটিশ",       icon: "📋", href: "/admin/notices?action=new",       color: "hover:border-yellow-300 hover:bg-yellow-50" },
    { label: "সদস্য যোগ",         icon: "👤", href: "/admin/committee?action=new",     color: "hover:border-blue-300 hover:bg-blue-50" },
    { label: "ছবি আপলোড",         icon: "🖼️",  href: "/admin/gallery?action=upload",   color: "hover:border-purple-300 hover:bg-purple-50" },
    { label: "রক্তদাতা যোগ",      icon: "🩸", href: "/admin/blood-donors?action=new", color: "hover:border-red-300 hover:bg-red-50" },
    { label: "নিবন্ধন দেখুন",    icon: "📝", href: "/admin/registrations",           color: "hover:border-emerald-300 hover:bg-emerald-50" },
    { label: "ওয়েবসাইট দেখুন", icon: "🌐", href: "/",                              color: "hover:border-slate-300 hover:bg-slate-50" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-[#0a1f44] font-bold text-base">দ্রুত অ্যাকশন</h2>
        <GoldDivider />
      </div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {actions.map((a) => (
          <a
            key={a.label}
            href={a.href}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-slate-100 transition-all duration-200 group ${a.color}`}
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
              {a.icon}
            </span>
            <span className="text-[#0a1f44] text-xs font-semibold text-center leading-tight">
              {a.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Blood Group Summary (mini chart) ─────────────────────────────────────────
function BloodGroupSummary() {
  const groups = [
    { group: "A+",  count: 22, color: "bg-red-500" },
    { group: "B+",  count: 18, color: "bg-red-400" },
    { group: "O+",  count: 25, color: "bg-red-600" },
    { group: "AB+", count: 10, color: "bg-red-700" },
    { group: "A−",  count: 3,  color: "bg-rose-400" },
    { group: "B−",  count: 2,  color: "bg-rose-500" },
    { group: "O−",  count: 2,  color: "bg-rose-600" },
  ];
  const max = Math.max(...groups.map((g) => g.count));

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-[#0a1f44] font-bold text-base">রক্তের গ্রুপ বিতরণ</h2>
          <GoldDivider />
        </div>
        <a href="/admin/blood-donors" className="text-xs text-slate-400 hover:text-yellow-600 transition-colors">বিস্তারিত →</a>
      </div>
      <div className="p-6 space-y-3">
        {groups.map((g) => (
          <div key={g.group} className="flex items-center gap-3">
            <span className="w-10 text-[#0a1f44] font-bold text-sm text-right flex-shrink-0">{g.group}</span>
            <div className="flex-1 bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${g.color} transition-all duration-700`}
                style={{ width: `${(g.count / max) * 100}%` }}
              />
            </div>
            <span className="w-8 text-slate-500 text-xs font-medium flex-shrink-0">{g.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Welcome Banner ────────────────────────────────────────────────────────────
function WelcomeBanner() {
  const today = new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    year:    "numeric",
    month:   "long",
    day:     "numeric",
  });

  return (
    <div className="relative bg-gradient-to-br from-[#0a1f44] to-[#0e2a5c] rounded-2xl overflow-hidden shadow-xl">
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,215,0,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.4) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-yellow-400/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 px-6 sm:px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-yellow-400 text-xs font-semibold tracking-widest uppercase mb-1">
            অ্যাডমিন প্যানেল
          </p>
          <h2 className="text-white text-xl sm:text-2xl font-extrabold leading-tight">
            স্বাগতম, আলফাজ রহমান! 👋
          </h2>
          <p className="text-blue-200 text-sm mt-1">{today}</p>
        </div>

        <div className="flex gap-3">
          <a
            href="/admin/notices?action=new"
            className="px-5 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200 text-sm whitespace-nowrap"
          >
            + নতুন নোটিশ
          </a>
          <a
            href="/"
            className="px-5 py-2.5 border border-yellow-400/40 text-yellow-300 font-semibold rounded-xl hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-200 text-sm whitespace-nowrap"
          >
            সাইট দেখুন
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex font-sans">
      {/* Sidebar */}
      <Sidebar
        active="dashboard"
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* Welcome banner */}
          <WelcomeBanner />

          {/* Stat cards */}
          <StatCards />

          {/* 2-column grid: activity + notices */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RecentActivityPanel />
            <LatestNoticesPanel />
          </div>

          {/* 2-column grid: quick actions + blood groups */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <QuickActions />
            <BloodGroupSummary />
          </div>

          {/* Footer credit */}
          <p className="text-center text-xs text-slate-400 pb-2">
            ওয়েবসাইটটি তৈরি ও পরিচালনায়:{" "}
            <span className="text-yellow-500 font-semibold">আলফাজ রহমান</span>
          </p>
        </main>
      </div>
    </div>
  );
}
