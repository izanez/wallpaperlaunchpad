export type Category = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  intro: string;
  tags: string[];
  relatedCategories: string[];
};

export type AccessLevel = "free" | "premium";

export type Wallpaper = {
  title: string;
  slug: string;
  category: string;
  image: string;
  tags: string[];
  mood: string;
  style: string;
  description: string;
  width: number;
  height: number;
  createdAt: string;
  accessLevel: AccessLevel;
};

export type Collection = {
  title: string;
  slug: string;
  coverImage: string;
  shortDescription: string;
  wallpapers: string[];
  tags: string[];
  accessLevel: AccessLevel;
};

export type SeoGuideSection = {
  heading: string;
  content: string;
};

export type SeoGuide = {
  title: string;
  slug: string;
  description: string;
  intro: string;
  sections: SeoGuideSection[];
  relatedCategories: string[];
  relatedCollections: string[];
  featuredWallpapers: string[];
};

export type ThemeHub = {
  title: string;
  slug: string;
  description: string;
  intro: string;
  tags: string[];
  categories: string[];
  collections: string[];
  wallpapers: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqPage = {
  title: string;
  slug: string;
  description: string;
  intro: string;
  questions: FaqItem[];
  relatedCategories: string[];
  relatedCollections: string[];
  featuredWallpapers: string[];
};

export type IntentPage = {
  title: string;
  slug: string;
  description: string;
  intro: string;
  sections: SeoGuideSection[];
  relatedCategories: string[];
  relatedCollections: string[];
  featuredWallpapers: string[];
};

export type Orientation = "desktop" | "mobile";

export type GenerateWallpaperInput = {
  category: string;
  theme: string;
  mood: string;
  style: string;
  outputCount: number;
  orientation: Orientation;
  collectionSlug?: string;
};
