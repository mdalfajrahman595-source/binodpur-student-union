"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Activity {
  icon: string;
  title: string;
  date: string;
  description: string;
}

interface Notice {
  title: string;
  date: string;
  tag: string;
}

interface Stat {
  value: string;
  label: string;
  icon: string;
}

interface BloodStat {
  value: string;
  label: string;
  icon: string;
}

interface MembershipBenefit {
  icon: string;
  text: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "হোম", href: "/" },
  { label: "আমাদের সম্পর্কে", href: "/#about" },
  { label: "বর্তমান কমিটি", href: "/committee" },
  { label: "প্রাক্তন কমিটি", href: "/former-committee" },
  { label: "কার্যক্রম", href: "/#activities" },
  { label: "গ্যালারি", href: "/gallery" },
  { label: "রক্তদাতা", href: "/blood-donors" },
  { label: "সদস্য নিবন্ধন", href: "/registration" },
  { label: "নোটিশ", href: "/notices" },
  { label: "যোগাযোগ", href: "/#contact" },
];

const stats: Stat[] = [
  { value: "৫০০+", label: "মোট সদস্য", icon: "👥" },
  { value: "১২০+", label: "মোট কার্যক্রম", icon: "📋" },
  { value: "৮০+", label: "রক্তদাতা", icon: "🩸" },
];

const bloodStats: BloodStat[] = [
  { value: "৮০+", label: "মোট রক্তদাতা", icon: "🩸" },
  { value: "৮টি", label: "উপলব্ধ রক্তের গ্রুপ", icon: "🧬" },
  { value: "১২+", label: "সাম্প্রতিক রক্তদান", icon: "📅" },
];

const membershipBenefits: MembershipBenefit[] = [
  { icon: "🤝", text: "সমাজসেবামূলক কার্যক্রমে অংশগ্রহণ" },
  { icon: "🩸", text: "রক্তদান কার্যক্রমে সম্পৃক্ততা" },
  { icon: "🌟", text: "নেতৃত্ব বিকাশের সুযোগ" },
  { icon: "🎓", text: "শিক্ষার্থীদের নেটওয়ার্ক গঠন" },
];

const activities: Activity[] = [
  {
    icon: "📚",
    title: "বার্ষিক শিক্ষা সহায়তা কর্মসূচি",
    date: "১৫ জুন, ২০২৬",
    description:
      "মেধাবী ও অসচ্ছল শিক্ষার্থীদের মধ্যে বৃত্তি ও শিক্ষা উপকরণ বিতরণ করা হবে।",
  },
  {
    icon: "🩸",
    title: "স্বেচ্ছায় রক্তদান ক্যাম্প",
    date: "২২ জুন, ২০২৬",
    description:
      "এলাকার সকল সুস্থ মানুষদের রক্তদানে উৎসাহিত করতে বিশেষ ক্যাম্পের আয়োজন।",
  },
  {
    icon: "🌳",
    title: "বৃক্ষরোপণ অভিযান",
    date: "৫ জুলাই, ২০২৬",
    description:
      "সবুজ পরিবেশ রক্ষায় গ্রামজুড়ে এক হাজার গাছ রোপণের লক্ষ্যমাত্রা নির্ধারণ।",
  },
  {
    icon: "🏆",
    title: "আন্তঃওয়ার্ড ক্রীড়া প্রতিযোগিতা",
    date: "১৮ জুলাই, ২০২৬",
    description:
      "ফুটবল, ব্যাডমিন্টন ও ক্রিকেটসহ বিভিন্ন ক্রীড়া বিভাগে প্রতিযোগিতার আয়োজন।",
  },
  {
    icon: "💻",
    title: "ডিজিটাল দক্ষতা উন্নয়ন কর্মশালা",
    date: "৩০ জুলাই, ২০২৬",
    description:
      "তরুণ প্রজন্মকে তথ্যপ্রযুক্তিতে দক্ষ করে তুলতে বিশেষ প্রশিক্ষণ কর্মশালা।",
  },
  {
    icon: "🤝",
    title: "সামাজিক সচেতনতা র‍্যালি",
    date: "১০ আগস্ট, ২০২৬",
    description:
      "মাদক, বাল্যবিবাহ ও নারী নির্যাতনের বিরুদ্ধে সচেতনতামূলক র‍্যালি ও আলোচনা সভা।",
  },
];

