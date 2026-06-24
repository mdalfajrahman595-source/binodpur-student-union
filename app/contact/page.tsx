"use client";

import { useState, useEffect, useRef } from "react";

// ─── Nav Links ────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "হোম",              href: "/"            },
  { label: "আমাদের সম্পর্কে", href: "/#about"      },
  { label: "বর্তমান কমিটি",   href: "/committee"   },
  { label: "প্রাক্তন কমিটি",  href: "/former-committee" },
  { label: "কার্যক্রম",       href: "/#activities"  },
  { label: "গ্যালারি",        href: "/gallery"      },
  { label: "রক্তদাতা",        href: "/blood-donors" },
  { label: "সদস্য নিবন্ধন",   href: "/registration" },
  { label: "নোটিশ",           href: "/notices"      },
  { label: "যোগাযোগ",         href: "/contact"      },
];

// ─── Contact Data ─────────────────────────────────────────────────────────────
const contactCards = [
  {
    icon: "📞",
    label: "মোবাইল নম্বর",
    value: "+৮৮০ ১৮৬৩-৩৯৮১৫৫",
    sub: "সকাল ৯টা – রাত ১০টা",
    href: "tel:+8801863398155",
    cta: "এখনই কল করুন",
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-400/30",
    dot: "bg-blue-400",
  },
  {
    icon: "✉️",
    label: "ইমেইল",
    value: "alfajrahman595@gmail.com",
    sub: "২৪ ঘণ্টার মধ্যে উত্তর",
    href: "mailto:alfajrahman595@gmail.com",
    cta: "ইমেইল পাঠান",
    color: "from-yellow-500/20 to-yellow-600/10",
    border: "border-yellow-400/30",
    dot: "bg-yellow-400",
  },
  {
    icon: "📍",
    label: "অফিস ঠিকানা",
    value: "বিনোদপুর, সুঘাট, শেরপুর, বগুড়া",
    sub: "বাংলাদেশ",
    href: "#map",
    cta: "মানচিত্রে দেখুন",
    color: "from-green-500/20 to-green-600/10",
    border: "border-green-400/30",
    dot: "bg-green-400",
  },
  {
    icon: "🕐",
    label: "অফিস সময়",
    value: "শনি – বৃহস্পতি",
    sub: "সকাল ১০টা – বিকেল ৫টা",
    href: null,
    cta: null,
    color: "from-purple-500/20 to-purple-600/10",
    border: "border-purple-400/30",
    dot: "bg-purple-400",
  },
];

const socialCards = [
  {
    icon: "👥",
    platform: "Facebook Page",
    bangla: "ফেসবুক পেজ",
    desc: "আমাদের অফিশিয়াল পেজ লাইক ও ফলো করুন এবং সর্বশেষ আপডেট পান।",
    handle: "@BinoduporChhatraParishot",
    href: "https://facebook.com",
    color: "from-[#1877F2]/20 to-[#1877F2]/5",
    border: "border-[#1877F2]/30",
    badge: "Official Page",
    badgeColor: "bg-[#1877F2]/20 text-[#6aa3f5]",
  },
  {
    icon: "👨‍👩‍👧‍👦",
    platform: "Facebook Group",
    bangla: "ফেসবুক গ্রুপ",
    desc: "আমাদের কমিউনিটি গ্রুপে যোগ দিন এবং সদস্যদের সাথে যুক্ত হোন।",
    handle: "বিনোদপুর ছাত্র পরিষদ – Members",
    href: "https://facebook.com",
    color: "from-[#1877F2]/20 to-[#1877F2]/5",
    border: "border-[#1877F2]/30",
    badge: "Community",
    badgeColor: "bg-green-500/20 text-green-400",
  },
  {
    icon: "💬",
    platform: "WhatsApp",
    bangla: "হোয়াটসঅ্যাপ",
    desc: "আমাদের কমিউনিটিতে যোগ দিয়ে সরাসরি আপডেট ও বার্তা পান।",
    handle: "+880 1863-398155",
    href: "https://wa.me/8801863398155",
    color: "from-[#25D366]/20 to-[#25D366]/5",
    border: "border-[#25D366]/30",
    badge: "Community",
    badgeColor: "bg-[#25D366]/20 text-[#25D366]",
  },
];

