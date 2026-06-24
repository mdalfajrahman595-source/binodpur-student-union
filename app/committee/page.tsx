"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
interface CommitteeMember {
  id: number;
  name: string;
  position: string;
  phone?: string;
  photo_url?: string;
  intro?: string;
  category: "executive" | "advisory" | "general";
}

// ─── Static fallback data (replace with Supabase fetch) ───────────────────────
const committeeData: CommitteeMember[] = [
  // Executive
  {
    id: 1,
    name: "মোঃ আসাদুল ইসলাম",
    position: "সভাপতি",
    phone: "+৮৮০১৭XXXXXXXX",
    intro: "বিনোদপুর ছাত্র পরিষদের প্রতিষ্ঠাতা সদস্য ও বর্তমান সভাপতি। শিক্ষা ও সমাজসেবায় নিবেদিত।",
    category: "executive",
  },
  {
    id: 2,
    name: "মো: রাজু আহম্মেদ",
    position: "সিনিয়র সহ-সভাপতি",
    phone: "+৮৮০১৮XXXXXXXX",
    intro: "সংগঠনের কার্যক্রম পরিচালনায় সক্রিয় ভূমিকা পালনকারী একজন নিবেদিতপ্রাণ নেতা।",
    category: "executive",
  },
  {
    id: 3,
    name: "মোঃ আলফাজ রহমান",
    position: "তথ্য প্রযুক্তি ও প্রচার সম্পাদক",
    phone: "+৮৮০১৮৬৩৩৯৮১৫৫",
    intro: "সংগঠনের তথ্যপ্রযুক্তি ও ওয়েবসাইট পরিচালনার দায়িত্বে নিয়োজিত। ডিজিটাল উন্নয়নে অগ্রণী।",
    category: "executive",
  },
  {
    id: 4,
    name: "ইউনুস আলী সিয়াম",
    position: "যুগ্ম সম্পাদক",
    phone: "+৮৮০১৯XXXXXXXX",
    intro: "সাংগঠনিক কার্যক্রম সমন্বয়ে দক্ষ এবং শিক্ষার্থীদের অধিকার আদায়ে সোচ্চার।",
    category: "executive",
  },
  {
    id: 5,
    name: "ইউসুফ আলী সাইম",
    position: "সাংগঠনিক সম্পাদক",
    phone: "+৮৮০১৭XXXXXXXX",
    intro: "নতুন সদস্য সংগ্রহ ও সাংগঠনিক কাঠামো মজবুত করতে নিরলস কাজ করে যাচ্ছেন।",
    category: "executive",
  },
  {
    id: 6,
    name: "মাহমুদ হাসান অনিক",
    position: "অর্থ সম্পাদক",
    phone: "+৮৮০১৬XXXXXXXX",
    intro: "সংগঠনের আর্থিক ব্যবস্থাপনা ও হিসাব-নিকাশ সুষ্ঠুভাবে পরিচালনা করে থাকেন।",
    category: "executive",
  },
  {
    id: 7,
    name: "আবু তাহের",
    position: "প্রচার সম্পাদক",
    phone: "+৮৮০১৫XXXXXXXX",
    intro: "সামাজিক মাধ্যম ও প্রচারণায় সংগঠনের ভাবমূর্তি উজ্জ্বল রাখতে কাজ করে যাচ্ছেন।",
    category: "executive",
  },
  {
    id: 8,
    name: "এনামুল হক",
    position: "ক্রীড়া সম্পাদক",
    phone: "+৮৮০১৭XXXXXXXX",
    intro: "আন্তঃওয়ার্ড ক্রীড়া প্রতিযোগিতা ও খেলাধুলার আয়োজনে মুখ্য ভূমিকা পালন করেন।",
    category: "executive",
  },
  // Advisory
  {
    id: 9,
    name: "জনাব আবুল কাসেম",
    position: "প্রধান উপদেষ্টা",
    phone: "+৮৮০১৭XXXXXXXX",
    intro: "দীর্ঘ অভিজ্ঞতাসম্পন্ন সমাজসেবক। সংগঠনের প্রতিষ্ঠালগ্ন থেকে পথ দেখিয়ে আসছেন।",
    category: "advisory",
  },
  {
    id: 10,
    name: "জনাব মোশাররফ হোসেন",
    position: "উপদেষ্টা",
    phone: "+৮৮০১৮XXXXXXXX",
    intro: "শিক্ষা ও সমাজ উন্নয়নে বিশেষজ্ঞ। তরুণ প্রজন্মের অনুপ্রেরণার উৎস।",
    category: "advisory",
  },
  {
    id: 11,
    name: "জনাব রফিকুল ইসলাম",
    position: "উপদেষ্টা",
    phone: "+৮৮০১৯XXXXXXXX",
    intro: "স্থানীয় উন্নয়নকর্মী ও সমাজের বিশিষ্ট ব্যক্তিত্ব। সংগঠনের পথচলায় নির্ভরযোগ্য অভিভাবক।",
    category: "advisory",
  },
  // General members
  {
    id: 12,
    name: "মোঃ আরিফুল ইসলাম",
    position: "কার্যনির্বাহী সদস্য",
    phone: "+৮৮০১৭XXXXXXXX",
    intro: "সংগঠনের বিভিন্ন কার্যক্রমে সক্রিয় অংশগ্রহণকারী উদ্যমী সদস্য।",
    category: "general",
  },
  {
    id: 13,
    name: "মোঃ শাহিন আলম",
    position: "কার্যনির্বাহী সদস্য",
    phone: "+৮৮০১৮XXXXXXXX",
    intro: "রক্তদান ও স্বেচ্ছাসেবামূলক কার্যক্রমে সবসময় অগ্রণী ভূমিকা রাখেন।",
    category: "general",
  },
  {
    id: 14,
    name: "মোঃ জাহিদ হাসান",
    position: "কার্যনির্বাহী সদস্য",
    phone: "+৮৮০১৬XXXXXXXX",
    intro: "পরিবেশ রক্ষা ও বৃক্ষরোপণ কার্যক্রমে বিশেষ আগ্রহী একজন পরিশ্রমী সদস্য।",
    category: "general",
  },
  {
    id: 15,
    name: "মোঃ মাহমুদুল হাসান",
    position: "কার্যনির্বাহী সদস্য",
    phone: "+৮৮০১৫XXXXXXXX",
    intro: "ডিজিটাল প্রযুক্তি ও সোশ্যাল মিডিয়া পরিচালনায় দক্ষ এবং উদ্যমী।",
    category: "general",
  },
];