const notices: Notice[] = [
  {
    title: "বার্ষিক সাধারণ সভার নোটিশ",
    date: "২০ জুন, ২০২৬",
    tag: "জরুরি",
  },
  {
    title: "নতুন সদস্য নিবন্ধনের আবেদন শুরু",
    date: "১৮ জুন, ২০২৬",
    tag: "সদস্যপদ",
  },
  {
    title: "রক্তদান ক্যাম্পে স্বেচ্ছাসেবক আহ্বান",
    date: "১৫ জুন, ২০২৬",
    tag: "স্বেচ্ছাসেবা",
  },
  {
    title: "ক্রীড়া প্রতিযোগিতায় দল নিবন্ধন চলছে",
    date: "১২ জুন, ২০২৬",
    tag: "খেলাধুলা",
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a1f44] shadow-xl shadow-black/30"
          : "bg-[#0a1f44]/90 backdrop-blur-sm"
      }`}
    >
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
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
                className="text-blue-100 hover:text-yellow-400 text-sm px-3 py-2 rounded-md transition-colors duration-200 hover:bg-white/5"
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
              <span
                className={`h-0.5 bg-yellow-400 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`h-0.5 bg-yellow-400 transition-all ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 bg-yellow-400 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#071530] border-t border-white/10 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-blue-100 hover:text-yellow-400 py-2.5 border-b border-white/5 text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#071530]"
    >
      {/* Decorative background rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full border border-yellow-500/10 animate-pulse" />
        <div className="absolute w-[800px] h-[800px] rounded-full border border-blue-500/5" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-yellow-400/8" />
      </div>

      {/* Radial glow */}
      <div className="absolute inset-0 bg-radial-at-center from-blue-900/30 via-transparent to-transparent" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20">
        {/* Emblem */}
        <div className="mx-auto mb-8 w-28 h-28 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700 flex items-center justify-center shadow-2xl shadow-yellow-500/30 ring-4 ring-yellow-400/20">
          <span className="text-[#0a1f44] font-extrabold text-xl">BSWU</span>
        </div>

        <p className="text-yellow-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
          — স্বাগতম —
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          বিনোদপুর
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600">
            ছাত্র পরিষদ
          </span>
        </h1>

        <p className="text-blue-200 text-lg md:text-xl max-w-xl mx-auto mb-4 leading-relaxed">
          জ্ঞান, একতা ও সেবার পথে এগিয়ে চলি — আমরাই বিনোদপুরের আগামী।
        </p>

        <p className="text-yellow-400/80 text-base italic mb-10">
          "শিক্ষায় আলো, সেবায় জীবন"
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#about"
            className="px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-lg shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200"
          >
            আমাদের সম্পর্কে জানুন
          </a>
          <a
            href="#activities"
            className="px-8 py-3.5 border border-yellow-400/40 text-yellow-300 font-semibold rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-200"
          >
            কার্যক্রম দেখুন
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-yellow-400/60 text-xs">
        <span>নিচে স্ক্রোল করুন</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-yellow-400/60 to-transparent animate-bounce" />
      </div>
    </section>
  );
}

// ─── Welcome ──────────────────────────────────────────────────────────────────
function Welcome() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Decorative left column */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-yellow-400 rounded-tl-lg" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#0a1f44] rounded-br-lg" />
            <div className="bg-gradient-to-br from-[#0a1f44] to-[#143166] p-10 rounded-xl text-white text-center shadow-2xl">
              <div className="text-6xl mb-4">🕌</div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                বিনোদপুর গ্রাম
              </h3>
              <p className="text-blue-200 text-sm leading-relaxed">
                একটি ঐতিহ্যবাহী গ্রামের তরুণ প্রজন্মের ঐক্যের প্রতীক
              </p>
              <div className="mt-6 flex justify-center gap-4">
                {["📚", "🤝", "🌿"].map((emoji, i) => (
                  <span
                    key={i}
                    className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl"
                  >
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Text column */}
          <div>
            <p className="text-yellow-500 font-semibold tracking-widest text-sm uppercase mb-2">
              আমাদের সম্পর্কে
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1f44] mb-4 leading-tight">
              স্বাগতম বিনোদপুর ছাত্র পরিষদে
            </h2>
            <GoldDivider />
            <p className="text-slate-600 leading-relaxed text-base mb-4 mt-4">
              বিনোদপুর ছাত্র পরিষদ একটি অরাজনৈতিক, সেবামূলক ছাত্র সংগঠন।
              আমাদের লক্ষ্য হলো বিনোদপুর গ্রামের শিক্ষার্থীদের মেধা বিকাশ,
              সামাজিক সচেতনতা বৃদ্ধি এবং সেবামূলক কার্যক্রমের মাধ্যমে একটি
              আদর্শ সমাজ গড়ে তোলা।
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              সংগঠনটি প্রতিষ্ঠার পর থেকে শিক্ষা সহায়তা, রক্তদান, বৃক্ষরোপণ,
              সাংস্কৃতিক অনুষ্ঠান ও ক্রীড়া কার্যক্রমসহ বহুমুখী উদ্যোগ গ্রহণ
              করে আসছে।
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              {[
                { label: "প্রতিষ্ঠাকাল", value: "২০২৪ সাল" },
                { label: "সক্রিয় জেলা", value: "বগুড়া" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-[#f0f4ff] border-l-4 border-yellow-400 px-5 py-3 rounded-r-lg"
                >
                  <p className="text-[#0a1f44] font-bold text-lg">
                    {item.value}
                  </p>
                  <p className="text-slate-500 text-sm">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Statistics ───────────────────────────────────────────────────────────────
function Statistics() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-[#0a1f44] via-[#0e2a5c] to-[#071530] relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-yellow-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-blue-400 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="আমাদের অর্জন"
          subtitle="সংখ্যায় আমাদের পরিচয়"
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`text-center p-8 rounded-2xl border border-yellow-400/20 bg-white/5 backdrop-blur-sm transition-all duration-700 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="text-5xl mb-4">{stat.icon}</div>
              <div className="text-5xl font-extrabold text-yellow-400 mb-2">
                {stat.value}
              </div>
              <div className="text-blue-200 text-lg font-medium">
                {stat.label}
              </div>
              <div className="mt-4 h-1 w-16 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Activities ───────────────────────────────────────────────────────────────
