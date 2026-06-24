// lib/api/notices.ts
// Usage: import { getLatestNotices, getAllNotices } from "@/lib/api/notices"

import { supabase, Notice } from "@/lib/supabase";

/** Latest N notices for the homepage (default: 4) */
export async function getLatestNotices(limit = 4): Promise<Notice[]> {
  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Notices fetch error:", error.message);
    return [];
  }
  return data ?? [];
}

/** All notices for the /notices page */
export async function getAllNotices(): Promise<Notice[]> {
  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("All notices fetch error:", error.message);
    return [];
  }
  return data ?? [];
}

/** Notices filtered by tag (e.g. "জরুরি") */
export async function getNoticesByTag(tag: string): Promise<Notice[]> {
  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .eq("tag", tag)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Notices by tag fetch error:", error.message);
    return [];
  }
  return data ?? [];
}

// ─── Example: Server Component usage ─────────────────────────────────────────
//
// app/notices/page.tsx
//
// import { getAllNotices } from "@/lib/api/notices";
//
// export default async function NoticesPage() {
//   const notices = await getAllNotices();
//
//   return (
//     <ul>
//       {notices.map((n) => (
//         <li key={n.id}>
//           <span>{n.tag}</span> {n.title} — {n.published_at}
//         </li>
//       ))}
//     </ul>
//   );
// }
