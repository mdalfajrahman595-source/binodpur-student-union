import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Database Types ────────────────────────────────────────────────────────────

export interface CommitteeMember {
  id: number;
  name: string;
  position: string;
  phone?: string;
  photo_url?: string;
  year?: number;
  is_active: boolean;
  created_at?: string;
}

export interface FormerCommittee {
  id: number;
  name: string;
  position: string;
  year_from: number;
  year_to: number;
  photo_url?: string;
  created_at?: string;
}

export interface Notice {
  id: number;
  title: string;
  content?: string;
  tag: string;
  published_at: string;
  created_at?: string;
}

export interface GalleryItem {
  id: number;
  title?: string;
  image_url: string;
  event_date?: string;
  created_at?: string;
}

export interface Member {
  id: number;
  name: string;
  phone?: string;
  address?: string;
  joined_at?: string;
  is_active: boolean;
  created_at?: string;
}

export interface BloodDonor {
  id: number;
  name: string;
  blood_group: string;
  phone?: string;
  last_donated?: string;
  created_at?: string;
}
