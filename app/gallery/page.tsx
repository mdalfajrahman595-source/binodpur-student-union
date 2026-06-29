"use client";

import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface GalleryPhoto {
  image: string;
  title: string;
  date: string;
  category: string;
}

interface Category {
  icon: string;
  label: string;
  count: string;
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
  { label: "নোটিশ", href: "/notices" },
  { label: "যোগাযোগ", href: "/#contact" },
];

const categories: Category[] = [
  { icon: "🩸", label: "রক্তদান কর্মসূচি", count: "১৮ ছবি" },
  { icon: "📚", label: "শিক্ষা সহায়তা", count: "২৪ ছবি" },
  { icon: "🌳", label: "বৃক্ষরোপণ", count: "১৫ ছবি" },
  { icon: "🎭", label: "সাংস্কৃতিক অনুষ্ঠান", count: "২১ ছবি" },
  { icon: "🤝", label: "কমিটি সভা", count: "১২ ছবি" },
];

const galleryPhotos: GalleryPhoto[] = [
  {
    image: "https://placehold.co/600x450/0a1f44/FFD700?text=রক্তদান+ক্যাম্প",
    title: "স্বেচ্ছায় রক্তদান ক্যাম্প",
    date: "২২ জুন, ২০২৬",
    category: "রক্তদান কর্মসূচি",
  },
  {
    image: "https://placehold.co/600x450/143166/FFD700?text=শিক্ষা+উপকরণ",
    title: "শিক্ষা উপকরণ বিতরণ",
    date: "১৫ জুন, ২০২৬",
    category: "শিক্ষা সহায়তা",
  },
  {
    image: "https://placehold.co/600x450/0e2a5c/FFD700?text=বৃক্ষরোপণ",
    title: "বৃক্ষরোপণ অভিযান",
    date: "৫ জুলাই, ২০২৬",
    category: "বৃক্ষরোপণ",
  },
  {
    image: "https://placehold.co/600x450/071530/FFD700?text=সাংস্কৃতিক+সন্ধ্যা",
    title: "বার্ষিক সাংস্কৃতিক সন্ধ্যা",
    date: "১০ মে, ২০২৬",
    category: "সাংস্কৃতিক অনুষ্ঠান",
  },
  {
    image: "https://placehold.co/600x450/0a1f44/FFD700?text=কমিটি+সভা",
    title: "মাসিক কমিটি সভা",
    date: "১ জুন, ২০২৬",
    category: "কমিটি সভা",
  },
  {
    image: "https://placehold.co/600x450/143166/FFD700?text=বৃত্তি+প্রদান",
    title: "মেধাবৃত্তি প্রদান অনুষ্ঠান",
    date: "২৮ এপ্রিল, ২০২৬",
    category: "শিক্ষা সহায়তা",
  },
  {
    image: "https://placehold.co/600x450/0e2a5c/FFD700?text=রক্তদাতা+সম্মাননা",
    title: "রক্তদাতা সম্মাননা অনুষ্ঠান",
    date: "১৮ মার্চ, ২০২৬",
    category: "রক্তদান কর্মসূচি",
  },
  {
    image: "https://placehold.co/600x450/071530/FFD700?text=সবুজ+অভিযান",
    title: "সবুজ গ্রাম অভিযান",
    date: "২২ ফেব্রুয়ারি, ২০২৬",
    category: "বৃক্ষরোপণ",
  },
  {
    image: "https://placehold.co/600x450/0a1f44/FFD700?text=পিঠা+উৎসব",
    title: "ঐতিহ্যবাহী পিঠা উৎসব",
    date: "১২ জানুয়ারি, ২০২৬",
    category: "সাংস্কৃতিক অনুষ্ঠান",
  },
  {
    image: "https://placehold.co/600x450/143166/FFD700?text=বার্ষিক+সাধারণ+সভা",
    title: "বার্ষিক সাধারণ সভা",
    date: "৩০ ডিসেম্বর, ২০২৫",
    category: "কমিটি সভা",
  },
  {
    image: "https://placehold.co/600x450/0e2a5c/FFD700?text=খাতা-কলম+বিতরণ",
    title: "খাতা-কলম বিতরণ কার্যক্রম",
    date: "৫ ডিসেম্বর, ২০২৫",
    category: "শিক্ষা সহায়তা",
  },
  {
    image: "https://placehold.co/600x450/071530/FFD700?text=রক্তদান+শিবির",
    title: "ওয়ার্ডভিত্তিক রক্তদান শিবির",
    date: "১৪ নভেম্বর, ২০২৫",
    category: "রক্তদান কর্মসূচি",
  },
];

