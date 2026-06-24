// lib/api/committee.ts
// Usage: import { getActiveCommittee, getFormerCommittees } from "@/lib/api/committee"

import { supabase, CommitteeMember, FormerCommittee } from "@/lib/supabase";

/** Fetch all active (current) committee members, ordered by id */
export async function getActiveCommittee(): Promise<CommitteeMember[]> {
  const { data, error } = await supabase
    .from("committee_members")
    .select("*")
    .eq("is_active", true)
    .order("id", { ascending: true });

  if (error) {
    console.error("Committee fetch error:", error.message);
    return [];
  }
  return data ?? [];
}

/** Fetch all former committee records, newest term first */
export async function getFormerCommittees(): Promise<FormerCommittee[]> {
  const { data, error } = await supabase
    .from("former_committees")
    .select("*")
    .order("year_from", { ascending: false });

  if (error) {
    console.error("Former committee fetch error:", error.message);
    return [];
  }
  return data ?? [];
}

// ─── Example: Server Component usage ─────────────────────────────────────────
//
// app/committee/page.tsx
//
// import { getActiveCommittee } from "@/lib/api/committee";
//
// export default async function CommitteePage() {
//   const members = await getActiveCommittee();
//
//   return (
//     <ul>
//       {members.map((m) => (
//         <li key={m.id}>
//           {m.name} — {m.position}
//         </li>
//       ))}
//     </ul>
//   );
// }
