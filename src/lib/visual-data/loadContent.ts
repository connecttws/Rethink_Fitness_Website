import { readFileSync } from "fs";
import { join } from "path";
import { unstable_cache } from "next/cache";
import { supabase } from "./supabase";

export type VisualContent = {
  hero: {
    fullText: string;
    subtitle: string;
    primaryBtnText: string;
    secondaryBtnText: string;
  };
  features: {
    titlePrefix: string;
    titleAccent: string;
    description: string;
    items: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  facilityTour: {
    titlePrefix: string;
    titleAccent: string;
    description: string;
    images: Array<{
      id: number;
      url: string;
      title: string;
      featured: boolean;
    }>;
    btnText: string;
  };
  schedule: {
    titlePrefix: string;
    titleAccent: string;
    description: string;
    items: Array<{
      time: string;
      class: string;
      trainer: string;
      duration: string;
    }>;
    btnText: string;
  };
  gatewayTeaser: {
    block1: {
      title: string;
      desc: string;
      btnText: string;
    };
    block2: {
      title: string;
      desc: string;
      btnText: string;
    };
  };
  trainers: {
    titlePrefix: string;
    titleAccent: string;
    description: string;
    items: Array<{
      id: number;
      name: string;
      specialty: string;
      image: string;
      bio: string;
    }>;
    btnText: string;
  };
  testimonials: {
    titlePrefix: string;
    titleAccent: string;
    description: string;
    items: Array<{
      id: number;
      name: string;
      review: string;
      role: string;
      image: string;
    }>;
  };
  appTeaser: {
    titlePrefix: string;
    titleAccent: string;
    description: string;
    features: string[];
  };
  pricing: {
    bannerTitlePrefix: string;
    bannerTitleAccent: string;
    bannerDescHtml: string;
    btnText: string;
  };
  locationSection: {
    titlePrefix: string;
    titleAccent: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    hoursHtml: string;
    mapIframeSrc: string;
  };
  instagramFeed: {
    titlePrefix: string;
    titleAccent: string;
    handle: string;
    posts: Array<{
      id: number;
      image: string;
      link: string;
      likes: string;
      comments: string;
    }>;
  };
};

const CONTENT_FILE = join(process.cwd(), "visual-data", "HomeContent.json");

function loadLocalContent(): VisualContent {
  try {
    return JSON.parse(readFileSync(CONTENT_FILE, "utf-8")) as VisualContent;
  } catch {
    return {} as VisualContent;
  }
}

const fetchSupabaseContent = unstable_cache(
  async () => {
    if (!supabase) return null;
    const { data, error } = await supabase
      .from("content_store")
      .select("data")
      .eq("id", "main")
      .single();
    
    if (error) {
      throw new Error(error.message);
    }
    return data?.data as VisualContent | undefined;
  },
  ['visual-content-cache'],
  { tags: ['visual-content'] }
);

export async function loadVisualContent(): Promise<VisualContent> {
  const isProd = process.env.NODE_ENV === "production";
  if (supabase && isProd) {
    try {
      const cachedContent = await fetchSupabaseContent();
      if (cachedContent) {
        return cachedContent;
      }
    } catch (err) {
      console.warn("Supabase connection error, falling back to local content.", err);
    }
  }

  return loadLocalContent();
}