const stats: Stat[] = [
  { value: "৪৫+", label: "মোট ইভেন্ট", icon: "🎯" },
  { value: "৩৫০+", label: "মোট ছবি", icon: "📸" },
  { value: "৫টি", label: "মোট কার্যক্রম বিভাগ", icon: "📋" },
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
            <img
  src="/logobsu.jpeg"
  alt="BSWU Logo"
  className="w-12 h-12 rounded-full object-cover shadow-lg ring-2 ring-yellow-400/40"
/>
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
                  link.href === "/gallery"
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
                link.href === "/gallery"
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
      id="gallery-hero"
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
          <span className="text-[#0a1f44] text-3xl">📸</span>
        </div>

        <p className="text-yellow-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
          — স্মৃতির পাতা —
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600">
            গ্যালারি
          </span>
        </h1>

        <p className="text-blue-200 text-lg md:text-xl max-w-xl mx-auto mb-4 leading-relaxed">
          আমাদের সংগঠনের কার্যক্রম, উদ্যোগ ও মুহূর্তগুলোর ছবিতে ধারণকৃত
          স্মৃতিচারণ।
        </p>

        <p className="text-yellow-400/80 text-base italic mb-10">
          "প্রতিটি ছবি একটি গল্প, প্রতিটি কর্মসূচি একটি অর্জন"
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#photo-gallery"
            className="px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-lg shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200"
          >
            ছবি দেখুন
          </a>
          <a
            href="#categories"
            className="px-8 py-3.5 border border-yellow-400/40 text-yellow-300 font-semibold rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-200"
          >
            বিভাগ অনুসারে দেখুন
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Featured Event ───────────────────────────────────────────────────────────
function FeaturedEvent() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-yellow-500 font-semibold tracking-widest text-sm uppercase mb-2 text-center">
          বৈশিষ্ট্যমূলক ইভেন্ট
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0a1f44] mb-4 leading-tight text-center">
          স্বেচ্ছায় রক্তদান ক্যাম্প ২০২৬
        </h2>
        <GoldDivider />

        <div className="grid md:grid-cols-2 gap-12 items-center mt-10">
          {/* Image showcase */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-yellow-400 rounded-tl-lg z-0" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-[#0a1f44] rounded-br-lg z-0" />
            <img
              src="https://placehold.co/700x500/0a1f44/FFD700?text=রক্তদান+ক্যাম্প+২০২৬"
              alt="স্বেচ্ছায় রক্তদান ক্যাম্প ২০২৬"
              className="relative z-10 w-full h-auto rounded-xl shadow-2xl object-cover"
            />
          </div>

          {/* Text column */}
          <div>
            <p className="text-slate-600 leading-relaxed text-base mb-4">
              এ বছরের সবচেয়ে বড় ও সফল রক্তদান কর্মসূচিতে এলাকার ৮০ জনের বেশি
              স্বেচ্ছাসেবক রক্তদান করেছেন। সংগঠনের সদস্যদের ঐকান্তিক প্রচেষ্টায়
              এই কর্মসূচি একটি দৃষ্টান্তমূলক সফলতায় পরিণত হয়েছে।
            </p>
            <p className="text-slate-600 leading-relaxed text-base mb-6">
              স্থানীয় হাসপাতাল ও রক্ত ব্যাংকের সহযোগিতায় আয়োজিত এই ক্যাম্পে
              রক্তদানের পাশাপাশি স্বাস্থ্য পরীক্ষা ও সচেতনতামূলক আলোচনা সভার
              আয়োজন করা হয়।
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="bg-[#f0f4ff] border-l-4 border-yellow-400 px-5 py-3 rounded-r-lg">
                <p className="text-[#0a1f44] font-bold text-lg">৮০+</p>
                <p className="text-slate-500 text-sm">রক্তদাতা</p>
              </div>
              <div className="bg-[#f0f4ff] border-l-4 border-yellow-400 px-5 py-3 rounded-r-lg">
                <p className="text-[#0a1f44] font-bold text-lg">২২ জুন, ২০২৬</p>
                <p className="text-slate-500 text-sm">অনুষ্ঠানের তারিখ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Activity Categories ──────────────────────────────────────────────────────
function ActivityCategories({
  activeCategory,
  setActiveCategory,
}: {
  activeCategory: string;
  setActiveCategory: (c: string) => void;
}) {
  return (
    <section id="categories" className="py-20 bg-[#f5f8ff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="কার্যক্রমের বিভাগ"
          subtitle="বিভাগ অনুযায়ী আমাদের কার্যক্রমের ছবি দেখুন"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() =>
                  setActiveCategory(isActive ? "সকল" : cat.label)
                }
                className={`text-center p-6 rounded-xl border transition-all duration-300 group hover:-translate-y-1 ${
                  isActive
                    ? "bg-[#0a1f44] border-yellow-400 shadow-lg shadow-yellow-500/20"
                    : "bg-white border-slate-100 hover:border-yellow-300 hover:shadow-xl shadow-sm"
                }`}
              >
                <div
                  className={`w-14 h-14 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl transition-colors ${
                    isActive
                      ? "bg-yellow-400/15"
                      : "bg-[#f0f4ff] group-hover:bg-yellow-50"
                  }`}
                >
                  {cat.icon}
                </div>
                <h3
                  className={`font-bold text-sm leading-tight transition-colors ${
                    isActive
                      ? "text-yellow-400"
                      : "text-[#0a1f44] group-hover:text-yellow-600"
                  }`}
                >
                  {cat.label}
                </h3>
                <p
                  className={`text-xs mt-1 ${
                    isActive ? "text-blue-200" : "text-slate-400"
                  }`}
                >
                  {cat.count}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Photo Gallery Grid ───────────────────────────────────────────────────────
function PhotoGalleryGrid({ activeCategory }: { activeCategory: string }) {
  const filtered =
    activeCategory === "সকল"
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeCategory);

  const categoryColor: Record<string, string> = {
    "রক্তদান কর্মসূচি": "bg-red-100 text-red-700 border border-red-200",
    "শিক্ষা সহায়তা": "bg-blue-100 text-blue-700 border border-blue-200",
    বৃক্ষরোপণ: "bg-green-100 text-green-700 border border-green-200",
    "সাংস্কৃতিক অনুষ্ঠান":
      "bg-purple-100 text-purple-700 border border-purple-200",
    "কমিটি সভা": "bg-amber-100 text-amber-700 border border-amber-200",
  };

  return (
    <section id="photo-gallery" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="ছবির সংগ্রহ"
          subtitle="আমাদের প্রতিটি উদ্যোগের স্মরণীয় মুহূর্ত"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((photo, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 hover:border-yellow-300 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
                    categoryColor[photo.category] ??
                    "bg-white/90 text-[#0a1f44]"
                  }`}
                >
                  {photo.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-[#0a1f44] text-base leading-tight group-hover:text-yellow-600 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-yellow-600 text-xs mt-2 font-medium">
                  📅 {photo.date}
                </p>
                <div className="mt-4 h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-slate-400 mt-10">
            এই বিভাগে এখনো কোনো ছবি যুক্ত করা হয়নি।
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
          title="গ্যালারি পরিসংখ্যান"
          subtitle="সংখ্যায় আমাদের কার্যক্রমের চিত্র"
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

// ─── Call To Action ────────────────────────────────────────────────────────────
function CallToAction() {
  return (
    <section className="py-20 bg-[#f5f8ff]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-[#0a1f44] to-[#143166] rounded-2xl p-10 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-yellow-400/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-blue-400/10 blur-2xl" />

          <div className="relative">
            <div className="text-5xl mb-4">🤝</div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              আপনিও হতে পারেন আমাদের এই যাত্রার অংশ
            </h2>
            <p className="text-blue-200 max-w-xl mx-auto mb-8 leading-relaxed">
              বিনোদপুর ছাত্র পরিষদের কার্যক্রমে অংশগ্রহণ করুন এবং সমাজ উন্নয়নে
              নিজের অবদান রাখুন। আমাদের সাথে যুক্ত হয়ে গড়ে তুলুন আগামীর
              বিনোদপুর।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/#contact"
                className="px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-bold rounded-lg shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 transition-all duration-200"
              >
                যোগাযোগ করুন
              </a>
              <a
                href="/#activities"
                className="px-8 py-3.5 border border-yellow-400/40 text-yellow-300 font-semibold rounded-lg hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-200"
              >
                কার্যক্রম দেখুন
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
             <img
  src="/logobsu.jpeg"
  alt="BSWU Logo"
  className="w-12 h-12 rounded-full object-cover shadow-lg ring-2 ring-yellow-400/40"
/>
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
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("সকল");

  return (
    <main className="font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Hind Siliguri', sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>
      <Navbar />
      <Hero />
      <FeaturedEvent />
      <ActivityCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <PhotoGalleryGrid activeCategory={activeCategory} />
      <Statistics />
      <CallToAction />
      <Footer />
    </main>
  );
}