function Activities() {
  return (
    <section id="activities" className="py-20 bg-[#f5f8ff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="বৈশিষ্ট্যমূলক কার্যক্রম"
          subtitle="আমাদের সাম্প্রতিক ও আসন্ন উদ্যোগসমূহ"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((act, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl border border-slate-100 hover:border-yellow-300 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#f0f4ff] flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-yellow-50 transition-colors">
                  {act.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#0a1f44] text-base leading-tight group-hover:text-yellow-600 transition-colors">
                    {act.title}
                  </h3>
                  <p className="text-yellow-600 text-xs mt-1 font-medium">
                    📅 {act.date}
                  </p>
                </div>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                {act.description}
              </p>
              <div className="mt-4 h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Emergency Blood Support ────────────────────────────────────────────────────
function EmergencyBlood() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="blood-support"
      ref={ref}
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-red-500 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-yellow-400 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-gradient-to-br from-[#0a1f44] to-[#143166] rounded-2xl p-8 sm:p-12 shadow-2xl border border-yellow-400/10 relative overflow-hidden">
          {/* Emergency accent ring */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-red-400/20" />

          <div className="relative text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-white">
              🩸 জরুরি রক্তের প্রয়োজন?
            </h2>
            <GoldDivider />
            <p className="mt-2 text-base md:text-lg max-w-2xl mx-auto text-blue-200">
              বিনোদপুর ছাত্র পরিষদের রক্তদাতা ডাটাবেস থেকে দ্রুত রক্তদাতা
              খুঁজুন এবং প্রয়োজনে সরাসরি যোগাযোগ করুন।
            </p>
          </div>

          {/* Statistics cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            {bloodStats.map((stat, i) => (
              <div
                key={i}
                className={`text-center p-6 rounded-2xl border border-yellow-400/20 bg-white/5 backdrop-blur-sm transition-all duration-700 ${
                  visible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl font-extrabold text-yellow-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-blue-200 text-base font-medium">
                  {stat.label}
                </div>
                <div className="mt-3 h-1 w-14 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full" />
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
            <a
              href="/blood-donors"
              className="px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-lg shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200 text-center"
            >
              রক্তদাতা খুঁজুন
            </a>
            <a
              href="/#contact"
              className="px-8 py-3.5 border border-red-400/40 text-red-300 font-semibold rounded-lg hover:bg-red-400/10 hover:border-red-400 transition-all duration-200 text-center"
            >
              জরুরি সহায়তা
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Membership Registration ────────────────────────────────────────────────────
function Membership() {
  return (
    <section id="membership" className="py-20 bg-[#f5f8ff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <div>
            <p className="text-yellow-500 font-semibold tracking-widest text-sm uppercase mb-2">
              আমাদের সাথে যুক্ত হোন
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1f44] mb-4 leading-tight">
              👥 বিনোদপুর ছাত্র পরিষদের সদস্য হোন
            </h2>
            <GoldDivider />
            <p className="text-slate-600 leading-relaxed text-base mb-6 mt-4">
              আমাদের সংগঠনের সদস্য হয়ে শিক্ষা, সমাজসেবা, রক্তদান ও বিভিন্ন
              উন্নয়নমূলক কার্যক্রমে অংশগ্রহণ করুন।
            </p>
            <a
              href="/registration"
              className="inline-block px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-lg shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200"
            >
              সদস্য নিবন্ধন করুন
            </a>
          </div>

          {/* Benefits cards column */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {membershipBenefits.map((benefit, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl border border-slate-100 hover:border-yellow-300 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f0f4ff] flex items-center justify-center text-2xl flex-shrink-0 group-hover:bg-yellow-50 transition-colors mb-3">
                  {benefit.icon}
                </div>
                <p className="text-[#0a1f44] font-semibold text-sm leading-relaxed group-hover:text-yellow-600 transition-colors">
                  {benefit.text}
                </p>
                <div className="mt-3 h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Notices ──────────────────────────────────────────────────────────────────
function Notices() {
  const tagColor: Record<string, string> = {
    জরুরি: "bg-red-100 text-red-700 border border-red-200",
    সদস্যপদ: "bg-blue-100 text-blue-700 border border-blue-200",
    স্বেচ্ছাসেবা: "bg-green-100 text-green-700 border border-green-200",
    খেলাধুলা: "bg-purple-100 text-purple-700 border border-purple-200",
  };

  return (
    <section
      id="notices"
      className="py-20 bg-gradient-to-br from-[#0a1f44] to-[#0e2a5c]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title="সর্বশেষ নোটিশ" light />

        <div className="space-y-4">
          {notices.map((notice, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-white/8 hover:bg-white/12 border border-yellow-400/15 hover:border-yellow-400/40 rounded-xl px-6 py-5 transition-all duration-200 cursor-pointer group"
            >
              <div className="w-2 h-2 rounded-full bg-yellow-400 flex-shrink-0 group-hover:scale-150 transition-transform" />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-base group-hover:text-yellow-300 transition-colors truncate">
                  {notice.title}
                </h3>
                <p className="text-blue-300 text-sm mt-0.5">{notice.date}</p>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full flex-shrink-0 ${tagColor[notice.tag] ?? "bg-white/10 text-white"}`}
              >
                {notice.tag}
              </span>
              <span className="text-yellow-400 text-lg flex-shrink-0 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a
            href="#notices"
            className="inline-block px-8 py-3 border border-yellow-400/40 text-yellow-300 font-semibold rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-200"
          >
            সকল নোটিশ দেখুন
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
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
                <p className="text-white font-bold text-base leading-tight">
                  বিনোদপুর ছাত্র পরিষদ
                </p>
                <p className="text-yellow-400 text-xs">
                  শিক্ষায় আলো, সেবায় জীবন
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              বিনোদপুর গ্রামের তরুণ প্রজন্মের একটি অরাজনৈতিক সেবামূলক সংগঠন।
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-yellow-400 font-semibold mb-4 text-sm uppercase tracking-wider">
              দ্রুত লিংক
            </h4>
            <ul className="space-y-2">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-yellow-300 text-sm transition-colors"
                  >
                    › {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-yellow-400 font-semibold mb-4 text-sm uppercase tracking-wider">
              যোগাযোগ
            </h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex gap-2">
                <span>📍</span>
                <span>বিনোদপুর, সুঘাট, শেরপুর, বগুড়া</span>
              </li>
              <li className="flex gap-2">
                <span>📞</span>
                <span>+৮৮০১৮৬৩৩৯৮১৫৫</span>
              </li>
              <li className="flex gap-2">
                <span>📧</span>
                <span>alfajrahman595@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
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
export default function Home() {
  return (
    <main className="font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Hind Siliguri', sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Navbar />
      <Hero />
      <Welcome />
      <Statistics />
      <Activities />
      <EmergencyBlood />
      <Membership />
      <Notices />
      <Footer />
    </main>
  );
}