const orgStats = [
  { icon: "🏛️", label: "সংগঠনের নাম",  value: "বিনোদপুর ছাত্র পরিষদ" },
  { icon: "📅", label: "প্রতিষ্ঠার বছর", value: "২০২৪ সাল"            },
  { icon: "🎯", label: "মূল লক্ষ্য",     value: "শিক্ষায় আলো, সেবায় জীবন" },
  { icon: "👥", label: "সদস্য সংখ্যা",   value: "৫০০+"                },
  { icon: "📋", label: "কার্যক্রম সংখ্যা", value: "১২০+"              },
  { icon: "🩸", label: "রক্তদাতা",        value: "৮০+"                },
];

const subjectOptions = [
  "সাধারণ জিজ্ঞাসা",
  "সদস্যপদ সংক্রান্ত",
  "রক্তদান সংক্রান্ত",
  "কার্যক্রম সংক্রান্ত",
  "স্বেচ্ছাসেবা",
  "অন্যান্য",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-400" />
      <div className="w-2 h-2 rounded-full bg-yellow-400" />
      <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-400" />
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p className="text-yellow-500 font-semibold tracking-widest text-sm uppercase mb-2">
      {text}
    </p>
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
                  link.href === "/contact"
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
              <span className={`h-0.5 bg-yellow-400 transition-all duration-300 block ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`h-0.5 bg-yellow-400 transition-all duration-300 block ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 bg-yellow-400 transition-all duration-300 block ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#071530] border-t border-white/10 px-4 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-2.5 border-b border-white/5 text-sm transition-colors ${
                  link.href === "/contact"
                    ? "text-yellow-400 font-semibold"
                    : "text-blue-100 hover:text-yellow-400"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-[62vh] flex items-center justify-center bg-gradient-to-br from-[#071630] via-[#0a1f44] to-[#0e2a5c] overflow-hidden pt-20">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-yellow-400/5 animate-pulse pointer-events-none" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,215,0,0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,215,0,0.3) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-sm font-medium px-5 py-2 rounded-full mb-8">
          <span>📬</span>
          <span>আমরা সর্বদা আপনার পাশে আছি</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          যোগাযোগ{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
            করুন
          </span>
        </h1>

        <GoldDivider />

        <p className="text-blue-200 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-4">
          বিনোদপুর ছাত্র পরিষদের সাথে যোগাযোগ করুন, আপনার মতামত, পরামর্শ
          অথবা সহযোগিতার জন্য আমরা সর্বদা প্রস্তুত।
        </p>

        {/* Quick action row */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+8801863398155"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-lg shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200"
          >
            <span>📞</span> সরাসরি কল করুন
          </a>
          <a
            href="#contact-form"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-yellow-400/40 text-yellow-300 font-semibold rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-200"
          >
            <span>✉️</span> বার্তা পাঠান
          </a>
        </div>

        {/* Scroll cue */}
        <div className="mt-12 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-blue-300/60 text-xs animate-bounce">
            <span>নিচে স্ক্রল করুন</span>
            <div className="w-0.5 h-6 bg-gradient-to-b from-yellow-400/50 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Information Cards ─────────────────────────────────────────────────
function ContactInfo() {
  return (
    <section className="py-20 bg-[#f5f8ff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel text="সরাসরি যোগাযোগ" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44]">
            যোগাযোগের তথ্য
          </h2>
          <GoldDivider />
          <p className="text-slate-500 text-base mt-2 max-w-xl mx-auto">
            যেকোনো প্রয়োজনে আমাদের সাথে সরাসরি যোগাযোগ করতে পারেন।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, i) => (
            <div
              key={i}
              className={`relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border hover:border-yellow-300 transition-all duration-300 group hover:-translate-y-1 overflow-hidden border-slate-100`}
            >
              {/* Gradient tint background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />

              <div className="relative z-10">
                {/* Icon circle */}
                <div className="w-14 h-14 rounded-2xl bg-[#f0f4ff] group-hover:bg-white/80 flex items-center justify-center text-3xl mb-4 transition-colors duration-300 shadow-sm">
                  {card.icon}
                </div>

                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  {card.label}
                </p>
                <p className="text-[#0a1f44] font-bold text-base leading-snug mb-1 group-hover:text-yellow-700 transition-colors">
                  {card.value}
                </p>
                <p className="text-slate-400 text-xs mb-4">{card.sub}</p>

                {card.href && card.cta && (
                  <a
                    href={card.href}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0a1f44] bg-yellow-100 hover:bg-yellow-200 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {card.cta} →
                  </a>
                )}
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Social Media ─────────────────────────────────────────────────────────────
function SocialMedia() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#0a1f44] to-[#0e2a5c]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel text="সোশ্যাল মিডিয়া" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            আমাদের অনুসরণ করুন
          </h2>
          <GoldDivider />
          <p className="text-blue-200 text-base mt-2 max-w-xl mx-auto">
            সোশ্যাল মিডিয়ায় আমাদের সাথে যুক্ত থাকুন এবং সর্বশেষ খবর পান।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {socialCards.map((card, i) => (
            <div
              key={i}
              className={`bg-white/5 backdrop-blur-sm border ${card.border} rounded-2xl p-7 hover:bg-white/10 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-3xl border ${card.border}`}>
                  {card.icon}
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>

              <h3 className="text-white font-bold text-lg mb-1 group-hover:text-yellow-300 transition-colors">
                {card.bangla}
              </h3>
              <p className="text-blue-300 text-xs mb-3">{card.handle}</p>
              <p className="text-blue-200/80 text-sm leading-relaxed mb-6">
                {card.desc}
              </p>

              <a
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-yellow-400/30 text-yellow-300 text-sm font-semibold rounded-xl hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-200"
              >
                {card.platform}-এ যোগ দিন →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({
    name: "", mobile: "", email: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (k: string, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name    = "নাম প্রয়োজন";
    if (!form.mobile.trim())  e.mobile  = "মোবাইল নম্বর প্রয়োজন";
    if (!form.subject)        e.subject = "বিষয় নির্বাচন করুন";
    if (!form.message.trim()) e.message = "বার্তা লিখুন";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "সঠিক ইমেইল দিন";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSend = async () => {
    if (!validate()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1600));
    setSending(false);
    setSent(true);
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl border text-[#0a1f44] bg-white text-sm outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all duration-200";
  const inputClass = (f: string) =>
    `${inputBase} ${errors[f] ? "border-red-400" : "border-slate-200 focus:border-yellow-400"}`;

  return (
    <section id="contact-form" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel text="বার্তা পাঠান" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44]">
            আমাদের লিখুন
          </h2>
          <GoldDivider />
          <p className="text-slate-500 text-base mt-2 max-w-lg mx-auto">
            ফর্মটি পূরণ করুন, আমরা দ্রুত সাড়া দেব।
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          {/* Card header */}
          <div className="bg-gradient-to-r from-[#0a1f44] to-[#0e2a5c] px-8 py-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-300 text-lg">
              ✉️
            </div>
            <div>
              <h3 className="text-white font-bold text-base">যোগাযোগ ফর্ম</h3>
              <p className="text-blue-200 text-xs">বিনোদপুর ছাত্র পরিষদ</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10">
            {sent ? (
              /* ── Success state ── */
              <div className="text-center py-10">
                <div className="w-20 h-20 rounded-full bg-yellow-400/10 border-2 border-yellow-400/40 flex items-center justify-center text-4xl mx-auto mb-5 animate-bounce">
                  🎉
                </div>
                <h3 className="text-[#0a1f44] text-2xl font-extrabold mb-2">
                  বার্তা পাঠানো হয়েছে!
                </h3>
                <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
                  আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই যোগাযোগ করব।
                </p>
                <button
                  onClick={() => { setSent(false); setForm({ name: "", mobile: "", email: "", subject: "", message: "" }); }}
                  className="px-7 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-xl shadow-md hover:scale-105 transition-all"
                >
                  আবার বার্তা পাঠান
                </button>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#0a1f44] font-semibold text-sm mb-1.5">
                      নাম *
                    </label>
                    <input
                      type="text"
                      placeholder="আপনার পূর্ণ নাম"
                      className={inputClass("name")}
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">⚠ {errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-[#0a1f44] font-semibold text-sm mb-1.5">
                      মোবাইল নম্বর *
                    </label>
                    <input
                      type="tel"
                      placeholder="01XXXXXXXXX"
                      className={inputClass("mobile")}
                      value={form.mobile}
                      onChange={(e) => set("mobile", e.target.value)}
                    />
                    {errors.mobile && <p className="text-red-500 text-xs mt-1">⚠ {errors.mobile}</p>}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#0a1f44] font-semibold text-sm mb-1.5">
                      ইমেইল
                    </label>
                    <input
                      type="email"
                      placeholder="example@email.com"
                      className={inputClass("email")}
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">⚠ {errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-[#0a1f44] font-semibold text-sm mb-1.5">
                      বিষয় *
                    </label>
                    <select
                      className={inputClass("subject")}
                      value={form.subject}
                      onChange={(e) => set("subject", e.target.value)}
                    >
                      <option value="">বিষয় নির্বাচন করুন</option>
                      {subjectOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs mt-1">⚠ {errors.subject}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[#0a1f44] font-semibold text-sm mb-1.5">
                    বার্তা *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="আপনার বার্তা এখানে লিখুন..."
                    className={`${inputClass("message")} resize-none`}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">⚠ {errors.message}</p>}
                  <p className="text-slate-400 text-xs mt-1 text-right">
                    {form.message.length} অক্ষর
                  </p>
                </div>

                {/* Submit */}
                <button
                  onClick={handleSend}
                  disabled={sending}
                  className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-extrabold text-lg rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                >
                  {sending ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      পাঠানো হচ্ছে...
                    </>
                  ) : (
                    <><span>📨</span> বার্তা পাঠান</>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Google Map ───────────────────────────────────────────────────────────────
function MapSection() {
  return (
    <section id="map" className="py-20 bg-[#f5f8ff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <SectionLabel text="আমাদের অবস্থান" />
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44]">
            মানচিত্রে আমরা
          </h2>
          <GoldDivider />
          <p className="text-slate-500 text-base mt-2">
            বিনোদপুর, সুঘাট, শেরপুর, বগুড়া — আমাদের কার্যালয়ের অবস্থান।
          </p>
        </div>

        {/* Map card */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          {/* Location strip above map */}
          <div className="bg-gradient-to-r from-[#0a1f44] to-[#0e2a5c] px-6 py-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-lg">
                📍
              </div>
              <div>
                <p className="text-white font-bold text-sm">বিনোদপুর ছাত্র পরিষদ</p>
                <p className="text-blue-300 text-xs">বিনোদপুর, সুঘাট, শেরপুর, বগুড়া</p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=Binodupur,Sherpur,Bogura,Bangladesh"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-yellow-300 border border-yellow-400/30 hover:border-yellow-400 hover:bg-yellow-400/10 px-4 py-1.5 rounded-lg transition-all"
            >
              Google Maps-এ খুলুন →
            </a>
          </div>

          {/* Embed */}
          <div className="relative w-full h-[420px] bg-slate-200">
            <iframe
              title="বিনোদপুর ছাত্র পরিষদ অবস্থান"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14385.456!2d89.3!3d24.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc5d66f9b5e8b5%3A0x0!2sSherpur%2C+Bogura!5e0!3m2!1sen!2sbd!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>

          {/* Info row below map */}
          <div className="bg-white px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100">
            {[
              { icon: "🏘️", label: "গ্রাম",     value: "বিনোদপুর"  },
              { icon: "🏙️", label: "উপজেলা",   value: "শেরপুর"    },
              { icon: "🗺️", label: "জেলা",      value: "বগুড়া"    },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <p className="text-slate-400 text-xs">{item.label}</p>
                  <p className="text-[#0a1f44] font-bold text-sm">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Organisation Details ─────────────────────────────────────────────────────
function OrgDetails() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-[#0a1f44] via-[#0e2a5c] to-[#071530] relative overflow-hidden">
      {/* Decorative blurs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400/5 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-400/5 blur-3xl rounded-full" />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <SectionLabel text="সংগঠনের পরিচিতি" />
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            আমাদের সম্পর্কে
          </h2>
          <GoldDivider />
          <p className="text-blue-200 text-base mt-2 max-w-xl mx-auto">
            সংখ্যায় ও তথ্যে বিনোদপুর ছাত্র পরিষদের পরিচয়।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orgStats.map((stat, i) => (
            <div
              key={i}
              className={`bg-white/5 backdrop-blur-sm border border-yellow-400/15 hover:border-yellow-400/50 rounded-2xl p-7 text-center transition-all duration-700 hover:bg-white/10 group ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <p className="text-blue-300 text-xs font-semibold uppercase tracking-widest mb-2">
                {stat.label}
              </p>
              <p className="text-yellow-300 font-extrabold text-xl leading-tight group-hover:text-yellow-200 transition-colors">
                {stat.value}
              </p>
              <div className="mt-4 h-0.5 w-12 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Emergency Contact ────────────────────────────────────────────────────────
function EmergencyContact() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-400/5 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-gradient-to-br from-[#0a1f44] to-[#143166] rounded-3xl p-8 sm:p-12 shadow-2xl border border-yellow-400/10 relative overflow-hidden">
          {/* Accent ring */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-red-400/15 pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-yellow-400/10 pointer-events-none" />

          {/* Header */}
          <div className="relative text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-400/20 text-red-300 text-sm font-medium px-5 py-2 rounded-full mb-5">
              <span className="animate-pulse">🚨</span>
              <span>জরুরি সহায়তা</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              🩸 জরুরি রক্তের প্রয়োজন?
            </h2>
            <GoldDivider />
            <p className="text-blue-200 text-base max-w-xl mx-auto mt-2">
              বিনোদপুর ছাত্র পরিষদের রক্তদাতা ডাটাবেস থেকে দ্রুত সহায়তা পান।
              আমরা ২৪/৭ আপনার পাশে আছি।
            </p>
          </div>

          {/* Emergency info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              { icon: "📞", label: "জরুরি নম্বর",   value: "+৮৮০ ১৮৬৩-৩৯৮১৫৫", sub: "২৪ ঘণ্টা, ৭ দিন" },
              { icon: "🩸", label: "রক্তদাতা",       value: "৮০+ জন",            sub: "সকল রক্তের গ্রুপ" },
              { icon: "⚡", label: "সাড়া দেওয়ার সময়", value: "৩০ মিনিট",         sub: "গড় প্রতিক্রিয়া সময়" },
            ].map((item, i) => (
              <div
                key={i}
                className="text-center p-5 rounded-2xl bg-white/5 border border-yellow-400/15 hover:border-yellow-400/40 hover:bg-white/10 transition-all duration-200 group"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <p className="text-blue-300 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-yellow-300 font-extrabold text-lg mb-0.5">{item.value}</p>
                <p className="text-blue-400 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>

          {/* Quick action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+8801863398155"
              className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200"
            >
              <span>📞</span> এখনই কল করুন
            </a>
            <a
              href="/blood-donors"
              className="flex items-center justify-center gap-2 px-8 py-3.5 border border-red-400/40 text-red-300 font-semibold rounded-xl hover:bg-red-400/10 hover:border-red-400 transition-all duration-200"
            >
              <span>🩸</span> রক্তদাতা খুঁজুন
            </a>
            <a
              href={`https://wa.me/8801863398155?text=${encodeURIComponent("জরুরি রক্তের প্রয়োজন")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3.5 border border-green-400/40 text-green-300 font-semibold rounded-xl hover:bg-green-400/10 hover:border-green-400 transition-all duration-200"
            >
              <span>💬</span> WhatsApp করুন
            </a>
          </div>
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
                <p className="text-yellow-400 text-xs">শিক্ষায় আলো, সেবায় জীবন</p>
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
              <li className="flex gap-2 items-start">
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
            <span className="text-yellow-400 font-semibold">মোঃ আলফাজ রহমান</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <main className="font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Hind Siliguri', sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      <Navbar />
      <Hero />
      <ContactInfo />
      <SocialMedia />
      <ContactForm />
      <MapSection />
      <OrgDetails />
      <EmergencyContact />
      <Footer />
    </main>
  );
}
