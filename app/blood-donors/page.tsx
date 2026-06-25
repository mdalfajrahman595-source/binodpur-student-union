"use client";

import { useState, useEffect, useRef, useMemo } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Donor {
  name: string;
  bloodGroup: string;
  phone: string;
  location: string;
  lastDonation: string;
  available: boolean;
}

interface Stat {
  value: string;
  label: string;
  icon: string;
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

const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const donors: Donor[] = [
  {
    name: "ইউসুফ আলী সাইম",
    bloodGroup: "O+",
    phone: "+8801783656525",
    location: "বিনোদপুর, সুঘাট, শেরপুর, বগুড়া",
    lastDonation: "null",
    available: true,
  },
  {
    name: "ইউনুস আলী সিয়াম",
    bloodGroup: "O+",
    phone: "+8801760100542",
    location: "বিনোদপুর, সুঘাট, শেরপুর, বগুড়া",
    lastDonation: "২২ জানুয়ারি, ২০২৬",
    available: true,
  },
  {
    name: "ফাতেমা খাতুন",
    bloodGroup: "B+",
    phone: "+88019XXXXXX",
    location: "বিনোদপুর উত্তরপাড়া, শেরপুর",
    lastDonation: "৫ এপ্রিল, ২০২৬",
    available: true,
  },
  {
    name: "মো. শাহরিয়ার কবির",
    bloodGroup: "AB+",
    phone: "+880XXXXXXXX",
    location: "ধুনট রোড, শেরপুর, বগুড়া",
    lastDonation: "১৮ ডিসেম্বর, ২০২৫",
    available: true,
  },
  {
    name: "তানভীর আহমেদ",
    bloodGroup: "O-",
    phone: "+880XXXXXX",
    location: "বিনোদপুর দক্ষিণপাড়া, শেরপুর",
    lastDonation: "৩০ মে, ২০২৬",
    available: false,
  },
  {
    name: "সাবরিনা ইয়াসমিন",
    bloodGroup: "A-",
    phone: "+8801XXXXXXX",
    location: "শেরপুর সদর, বগুড়া",
    lastDonation: "১২ ফেব্রুয়ারি, ২০২৬",
    available: true,
  },
  {
    name: "মো. জাহিদ হাসান",
    bloodGroup: "B-",
    phone: "+880XXXXXXXX",
    location: "কুসুম্বী, শেরপুর, বগুড়া",
    lastDonation: "৮ জুন, ২০২৬",
    available: true,
  },
  {
    name: "নুসরাত জাহান",
    bloodGroup: "AB-",
    phone: "+880XXXXXXX",
    location: "বিনোদপুর মধ্যপাড়া, শেরপুর",
    lastDonation: "১৫ নভেম্বর, ২০২৫",
    available: false,
  },
  {
    name: "মো. ইমরান হোসেন",
    bloodGroup: "O+",
    phone: "+88016XXXXXX",
    location: "ঘোগা, শেরপুর, বগুড়া",
    lastDonation: "২ এপ্রিল, ২০২৬",
    available: true,
  },
  {
    name: "রাকিবুল হাসান",
    bloodGroup: "A+",
    phone: "+8801XXXXXXX",
    location: "বিনোদপুর বাজারপাড়া, শেরপুর",
    lastDonation: "২৫ জুন, ২০২৬",
    available: true,
  },
  {
    name: "সুমাইয়া আক্তার",
    bloodGroup: "B+",
    phone: "+880XXXXXXX",
    location: "শেরপুর কলেজ রোড, বগুড়া",
    lastDonation: "১৯ জানুয়ারি, ২০২৬",
    available: true,
  },
  {
    name: "মো. নাজমুল হক",
    bloodGroup: "O+",
    phone: "+8801XXXXXXX",
    location: "বিনোদপুর স্কুলপাড়া, শেরপুর",
    lastDonation: "৭ মে, ২০২৬",
    available: true,
  },
];

const stats: Stat[] = [
  { value: "৮০+", label: "মোট রক্তদাতা", icon: "🩸" },
  { value: "৮টি", label: "উপলব্ধ রক্তের গ্রুপ", icon: "🧬" },
  { value: "১২+", label: "সাম্প্রতিক রক্তদান", icon: "📅" },
  { value: "৪৫+", label: "সফল রক্তদান কর্মসূচি", icon: "🏆" },
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
                  link.href === "/blood-donors"
                    ? "text-yellow-400"
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
              className={`block py-2.5 border-b border-white/5 text-sm ${
                link.href === "/blood-donors"
                  ? "text-yellow-400"
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

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="blood-hero"
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[#071530]"
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

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-24 pb-16">
        {/* Emblem */}
        <div className="mx-auto mb-8 w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700 flex items-center justify-center shadow-2xl shadow-yellow-500/30 ring-4 ring-yellow-400/20">
          <span className="text-[#0a1f44] text-3xl">🩸</span>
        </div>

        <p className="text-yellow-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
          — জীবন বাঁচাতে রক্তদান —
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600">
            রক্তদাতা খুঁজুন
          </span>
        </h1>

        <p className="text-blue-200 text-lg md:text-xl max-w-xl mx-auto mb-4 leading-relaxed">
          বিনোদপুর ছাত্র পরিষদের রক্তদাতা ডাটাবেস থেকে দ্রুত উপযুক্ত রক্তদাতা
          খুঁজে নিন এবং সরাসরি যোগাযোগ করুন।
        </p>

        <p className="text-yellow-400/80 text-base italic mb-10">
          "এক ব্যাগ রক্ত বাঁচাতে পারে একটি জীবন"
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#donor-search"
            className="px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-lg shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200"
          >
            রক্তদাতা খুঁজুন
          </a>
          <a
            href="#emergency-request"
            className="px-8 py-3.5 border border-red-400/40 text-red-300 font-semibold rounded-lg hover:bg-red-400/10 hover:border-red-400 transition-all duration-200"
          >
            জরুরি সহায়তা
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Donor Search + Filter + Cards ────────────────────────────────────────────
function DonorSearch() {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState("সকল");

  const filtered = useMemo(() => {
    return donors.filter((d) => {
      const matchesGroup =
        activeGroup === "সকল" || d.bloodGroup === activeGroup;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === "" ||
        d.name.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q);
      return matchesGroup && matchesQuery;
    });
  }, [query, activeGroup]);

  const whatsappLink = (phone: string) => {
    const digits = phone.replace(/[^0-9]/g, "");
    return `https://wa.me/${digits}`;
  };

  return (
    <section id="donor-search" className="py-20 bg-[#f5f8ff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="রক্তদাতা খুঁজুন"
          subtitle="রক্তের গ্রুপ অনুযায়ী ফিল্টার করুন বা নাম ও এলাকা দিয়ে অনুসন্ধান করুন"
        />

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="নাম বা এলাকা লিখে খুঁজুন..."
              className="w-full px-5 py-3.5 pl-12 rounded-lg border border-slate-200 bg-white text-[#0a1f44] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 shadow-sm"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>
          </div>
        </div>

        {/* Blood group filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveGroup("সকল")}
            className={`px-5 py-2.5 rounded-lg font-bold text-sm border transition-all duration-200 ${
              activeGroup === "সকল"
                ? "bg-[#0a1f44] text-yellow-400 border-[#0a1f44] shadow-md"
                : "bg-white text-[#0a1f44] border-slate-200 hover:border-yellow-400 hover:text-yellow-600"
            }`}
          >
            সকল
          </button>
          {bloodGroups.map((group) => {
            const isActive = activeGroup === group;
            return (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={`w-14 h-14 rounded-full font-extrabold text-sm border-2 transition-all duration-200 flex items-center justify-center ${
                  isActive
                    ? "bg-gradient-to-br from-red-500 to-red-700 text-white border-red-500 shadow-lg shadow-red-500/30 scale-110"
                    : "bg-white text-red-600 border-red-200 hover:border-red-400 hover:scale-105"
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>

        {/* Donor cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((donor, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl border border-slate-100 hover:border-yellow-300 transition-all duration-300 group hover:-translate-y-1 relative"
            >
              {/* Availability badge */}
              <span
                className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${
                  donor.available
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-slate-100 text-slate-500 border border-slate-200"
                }`}
              >
                {donor.available ? "উপলব্ধ" : "অনুপলব্ধ"}
              </span>

              <div className="flex items-start gap-4 mb-4">
                {/* Photo placeholder */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0a1f44] to-[#143166] flex items-center justify-center text-2xl flex-shrink-0 text-yellow-400 font-bold ring-2 ring-yellow-400/20">
                  {donor.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-[#0a1f44] text-base leading-tight group-hover:text-yellow-600 transition-colors">
                    {donor.name}
                  </h3>
                  <span className="inline-block mt-1 text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-red-600 text-white">
                    {donor.bloodGroup}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-500 mb-5">
                <p className="flex items-center gap-2">
                  <span>📍</span>
                  <span className="leading-snug">{donor.location}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>📅</span>
                  <span>সর্বশেষ রক্তদান: {donor.lastDonation}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span>📞</span>
                  <span>{donor.phone}</span>
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <a
                  href={`tel:${donor.phone}`}
                  className="flex-1 text-center px-4 py-2.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold text-sm rounded-lg shadow-md shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-200"
                >
                  📞 কল করুন
                </a>
                <a
                  href={whatsappLink(donor.phone)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-4 py-2.5 bg-green-600 text-white font-bold text-sm rounded-lg shadow-md shadow-green-600/20 hover:bg-green-700 hover:scale-105 transition-all duration-200"
                >
                  💬 WhatsApp
                </a>
              </div>

              <div className="mt-4 h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-slate-400 mt-10">
            আপনার অনুসন্ধানের সাথে মিলে এমন কোনো রক্তদাতা পাওয়া যায়নি।
          </p>
        )}
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
          title="রক্তদান পরিসংখ্যান"
          subtitle="সংখ্যায় আমাদের রক্তদান কর্মসূচির চিত্র"
          light
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <div className="text-4xl font-extrabold text-yellow-400 mb-2">
                {stat.value}
              </div>
              <div className="text-blue-200 text-base font-medium">
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

// ─── Emergency Blood Request ───────────────────────────────────────────────────
function EmergencyRequest() {
  return (
    <section id="emergency-request" className="py-20 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-red-500 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-yellow-400 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-gradient-to-br from-[#0a1f44] to-[#143166] rounded-2xl p-8 sm:p-12 shadow-2xl border border-red-400/20 relative overflow-hidden text-center">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-red-400/20" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full border border-yellow-400/10" />

          <div className="relative">
            <div className="text-5xl mb-4">🆘</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              জরুরি ভিত্তিতে রক্তের প্রয়োজন?
            </h2>
            <GoldDivider />
            <p className="text-blue-200 max-w-xl mx-auto mb-8 leading-relaxed mt-4">
              দ্রুত সহায়তার জন্য সরাসরি আমাদের জরুরি হটলাইনে কল করুন অথবা
              হোয়াটসঅ্যাপে মেসেজ পাঠান। আমাদের স্বেচ্ছাসেবক দল ২৪ ঘণ্টা প্রস্তুত
              আছে।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+8801863398155"
                className="px-8 py-3.5 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold rounded-lg shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 transition-all duration-200"
              >
                📞 জরুরি হটলাইন: ০১৮৬৩৩৯৮১৫৫
              </a>
              <a
                href="https://wa.me/8801863398155"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border border-yellow-400/40 text-yellow-300 font-semibold rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-200"
              >
                💬 হোয়াটসঅ্যাপে যোগাযোগ
              </a>
            </div>
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
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BloodDonorsPage() {
  return (
    <main className="font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Hind Siliguri', sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Navbar />
      <Hero />
      <DonorSearch />
      <Statistics />
      <EmergencyRequest />
      <Footer />
    </main>
  );
}
