"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Notice {
  id: number;
  title: string;
  date: string;
  category: string;
  description: string;
  tag: "জরুরি" | "সাধারণ" | "সদস্যপদ" | "স্বেচ্ছাসেবা" | "শিক্ষা" | "ক্রীড়া";
  featured?: boolean;
  archive?: boolean;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const allNotices: Notice[] = [
  // Featured
  {
    id: 1,
    title: "বিনোদপুর ছাত্র পরিষদের বার্ষিক সাধারণ সভা ও নতুন কমিটি গঠন বিজ্ঞপ্তি",
    date: "২৫ জুন, ২০২৬",
    category: "কমিটি সভা",
    tag: "জরুরি",
    description:
      "আগামী ৫ জুলাই ২০২৬ তারিখ রোজ রবিবার বিকাল ৩টায় বিনোদপুর উচ্চ বিদ্যালয় মাঠে সংগঠনের বার্ষিক সাধারণ সভা অনুষ্ঠিত হবে। উক্ত সভায় নতুন কার্যনির্বাহী কমিটি গঠন করা হবে। সকল সদস্যদের উপস্থিতি বাধ্যতামূলক। অনুপস্থিত সদস্যদের বিরুদ্ধে সাংগঠনিক ব্যবস্থা নেওয়া হতে পারে। সভায় আলোচ্য বিষয়: গত বছরের কার্যবিবরণী পর্যালোচনা, আর্থিক হিসাব উপস্থাপন এবং আগামী বছরের কর্মপরিকল্পনা প্রণয়ন।",
    featured: true,
  },
  // Latest
  {
    id: 2,
    title: "স্বেচ্ছায় রক্তদান কর্মসূচিতে অংশগ্রহণের আহ্বান",
    date: "২২ জুন, ২০২৬",
    category: "রক্তদান কর্মসূচি",
    tag: "স্বেচ্ছাসেবা",
    description:
      "আগামী ১০ জুলাই বিনোদপুর ইউনিয়ন স্বাস্থ্য কেন্দ্রে একটি বিশেষ রক্তদান ক্যাম্প আয়োজন করা হবে। ১৮ থেকে ৫০ বছর বয়সী সুস্থ যেকোনো ব্যক্তি রক্তদান করতে পারবেন। রক্তদাতাদের পরিচয়পত্র ও প্রয়োজনীয় সনদ প্রদান করা হবে। আগ্রহীরা ৫ জুলাইয়ের মধ্যে নাম নিবন্ধন করুন।",
  },
  {
    id: 3,
    title: "২০২৬-২৭ সেশনের নতুন সদস্য নিবন্ধন শুরু",
    date: "১৮ জুন, ২০২৬",
    category: "সদস্য নিবন্ধন",
    tag: "সদস্যপদ",
    description:
      "বিনোদপুর ছাত্র পরিষদে নতুন সদস্য ভর্তির আবেদন শুরু হয়েছে। বিনোদপুর গ্রামের ১৪ থেকে ৩০ বছর বয়সী যেকোনো শিক্ষার্থী সদস্য হতে পারবেন। আবেদন ফরম সংগ্রহ ও জমা দেওয়ার শেষ তারিখ ৩০ জুন ২০২৬। ফরম পেতে সাধারণ সম্পাদকের সাথে যোগাযোগ করুন।",
  },
  {
    id: 4,
    title: "মেধাবী শিক্ষার্থীদের জন্য শিক্ষা সহায়তা বৃত্তির আবেদন চলছে",
    date: "১৫ জুন, ২০২৬",
    category: "শিক্ষা সহায়তা কার্যক্রম",
    tag: "শিক্ষা",
    description:
      "বিনোদপুর ছাত্র পরিষদের শিক্ষা সহায়তা তহবিল থেকে এ বছর ১৫ জন মেধাবী ও আর্থিকভাবে অসচ্ছল শিক্ষার্থীকে বৃত্তি প্রদান করা হবে। এসএসসি ও এইচএসসি পর্যায়ের শিক্ষার্থীরা আবেদন করতে পারবেন। আবেদনের সাথে সর্বশেষ পরীক্ষার ফলাফল ও পরিবারের আয়ের প্রমাণপত্র জমা দিতে হবে।",
  },
  {
    id: 5,
    title: "আন্তঃওয়ার্ড ফুটবল টুর্নামেন্টে দল নিবন্ধন চলছে",
    date: "১২ জুন, ২০২৬",
    category: "ক্রীড়া",
    tag: "ক্রীড়া",
    description:
      "আসন্ন বর্ষা মৌসুমে বিনোদপুর ছাত্র পরিষদের উদ্যোগে আন্তঃওয়ার্ড ফুটবল টুর্নামেন্ট আয়োজন করা হবে। প্রতিটি ওয়ার্ড থেকে একটি করে দল অংশগ্রহণ করতে পারবে। দল নিবন্ধনের শেষ তারিখ ২০ জুন। চ্যাম্পিয়ন দলকে ট্রফি ও আর্থিক পুরস্কার প্রদান করা হবে।",
  },
  // Archive
  {
    id: 6,
    title: "বৃক্ষরোপণ অভিযানে অংশগ্রহণের আহ্বান",
    date: "১০ মে, ২০২৬",
    category: "সামাজিক কার্যক্রম",
    tag: "স্বেচ্ছাসেবা",
    description: "বিশ্ব পরিবেশ দিবস উপলক্ষে ৫ জুন বিনোদপুর গ্রামে ৫০০ গাছ রোপণ কার্যক্রম পরিচালিত হবে।",
    archive: true,
  },
  {
    id: 7,
    title: "ডিজিটাল দক্ষতা উন্নয়ন কর্মশালার ফলাফল প্রকাশ",
    date: "২ মে, ২০২৬",
    category: "কর্মশালা",
    tag: "শিক্ষা",
    description: "গত মাসে আয়োজিত ডিজিটাল দক্ষতা কর্মশালায় অংশগ্রহণকারী ৪০ জন সফলভাবে সনদ অর্জন করেছেন।",
    archive: true,
  },
  {
    id: 8,
    title: "ঈদ পুনর্মিলনী অনুষ্ঠানের সফল সমাপ্তি",
    date: "১৫ এপ্রিল, ২০২৬",
    category: "সাংস্কৃতিক",
    tag: "সাধারণ",
    description: "বিনোদপুর ছাত্র পরিষদ আয়োজিত ঈদ পুনর্মিলনীতে শতাধিক সদস্য অংশগ্রহণ করেন। অনুষ্ঠানটি সফলভাবে সম্পন্ন হয়েছে।",
    archive: true,
  },
  {
    id: 9,
    title: "শীতকালীন বস্ত্র বিতরণ কার্যক্রম সম্পন্ন",
    date: "৫ জানুয়ারি, ২০২৬",
    category: "সমাজসেবা",
    tag: "স্বেচ্ছাসেবা",
    description: "শীতার্ত অসহায় মানুষদের মধ্যে ১৫০টি কম্বল ও শীতবস্ত্র বিতরণ করা হয়েছে। সকল দাতা ও স্বেচ্ছাসেবীদের ধন্যবাদ।",
    archive: true,
  },
  {
    id: 10,
    title: "বার্ষিক পুরস্কার বিতরণ অনুষ্ঠানের নোটিশ",
    date: "২০ ডিসেম্বর, ২০২৫",
    category: "কমিটি সভা",
    tag: "সাধারণ",
    description: "২০২৫ সালের বার্ষিক পুরস্কার বিতরণ ও সাংস্কৃতিক অনুষ্ঠান সফলভাবে আয়োজন করা হয়েছিল।",
    archive: true,
  },
];

