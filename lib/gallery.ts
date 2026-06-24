// lib/api/gallery.ts
// Usage: import { getGalleryItems, getRecentGallery } from "@/lib/api/gallery"

import { supabase, GalleryItem } from "@/lib/supabase";

/** All gallery items, newest first */
export async function getGalleryItems(): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gallery fetch error:", error.message);
    return [];
  }
  return data ?? [];
}

/** Recent N items for a homepage preview (default: 6) */
export async function getRecentGallery(limit = 6): Promise<GalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Recent gallery fetch error:", error.message);
    return [];
  }
  return data ?? [];
}

// ─── Example: Server Component usage ─────────────────────────────────────────
//
// app/gallery/page.tsx
//
// import { getGalleryItems } from "@/lib/api/gallery";
// import Image from "next/image";
//
// export default async function GalleryPage() {
//   const items = await getGalleryItems();
//
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//       {items.map((item) => (
//         <div key={item.id}>
//           <Image
//             src={item.image_url}
//             alt={item.title ?? "গ্যালারি"}
//             width={400}
//             height={300}
//             className="rounded-xl object-cover w-full h-48"
//           />
//           {item.title && <p className="mt-2 text-sm">{item.title}</p>}
//         </div>
//       ))}
//     </div>
//   );
// }