// ─── Nav links (same as homepage) ─────────────────────────────────────────────
const navLinks = [
  { label: "হোম", href: "/" },
  { label: "আমাদের সম্পর্কে", href: "/#about" },
  { label: "বর্তমান কমিটি", href: "/committee" },
  { label: "প্রাক্তন কমিটি", href: "/former-committee" },
  { label: "কার্যক্রম", href: "/#activities" },
  { label: "গ্যালারি", href: "/gallery" },
  { label: "নোটিশ", href: "/notices" },
  { label: "যোগাযোগ", href: "/#contact" },
];

// ─── Shared primitives (identical to homepage) ────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400" />
      <div className="w-2 h-2 rounded-full bg-yellow-400" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400" />
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
  light = false,
}: {
  title: string;
  subtitle?: string;
  light?: boolean;
}) {
  return (
    <div className="text-center mb-12">
      <h2
        className={`text-3xl md:text-4xl font-bold tracking-wide ${
          light ? "text-white" : "text-[#0a1f44]"
        }`}
      >
        {title}
      </h2>
      <GoldDivider />
      {subtitle && (
        <p
          className={`mt-2 text-base md:text-lg max-w-2xl mx-auto ${
            light ? "text-blue-200" : "text-slate-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Navbar (identical to homepage) ───────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a1f44] shadow-xl shadow-black/30"
          : "bg-[#0a1f44]/90 backdrop-blur-sm"
      }`}
    >
      <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[#0a1f44] font-extrabold text-xs shadow-lg shadow-yellow-500/30">
              BSWU
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">
                বিনোদপুর ছাত্র পরিষদ
              </p>
              <p className="text-yellow-400 text-xs">একতায়, উন্নয়নে</p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 hover:bg-white/5 ${
                  link.href === "/committee"
                    ? "text-yellow-400 font-semibold"
                    : "text-blue-100 hover:text-yellow-400"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="মেনু"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`h-0.5 bg-yellow-400 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 bg-yellow-400 transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-yellow-400 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#071530] border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block py-2.5 border-b border-white/5 text-sm ${
                link.href === "/committee"
                  ? "text-yellow-400 font-semibold"
                  : "text-blue-100 hover:text-yellow-400"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Page Hero (mirrors homepage Hero style) ───────────────────────────────────
function PageHero() {
  return (
    <section className="relative pt-36 pb-24 bg-[#071530] overflow-hidden">
      {/* Decorative rings — same as homepage Hero */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-yellow-500/10 animate-pulse" />
        <div className="absolute w-[700px] h-[700px] rounded-full border border-blue-500/5" />
      </div>

      {/* Grid texture — same as homepage */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow blobs — same as homepage Stats section */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-yellow-400 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue-400 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-sm text-blue-300 mb-6">
          <a href="/" className="hover:text-yellow-400 transition-colors">হোম</a>
          <span className="text-yellow-500">›</span>
          <span className="text-yellow-400 font-medium">বর্তমান কমিটি</span>
        </div>

        {/* Icon badge — same emblem style as homepage Hero */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700 flex items-center justify-center shadow-2xl shadow-yellow-500/30 ring-4 ring-yellow-400/20">
          <span className="text-2xl">👥</span>
        </div>

        <p className="text-yellow-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
          — ২০২৫-২০২৬ সেশন —
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          বর্তমান{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600">
            কমিটি
          </span>
        </h1>

        <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
          বিনোদপুর ছাত্র পরিষদের নির্বাচিত কার্যনির্বাহী কমিটি — যারা সংগঠনকে
          এগিয়ে নিয়ে চলেছে একতা ও সেবার আলোয়।
        </p>
      </div>
    </section>
  );
}

// ─── Member Card (uses homepage card DNA) ─────────────────────────────────────
function MemberCard({
  member,
  index,
  large = false,
}: {
  member: CommitteeMember;
  index: number;
  large?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-white rounded-xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-yellow-300 transition-all duration-500 group hover:-translate-y-1 overflow-hidden ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${(index % 4) * 100}ms` }}
    >
      {/* Photo area */}
      <div className={`relative bg-gradient-to-br from-[#0a1f44] to-[#0e2a5c] flex items-center justify-center ${large ? "h-52" : "h-44"}`}>
        {/* Gold top accent line — same as navbar/footer */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />

        {member.photo_url ? (
          <Image
            src={member.photo_url}
            alt={member.name}
            fill
            className="object-cover object-top"
          />
        ) : (
          /* Fallback avatar using initials in gold */
          <div className={`rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[#0a1f44] font-extrabold shadow-xl ring-4 ring-yellow-400/20 ${large ? "w-24 h-24 text-3xl" : "w-20 h-20 text-2xl"}`}>
            {member.name.split(" ").slice(-1)[0]?.charAt(0) ?? "?"}
          </div>
        )}

        {/* Position badge — glassmorphism chip, same pattern as notice tags */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <span className="bg-[#0a1f44]/80 backdrop-blur-sm border border-yellow-400/40 text-yellow-300 text-xs font-semibold px-3 py-1 rounded-full">
            {member.position}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className={`font-bold text-[#0a1f44] leading-tight group-hover:text-yellow-600 transition-colors ${large ? "text-lg" : "text-base"}`}>
          {member.name}
        </h3>

        {member.intro && (
          <p className="text-slate-500 text-sm leading-relaxed mt-2 line-clamp-3">
            {member.intro}
          </p>
        )}

        {member.phone && (
          <a
            href={`tel:${member.phone}`}
            className="mt-4 flex items-center gap-2 text-sm text-[#0a1f44] hover:text-yellow-600 transition-colors font-medium group/phone"
          >
            <span className="w-7 h-7 rounded-full bg-[#f0f4ff] group-hover/phone:bg-yellow-50 flex items-center justify-center text-base transition-colors flex-shrink-0">
              📞
            </span>
            {member.phone}
          </a>
        )}

        {/* Gold reveal line on hover — same as activity cards */}
        <div className="mt-4 h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

// ─── Executive Committee Section ──────────────────────────────────────────────
function ExecutiveSection({ members }: { members: CommitteeMember[] }) {
  const president = members.find((m) => m.position === "সভাপতি");
  const secretary = members.find((m) => m.position === "সাধারণ সম্পাদক");
  const rest = members.filter(
    (m) => m.position !== "সভাপতি" && m.position !== "সাধারণ সম্পাদক"
  );

  return (
    <section className="py-20 bg-[#f5f8ff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="কার্যনির্বাহী কমিটি"
          subtitle="সংগঠনের মূল পরিচালনা পর্ষদ — নির্বাচিত প্রতিনিধিগণ"
        />

        {/* President & Secretary — larger, centred (visual hierarchy) */}
        {(president || secretary) && (
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
            {[president, secretary].map(
              (m, i) =>
                m && (
                  <div key={m.id} className="w-full sm:w-72">
                    <MemberCard member={m} index={i} large />
                  </div>
                )
            )}
          </div>
        )}

        {/* Rest of executive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((m, i) => (
            <MemberCard key={m.id} member={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Advisory Section (dark bg — same as Statistics/Notices) ──────────────────
function AdvisorySection({ members }: { members: CommitteeMember[] }) {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0a1f44] via-[#0e2a5c] to-[#071530] relative overflow-hidden">
      {/* Same glow blobs as Stats section */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-yellow-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-400 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="উপদেষ্টা পরিষদ"
          subtitle="অভিজ্ঞ ব্যক্তিত্বদের নিয়ে গঠিত আমাদের পথপ্রদর্শক পরিষদ"
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((m, i) => (
            /* Advisory cards get a dark glass treatment */
            <div
              key={m.id}
              className="bg-white/8 backdrop-blur-sm border border-yellow-400/20 hover:border-yellow-400/50 rounded-xl overflow-hidden transition-all duration-300 group hover:-translate-y-1 hover:bg-white/12"
            >
              {/* Photo / avatar */}
              <div className="relative h-44 bg-gradient-to-br from-[#071530] to-[#0a1f44] flex items-center justify-center">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />

                {m.photo_url ? (
                  <Image src={m.photo_url} alt={m.name} fill className="object-cover object-top" />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[#0a1f44] font-extrabold text-2xl shadow-xl ring-4 ring-yellow-400/20">
                    {m.name.split(" ").slice(-1)[0]?.charAt(0) ?? "?"}
                  </div>
                )}

                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                  <span className="bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                    {m.position}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-bold text-white text-base leading-tight group-hover:text-yellow-300 transition-colors">
                  {m.name}
                </h3>
                {m.intro && (
                  <p className="text-blue-200 text-sm leading-relaxed mt-2 line-clamp-3">
                    {m.intro}
                  </p>
                )}
                {m.phone && (
                  <a
                    href={`tel:${m.phone}`}
                    className="mt-4 flex items-center gap-2 text-sm text-blue-300 hover:text-yellow-400 transition-colors font-medium"
                  >
                    <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-base flex-shrink-0">📞</span>
                    {m.phone}
                  </a>
                )}
                <div className="mt-4 h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── General Members Grid ──────────────────────────────────────────────────────
function GeneralMembersSection({ members }: { members: CommitteeMember[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="কার্যনির্বাহী সদস্যবৃন্দ"
          subtitle="পরিষদের সক্রিয় সদস্যগণ যারা প্রতিটি কার্যক্রমে অবদান রেখে চলেছেন"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {members.map((m, i) => (
            <MemberCard key={m.id} member={m} index={i} />
          ))}
        </div>

        {/* CTA strip — same ghost button style as homepage */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-br from-[#0a1f44] to-[#0e2a5c] px-8 py-6 rounded-2xl border border-yellow-400/20">
            <div className="text-left">
              <p className="text-white font-bold text-lg">সদস্য হতে চান?</p>
              <p className="text-blue-200 text-sm">আমাদের পরিবারের অংশ হয়ে উঠুন।</p>
            </div>
            <a
              href="/#contact"
              className="flex-shrink-0 px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-lg shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200 text-sm"
            >
              যোগাযোগ করুন
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer (identical to homepage) ───────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#050e20] text-white">
      <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[#0a1f44] font-extrabold text-xs shadow-lg">
                BSWU
              </div>
              <div>
                <p className="text-white font-bold text-base leading-tight">বিনোদপুর ছাত্র পরিষদ</p>
                <p className="text-yellow-400 text-xs">শিক্ষায় আলো, সেবায় জীবন</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              বিনোদপুর গ্রামের তরুণ প্রজন্মের একটি অরাজনৈতিক সেবামূলক সংগঠন।
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-yellow-400 font-semibold mb-4 text-sm uppercase tracking-wider">দ্রুত লিংক</h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-slate-400 hover:text-yellow-300 text-sm transition-colors">
                    › {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-yellow-400 font-semibold mb-4 text-sm uppercase tracking-wider">যোগাযোগ</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex gap-2"><span>📍</span><span>বিনোদপুর, সুঘাট, শেরপুর, বগুড়া</span></li>
              <li className="flex gap-2"><span>📞</span><span>+৮৮০১৮৬৩৩৯৮১৫৫</span></li>
              <li className="flex gap-2"><span>📧</span><span>alfajrahman595@gmail.com</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <p>© ২০২৬ বিনোদপুর ছাত্র পরিষদ। সর্বস্বত্ব সংরক্ষিত।</p>
          <p>
            ওয়েবসাইটটি তৈরি ও পরিচালনায়:{" "}
            <span className="text-yellow-400 font-semibold">আলফাজ রহমান</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function CommitteePage() {
  const executive = committeeData.filter((m) => m.category === "executive");
  const advisory  = committeeData.filter((m) => m.category === "advisory");
  const general   = committeeData.filter((m) => m.category === "general");

  return (
    <main className="font-sans">
      <Navbar />
      <PageHero />
      <ExecutiveSection members={executive} />
      <AdvisorySection  members={advisory} />
      <GeneralMembersSection members={general} />
      <Footer />
    </main>
  );
}