// ─── Nav links ─────────────────────────────────────────────────────────────────
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

// ─── Tag config ───────────────────────────────────────────────────────────────
const tagConfig: Record<string, { light: string; dark: string; dot: string }> = {
  জরুরি:     { light: "bg-red-100 text-red-700 border border-red-200",       dark: "bg-red-500/20 text-red-300 border border-red-400/30",       dot: "bg-red-500" },
  সদস্যপদ:   { light: "bg-blue-100 text-blue-700 border border-blue-200",     dark: "bg-blue-500/20 text-blue-300 border border-blue-400/30",     dot: "bg-blue-400" },
  স্বেচ্ছাসেবা:{ light: "bg-green-100 text-green-700 border border-green-200", dark: "bg-green-500/20 text-green-300 border border-green-400/30", dot: "bg-green-400" },
  শিক্ষা:    { light: "bg-purple-100 text-purple-700 border border-purple-200",dark: "bg-purple-500/20 text-purple-300 border border-purple-400/30",dot: "bg-purple-400" },
  ক্রীড়া:   { light: "bg-orange-100 text-orange-700 border border-orange-200",dark: "bg-orange-500/20 text-orange-300 border border-orange-400/30",dot: "bg-orange-400" },
  সাধারণ:    { light: "bg-slate-100 text-slate-600 border border-slate-200",   dark: "bg-white/10 text-blue-200 border border-white/20",           dot: "bg-slate-400" },
};

