"use client";

import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  fullName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  mobile: string;
  email: string;
  address: string;
  institution: string;
  department: string;
  bloodGroup: string;
  profession: string;
  photo: File | null;
  declaration: boolean;
}

interface FormErrors {
  [key: string]: string;
}

// ─── Nav Links ────────────────────────────────────────────────────────────────
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

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const membershipBenefits = [
  {
    icon: "🤝",
    title: "সামাজিক নেটওয়ার্ক",
    desc: "এলাকার বিভিন্ন শিক্ষার্থী ও তরুণদের সাথে যোগাযোগ ও বন্ধুত্বের সুযোগ।",
  },
  {
    icon: "🩸",
    title: "রক্তদান কার্যক্রম",
    desc: "স্বেচ্ছায় রক্তদান ক্যাম্পে অংশগ্রহণ করে মানবসেবায় অবদান রাখুন।",
  },
  {
    icon: "🌟",
    title: "নেতৃত্ব বিকাশ",
    desc: "বিভিন্ন কমিটি ও কার্যক্রমে অংশ নিয়ে নেতৃত্বের গুণাবলী অর্জন করুন।",
  },
  {
    icon: "🎓",
    title: "শিক্ষা সহায়তা",
    desc: "মেধাবী শিক্ষার্থীদের বৃত্তি ও শিক্ষা উপকরণ প্রাপ্তিতে অগ্রাধিকার।",
  },
  {
    icon: "🏆",
    title: "ক্রীড়া ও সংস্কৃতি",
    desc: "ক্রীড়া প্রতিযোগিতা ও সাংস্কৃতিক অনুষ্ঠানে অংশগ্রহণের সুযোগ।",
  },
  {
    icon: "💻",
    title: "দক্ষতা উন্নয়ন",
    desc: "কর্মশালা ও প্রশিক্ষণ কার্যক্রমে অংশ নিয়ে পেশাদার দক্ষতা বাড়ান।",
  },
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
                  link.href === "/registration"
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
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`h-0.5 bg-current transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/10 py-3 pb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-2.5 text-sm rounded-md transition-colors ${
                  link.href === "/registration"
                    ? "text-yellow-400 font-semibold"
                    : "text-blue-100 hover:text-yellow-400 hover:bg-white/5"
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
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-[#071630] via-[#0a1f44] to-[#0e2a5c] overflow-hidden pt-20">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-sm font-medium px-5 py-2 rounded-full mb-8">
          <span>📋</span>
          <span>নতুন সদস্য নিবন্ধন চলছে</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
          সদস্য{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">
            নিবন্ধন
          </span>
        </h1>
        <GoldDivider />
        <p className="text-blue-200 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-4">
          বিনোদপুর ছাত্র পরিষদের পরিবারে আপনাকে স্বাগতম। নিচের ফর্মটি পূরণ
          করে আমাদের সাথে যুক্ত হোন।
        </p>

        {/* Scroll cue */}
        <div className="mt-10 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-blue-300 text-sm animate-bounce">
            <span>নিচে স্ক্রল করুন</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Membership Benefits ──────────────────────────────────────────────────────
function MembershipBenefits() {
  return (
    <section className="py-20 bg-[#f5f8ff]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-yellow-500 font-semibold tracking-widest text-sm uppercase mb-2">
            সদস্যপদের সুবিধাসমূহ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44]">
            কেন সদস্য হবেন?
          </h2>
          <GoldDivider />
          <p className="text-slate-500 text-base max-w-2xl mx-auto mt-2">
            আমাদের সংগঠনের সদস্য হলে আপনি পাবেন বহুমুখী সুযোগ ও সুবিধা।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {membershipBenefits.map((benefit, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 hover:border-yellow-300 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#f0f4ff] flex items-center justify-center text-3xl mb-4 group-hover:bg-yellow-50 transition-colors">
                {benefit.icon}
              </div>
              <h3 className="text-[#0a1f44] font-bold text-lg mb-2 group-hover:text-yellow-600 transition-colors">
                {benefit.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {benefit.desc}
              </p>
              <div className="mt-4 h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Registration Form ────────────────────────────────────────────────────────
function RegistrationForm({ onSuccess }: { onSuccess: (id: string) => void }) {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    mobile: "",
    email: "",
    address: "",
    institution: "",
    department: "",
    bloodGroup: "",
    profession: "",
    photo: null,
    declaration: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (field: keyof FormData, value: string | boolean | File | null) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    set("photo", file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.fullName.trim()) errs.fullName = "পূর্ণ নাম প্রয়োজন";
    if (!form.fatherName.trim()) errs.fatherName = "পিতার নাম প্রয়োজন";
    if (!form.motherName.trim()) errs.motherName = "মাতার নাম প্রয়োজন";
    if (!form.dob) errs.dob = "জন্ম তারিখ প্রয়োজন";
    if (!form.mobile.trim()) errs.mobile = "মোবাইল নম্বর প্রয়োজন";
    else if (!/^(?:\+?88)?01[3-9]\d{8}$/.test(form.mobile.trim()))
      errs.mobile = "সঠিক মোবাইল নম্বর দিন";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "সঠিক ইমেইল দিন";
    if (!form.address.trim()) errs.address = "ঠিকানা প্রয়োজন";
    if (!form.institution.trim()) errs.institution = "শিক্ষা প্রতিষ্ঠানের নাম প্রয়োজন";
    if (!form.bloodGroup) errs.bloodGroup = "রক্তের গ্রুপ নির্বাচন করুন";
    if (!form.photo) errs.photo = "নিজের ছবি আপলোড করুন";
    if (!form.declaration) errs.declaration = "ঘোষণাপত্রে সম্মত হতে হবে";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800));
    const year = new Date().getFullYear();
    const id = `BSP-${year}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    setSubmitting(false);
    onSuccess(id);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-[#0a1f44] bg-white text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-yellow-400/50 ${
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-slate-200 focus:border-yellow-400"
    }`;

  const labelClass = "block text-[#0a1f44] font-semibold text-sm mb-1.5";
  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className="text-yellow-500 font-semibold tracking-widest text-sm uppercase mb-2">
            নিবন্ধন ফর্ম
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1f44]">
            আবেদন ফর্ম পূরণ করুন
          </h2>
          <GoldDivider />
          <p className="text-slate-500 text-base mt-2 max-w-xl mx-auto">
            সকল তারকা (*) চিহ্নিত তথ্য পূরণ করা বাধ্যতামূলক।
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          {/* Form header strip */}
          <div className="bg-gradient-to-r from-[#0a1f44] to-[#0e2a5c] px-8 py-5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-yellow-400/20 border border-yellow-400/40 flex items-center justify-center text-yellow-300 text-lg">
              📋
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">সদস্য নিবন্ধন আবেদনপত্র</h3>
              <p className="text-blue-200 text-xs">বিনোদপুর ছাত্র পরিষদ</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10 space-y-8">
            {/* ─ Personal Info ─ */}
            <div>
              <h4 className="text-[#0a1f44] font-bold text-base mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-yellow-400 text-[#0a1f44] flex items-center justify-center text-xs font-extrabold">১</span>
                ব্যক্তিগত তথ্য
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className={labelClass}>পূর্ণ নাম *</label>
                  <input
                    type="text"
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    className={inputClass("fullName")}
                    value={form.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                  />
                  {errors.fullName && <p className={errorClass}>⚠ {errors.fullName}</p>}
                </div>

                {/* DOB */}
                <div>
                  <label className={labelClass}>জন্ম তারিখ *</label>
                  <input
                    type="date"
                    className={inputClass("dob")}
                    value={form.dob}
                    onChange={(e) => set("dob", e.target.value)}
                  />
                  {errors.dob && <p className={errorClass}>⚠ {errors.dob}</p>}
                </div>

                {/* Father */}
                <div>
                  <label className={labelClass}>পিতার নাম *</label>
                  <input
                    type="text"
                    placeholder="পিতার পূর্ণ নাম লিখুন"
                    className={inputClass("fatherName")}
                    value={form.fatherName}
                    onChange={(e) => set("fatherName", e.target.value)}
                  />
                  {errors.fatherName && <p className={errorClass}>⚠ {errors.fatherName}</p>}
                </div>

                {/* Mother */}
                <div>
                  <label className={labelClass}>মাতার নাম *</label>
                  <input
                    type="text"
                    placeholder="মাতার পূর্ণ নাম লিখুন"
                    className={inputClass("motherName")}
                    value={form.motherName}
                    onChange={(e) => set("motherName", e.target.value)}
                  />
                  {errors.motherName && <p className={errorClass}>⚠ {errors.motherName}</p>}
                </div>

                {/* Blood Group */}
                <div>
                  <label className={labelClass}>রক্তের গ্রুপ *</label>
                  <select
                    className={inputClass("bloodGroup")}
                    value={form.bloodGroup}
                    onChange={(e) => set("bloodGroup", e.target.value)}
                  >
                    <option value="">রক্তের গ্রুপ নির্বাচন করুন</option>
                    {bloodGroups.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  {errors.bloodGroup && <p className={errorClass}>⚠ {errors.bloodGroup}</p>}
                </div>

                {/* Profession */}
                <div>
                  <label className={labelClass}>পেশা</label>
                  <input
                    type="text"
                    placeholder="যেমন: শিক্ষার্থী, শিক্ষক, ব্যবসায়ী"
                    className={inputClass("profession")}
                    value={form.profession}
                    onChange={(e) => set("profession", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* ─ Contact Info ─ */}
            <div>
              <h4 className="text-[#0a1f44] font-bold text-base mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-yellow-400 text-[#0a1f44] flex items-center justify-center text-xs font-extrabold">২</span>
                যোগাযোগের তথ্য
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Mobile */}
                <div>
                  <label className={labelClass}>মোবাইল নম্বর *</label>
                  <input
                    type="tel"
                    placeholder="যেমন: 01XXXXXXXXX"
                    className={inputClass("mobile")}
                    value={form.mobile}
                    onChange={(e) => set("mobile", e.target.value)}
                  />
                  {errors.mobile && <p className={errorClass}>⚠ {errors.mobile}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>ইমেইল</label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    className={inputClass("email")}
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                  {errors.email && <p className={errorClass}>⚠ {errors.email}</p>}
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className={labelClass}>বর্তমান ঠিকানা *</label>
                  <textarea
                    rows={3}
                    placeholder="গ্রাম, ইউনিয়ন, উপজেলা, জেলা"
                    className={`${inputClass("address")} resize-none`}
                    value={form.address}
                    onChange={(e) => set("address", e.target.value)}
                  />
                  {errors.address && <p className={errorClass}>⚠ {errors.address}</p>}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* ─ Education Info ─ */}
            <div>
              <h4 className="text-[#0a1f44] font-bold text-base mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-yellow-400 text-[#0a1f44] flex items-center justify-center text-xs font-extrabold">৩</span>
                শিক্ষা সংক্রান্ত তথ্য
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Institution */}
                <div>
                  <label className={labelClass}>শিক্ষা প্রতিষ্ঠান *</label>
                  <input
                    type="text"
                    placeholder="প্রতিষ্ঠানের নাম লিখুন"
                    className={inputClass("institution")}
                    value={form.institution}
                    onChange={(e) => set("institution", e.target.value)}
                  />
                  {errors.institution && <p className={errorClass}>⚠ {errors.institution}</p>}
                </div>

                {/* Department */}
                <div>
                  <label className={labelClass}>বিভাগ / শ্রেণি</label>
                  <input
                    type="text"
                    placeholder="যেমন: বিজ্ঞান, মানবিক, ব্যবসায়"
                    className={inputClass("department")}
                    value={form.department}
                    onChange={(e) => set("department", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* ─ Photo Upload ─ */}
            <div>
              <h4 className="text-[#0a1f44] font-bold text-base mb-5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-yellow-400 text-[#0a1f44] flex items-center justify-center text-xs font-extrabold">৪</span>
                ছবি আপলোড
              </h4>

              <div className="flex flex-col sm:flex-row gap-6 items-start">
                {/* Upload area */}
                <div
                  onClick={() => fileRef.current?.click()}
                  className={`flex-1 border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
                    errors.photo
                      ? "border-red-400 bg-red-50"
                      : "border-slate-200 hover:border-yellow-400 hover:bg-yellow-50/30"
                  }`}
                >
                  <div className="text-4xl mb-3">📷</div>
                  <p className="text-[#0a1f44] font-semibold text-sm mb-1">
                    নিজের ছবি আপলোড করুন *
                  </p>
                  <p className="text-slate-400 text-xs">
                    JPG, PNG ফরম্যাট • সর্বোচ্চ ২ MB
                  </p>
                  <span className="inline-block mt-4 px-5 py-2 bg-[#0a1f44] text-yellow-400 text-xs font-semibold rounded-lg hover:bg-[#0e2a5c] transition-colors">
                    ফাইল বেছে নিন
                  </span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={handlePhoto}
                  />
                </div>

                {/* Preview */}
                {photoPreview && (
                  <div className="flex-shrink-0">
                    <p className="text-xs text-slate-500 mb-2 font-medium">পূর্বদর্শন:</p>
                    <div className="w-28 h-36 rounded-xl overflow-hidden border-2 border-yellow-400 shadow-lg shadow-yellow-400/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photoPreview}
                        alt="ছবির পূর্বদর্শন"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => { setPhotoPreview(null); set("photo", null); }}
                      className="mt-2 text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      ✕ সরিয়ে দিন
                    </button>
                  </div>
                )}
              </div>
              {errors.photo && <p className={`${errorClass} mt-2`}>⚠ {errors.photo}</p>}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* ─ Declaration ─ */}
            <div className="bg-gradient-to-br from-[#f0f4ff] to-[#e8f0fe] rounded-2xl p-6 border border-blue-100">
              <h4 className="text-[#0a1f44] font-bold text-base mb-4 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-yellow-400 text-[#0a1f44] flex items-center justify-center text-xs font-extrabold">৫</span>
                ঘোষণাপত্র
              </h4>
              <div className="bg-white rounded-xl p-5 border border-blue-100 text-sm text-slate-600 leading-relaxed mb-5 space-y-2">
                <p>
                  আমি অঙ্গীকার করছি যে, উপরে প্রদত্ত সকল তথ্য সম্পূর্ণ সত্য ও
                  নির্ভুল। আমি স্বেচ্ছায় <strong className="text-[#0a1f44]">বিনোদপুর ছাত্র পরিষদ</strong>-এর সদস্যপদ গ্রহণ করতে
                  ইচ্ছুক।
                </p>
                <p>
                  আমি সংগঠনের গঠনতন্ত্র, নিয়মকানুন ও সিদ্ধান্তসমূহ মেনে চলতে
                  এবং সংগঠনের উদ্দেশ্য ও লক্ষ্য অর্জনে সক্রিয়ভাবে অংশগ্রহণ করতে
                  প্রতিশ্রুতিবদ্ধ।
                </p>
                <p>
                  আমি যদি কোনো মিথ্যা তথ্য প্রদান করি, তাহলে কর্তৃপক্ষ যেকোনো
                  সময় আমার সদস্যপদ বাতিল করার অধিকার রাখে।
                </p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={form.declaration}
                    onChange={(e) => set("declaration", e.target.checked)}
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      form.declaration
                        ? "bg-yellow-400 border-yellow-400"
                        : "border-slate-300 group-hover:border-yellow-400"
                    }`}
                  >
                    {form.declaration && (
                      <svg className="w-3 h-3 text-[#0a1f44]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-slate-700 leading-relaxed">
                  আমি উপরের ঘোষণাপত্র পড়েছি এবং সম্পূর্ণ সম্মত আছি। *
                </span>
              </label>
              {errors.declaration && <p className={`${errorClass} mt-2`}>⚠ {errors.declaration}</p>}
            </div>

            {/* ─ Submit Button ─ */}
            <div className="pt-2">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-[#0a1f44] font-extrabold text-lg rounded-xl shadow-lg shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    আবেদন প্রক্রিয়া করা হচ্ছে...
                  </>
                ) : (
                  <>
                    <span>✅</span>
                    আবেদন জমা দিন
                  </>
                )}
              </button>
              <p className="text-center text-slate-400 text-xs mt-3">
                আবেদন জমা দেওয়ার পর আপনি একটি আবেদন আইডি পাবেন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Success Modal ────────────────────────────────────────────────────────────
function SuccessModal({ appId, onClose }: { appId: string; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-[fadeInUp_0.4s_ease]">
        {/* Top gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400" />

        {/* Success icon area */}
        <div className="bg-gradient-to-br from-[#0a1f44] to-[#0e2a5c] px-8 py-10 text-center">
          <div className="w-20 h-20 rounded-full bg-yellow-400/20 border-2 border-yellow-400/50 flex items-center justify-center text-4xl mx-auto mb-4 animate-bounce">
            🎉
          </div>
          <h2 className="text-white text-2xl font-extrabold mb-2">
            অভিনন্দন!
          </h2>
          <p className="text-blue-200 text-sm leading-relaxed">
            আপনার নিবন্ধন আবেদন সফলভাবে জমা হয়েছে।
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-7 space-y-5">
          {/* App ID */}
          <div className="bg-[#f5f8ff] rounded-2xl p-5 text-center border border-blue-100">
            <p className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wider">
              আপনার আবেদন আইডি
            </p>
            <p className="text-[#0a1f44] text-3xl font-extrabold tracking-widest">
              {appId}
            </p>
            <p className="text-slate-400 text-xs mt-2">
              এই আইডিটি সংরক্ষণ করুন। পরবর্তী যোগাযোগে কাজে আসবে।
            </p>
          </div>

          {/* Download PDF — reserved for future backend */}
          <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 text-center">
            <div className="text-3xl mb-2">📄</div>
            <p className="text-[#0a1f44] font-semibold text-sm mb-1">
              আবেদনপত্র ডাউনলোড
            </p>
            <p className="text-slate-400 text-xs mb-4">
              শীঘ্রই আপনি আবেদনের PDF কপি ডাউনলোড করতে পারবেন।
            </p>
            {/* PDF Download button — placeholder for future implementation */}
            <button
              disabled
              className="w-full py-2.5 bg-slate-100 text-slate-400 font-semibold text-sm rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>⬇️</span>
              PDF ডাউনলোড করুন
              <span className="text-xs bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full ml-1">
                শীঘ্রই
              </span>
            </button>
          </div>

          {/* Info */}
          <div className="flex gap-3 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <span className="text-yellow-500 text-lg flex-shrink-0">ℹ️</span>
            <p className="text-yellow-700 text-xs leading-relaxed">
              আপনার আবেদন যাচাই করার পর কর্তৃপক্ষ আপনার সাথে যোগাযোগ করবে।
              অনুগ্রহ করে মোবাইল ফোন সচল রাখুন।
            </p>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="w-full py-3.5 bg-gradient-to-r from-[#0a1f44] to-[#0e2a5c] text-white font-bold rounded-xl hover:opacity-90 transition-opacity"
          >
            ঠিক আছে
          </button>
        </div>
      </div>
    </div>
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
export default function RegistrationPage() {
  const [successId, setSuccessId] = useState<string | null>(null);

  return (
    <main className="font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap');
        body { font-family: 'Hind Siliguri', sans-serif; }
        html { scroll-behavior: smooth; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <Navbar />
      <Hero />
      <MembershipBenefits />
      <RegistrationForm onSuccess={(id) => setSuccessId(id)} />
      <Footer />

      {successId && (
        <SuccessModal appId={successId} onClose={() => setSuccessId(null)} />
      )}
    </main>
  );
}