function getTag(tag: string) {
  return tagConfig[tag] ?? tagConfig["সাধারণ"];
}

// ─── Shared primitives (identical to homepage & committee) ────────────────────
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
      <h2 className={`text-3xl md:text-4xl font-bold tracking-wide ${light ? "text-white" : "text-[#0a1f44]"}`}>
        {title}
      </h2>
      <GoldDivider />
      {subtitle && (
        <p className={`mt-2 text-base md:text-lg max-w-2xl mx-auto ${light ? "text-blue-200" : "text-slate-500"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a1f44] shadow-xl shadow-black/30" : "bg-[#0a1f44]/90 backdrop-blur-sm"}`}>
      <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[#0a1f44] font-extrabold text-xs shadow-lg shadow-yellow-500/30">
              BSWU
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-sm leading-tight">বিনোদপুর ছাত্র পরিষদ</p>
              <p className="text-yellow-400 text-xs">একতায়, উন্নয়নে</p>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm px-3 py-2 rounded-md transition-colors duration-200 hover:bg-white/5 ${
                  link.href === "/notices" ? "text-yellow-400 font-semibold" : "text-blue-100 hover:text-yellow-400"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button className="lg:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="মেনু">
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
              className={`block py-2.5 border-b border-white/5 text-sm ${link.href === "/notices" ? "text-yellow-400 font-semibold" : "text-blue-100 hover:text-yellow-400"}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Page Hero ────────────────────────────────────────────────────────────────
function PageHero() {
  return (
    <section className="relative pt-36 pb-24 bg-[#071530] overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[500px] rounded-full border border-yellow-500/10 animate-pulse" />
        <div className="absolute w-[700px] h-[700px] rounded-full border border-blue-500/5" />
      </div>
      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Glow blobs */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-yellow-400 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue-400 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-sm text-blue-300 mb-6">
          <a href="/" className="hover:text-yellow-400 transition-colors">হোম</a>
          <span className="text-yellow-500">›</span>
          <span className="text-yellow-400 font-medium">নোটিশ বোর্ড</span>
        </div>

        {/* Icon badge */}
        <div className="mx-auto mb-6 w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700 flex items-center justify-center shadow-2xl shadow-yellow-500/30 ring-4 ring-yellow-400/20">
          <span className="text-3xl">📋</span>
        </div>

        <p className="text-yellow-400 text-sm font-semibold tracking-[0.3em] uppercase mb-3">
          — সর্বশেষ আপডেট —
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          নোটিশ{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600">
            বোর্ড
          </span>
        </h1>

        <p className="text-blue-200 text-lg max-w-2xl mx-auto leading-relaxed">
          বিনোদপুর ছাত্র পরিষদের সকল ঘোষণা, বিজ্ঞপ্তি ও কার্যক্রমের আপডেট এখানে
          নিয়মিত প্রকাশিত হয়।
        </p>

        {/* Quick stats row */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {[
            { icon: "📌", label: "মোট নোটিশ", value: "১০+" },
            { icon: "🔴", label: "জরুরি নোটিশ", value: "১টি" },
            { icon: "📅", label: "সর্বশেষ আপডেট", value: "২৫ জুন" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2 bg-white/8 border border-yellow-400/20 rounded-xl px-5 py-3 backdrop-blur-sm">
              <span className="text-xl">{s.icon}</span>
              <div className="text-left">
                <p className="text-yellow-400 font-bold text-base leading-tight">{s.value}</p>
                <p className="text-blue-300 text-xs">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Notice ──────────────────────────────────────────────────────────
function FeaturedNotice({ notice }: { notice: Notice }) {
  const [expanded, setExpanded] = useState(false);
  const tag = getTag(notice.tag);

  return (
    <section className="py-16 bg-[#f5f8ff]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="বিশেষ বিজ্ঞপ্তি" subtitle="সর্বোচ্চ গুরুত্বপূর্ণ নোটিশ" />

        <div className="relative bg-white rounded-2xl shadow-xl border border-yellow-200 overflow-hidden group hover:shadow-2xl transition-all duration-300">
          {/* Gold top bar */}
          <div className="h-1.5 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />

          {/* Watermark icon */}
          <div className="absolute top-6 right-6 text-8xl opacity-5 select-none pointer-events-none">📋</div>

          <div className="p-6 sm:p-10">
            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${tag.light}`}>
                🔴 {notice.tag}
              </span>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#f0f4ff] text-[#0a1f44] border border-blue-100">
                📁 {notice.category}
              </span>
              <span className="text-slate-400 text-sm ml-auto">📅 {notice.date}</span>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0a1f44] leading-snug mb-5">
              {notice.title}
            </h2>

            {/* Gold divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-yellow-400/60 to-transparent" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
            </div>

            {/* Description */}
            <p className={`text-slate-600 leading-relaxed text-base ${!expanded ? "line-clamp-3" : ""}`}>
              {notice.description}
            </p>

            {/* Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <button
                onClick={() => setExpanded(!expanded)}
                className="px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-lg shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200 text-sm"
              >
                {expanded ? "সংক্ষেপ করুন ↑" : "বিস্তারিত পড়ুন →"}
              </button>
              <span className="text-slate-400 text-xs">প্রকাশিত: {notice.date}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Notice Card (Latest) ─────────────────────────────────────────────────────
function NoticeCard({ notice, index }: { notice: Notice; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const tag = getTag(notice.tag);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
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
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      {/* Thin gold top line on hover */}
      <div className="h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-6">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tag.light}`}>
            {notice.tag}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#f0f4ff] text-[#0a1f44] font-medium border border-blue-100">
            {notice.category}
          </span>
          <span className="ml-auto text-slate-400 text-xs">📅 {notice.date}</span>
        </div>

        {/* Title */}
        <h3 className="font-bold text-[#0a1f44] text-base leading-snug mb-3 group-hover:text-yellow-700 transition-colors">
          {notice.title}
        </h3>

        {/* Description */}
        <p className={`text-slate-500 text-sm leading-relaxed ${!expanded ? "line-clamp-2" : ""}`}>
          {notice.description}
        </p>

        {/* Gold reveal line */}
        <div className="mt-4 h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-300 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Read more */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0a1f44] hover:text-yellow-600 transition-colors group/btn"
        >
          <span>{expanded ? "সংক্ষেপ করুন" : "বিস্তারিত পড়ুন"}</span>
          <span className={`transition-transform duration-200 ${expanded ? "rotate-90" : "group-hover/btn:translate-x-1"}`}>
            {expanded ? "↑" : "→"}
          </span>
        </button>
      </div>
    </div>
  );
}

// ─── Latest Notices Section ───────────────────────────────────────────────────
function LatestNotices({ notices }: { notices: Notice[] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="সর্বশেষ নোটিশ"
          subtitle="সাম্প্রতিক ঘোষণা ও বিজ্ঞপ্তিসমূহ"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((n, i) => (
            <NoticeCard key={n.id} notice={n} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Archive Section (dark bg — same as Stats/Notices on homepage) ─────────────
function ArchiveSection({ notices }: { notices: Notice[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? notices : notices.slice(0, 5);

  return (
    <section className="py-20 bg-gradient-to-br from-[#0a1f44] via-[#0e2a5c] to-[#071530] relative overflow-hidden">
      {/* Same glow blobs as homepage Stats */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-yellow-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-400 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="নোটিশ আর্কাইভ"
          subtitle="পূর্ববর্তী নোটিশ ও বিজ্ঞপ্তির সংকলন"
          light
        />

        <div className="space-y-3">
          {visible.map((notice, i) => {
            const tag = getTag(notice.tag);
            return (
              <div
                key={notice.id}
                className="flex items-center gap-4 bg-white/8 hover:bg-white/12 border border-yellow-400/15 hover:border-yellow-400/40 rounded-xl px-5 py-4 transition-all duration-200 cursor-pointer group"
              >
                {/* Colored dot — same as homepage notice list */}
                <div className={`w-2 h-2 rounded-full flex-shrink-0 group-hover:scale-150 transition-transform ${tag.dot}`} />

                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-semibold text-sm sm:text-base group-hover:text-yellow-300 transition-colors truncate">
                    {notice.title}
                  </h3>
                  <p className="text-blue-300 text-xs mt-0.5">{notice.date} · {notice.category}</p>
                </div>

                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0 hidden sm:block ${tag.dark}`}>
                  {notice.tag}
                </span>

                <span className="text-yellow-400 text-lg flex-shrink-0 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </div>
            );
          })}
        </div>

        {notices.length > 5 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3 border border-yellow-400/40 text-yellow-300 font-semibold rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-200 text-sm"
            >
              {showAll ? "কম দেখুন ↑" : `আরও ${notices.length - 5}টি নোটিশ দেখুন ↓`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Subscribe CTA (white bg, same card DNA) ──────────────────────────────────
function SubscribeCTA() {
  return (
    <section className="py-16 bg-[#f5f8ff]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-[#0a1f44] to-[#0e2a5c] rounded-2xl px-8 py-12 border border-yellow-400/20 relative overflow-hidden">
          {/* Decorative ring */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
            <div className="w-80 h-80 rounded-full border border-yellow-400" />
          </div>

          <div className="relative z-10">
            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-xl shadow-yellow-500/30 text-2xl">
              🔔
            </div>
            <h3 className="text-2xl font-extrabold text-white mb-3">
              নোটিশ মিস করতে চান না?
            </h3>
            <GoldDivider />
            <p className="text-blue-200 text-base leading-relaxed mt-3 mb-8">
              আমাদের সাথে যুক্ত থাকুন। সকল বিজ্ঞপ্তি সবার আগে পেতে সংগঠনের
              সদস্য হোন অথবা সরাসরি যোগাযোগ করুন।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/committee"
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-lg shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200 text-sm"
              >
                কমিটির সাথে যোগাযোগ করুন
              </a>
              <a
                href="/"
                className="px-8 py-3 border border-yellow-400/40 text-yellow-300 font-semibold rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-200 text-sm"
              >
                হোমপেজে ফিরুন
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer (identical to homepage & committee) ───────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#050e20] text-white">
      <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
  <span className="block text-slate-600 text-xs mt-0.5">
    কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিং, নেত্রকোনা বিশ্ববিদ্যালয়
  </span>
</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NoticesPage() {
  const featured = allNotices.find((n) => n.featured)!;
  const latest   = allNotices.filter((n) => !n.featured && !n.archive);
  const archive  = allNotices.filter((n) => n.archive);

  return (
    <main className="font-sans">
      <Navbar />
      <PageHero />
      <FeaturedNotice notice={featured} />
      <LatestNotices notices={latest} />
      <ArchiveSection notices={archive} />
      <SubscribeCTA />
      <Footer />
    </main>
  );
}
