import type { Category, Collection, FaqPage, Wallpaper } from "@/lib/types";
import { getSiteUrl } from "@/lib/seo";

type BreadcrumbItem = {
  name: string;
  path: string;
};

function toAbsoluteUrl(path: string) {
  if (path.startsWith("http")) {
    return path;
  }

  return `${getSiteUrl()}${path}`;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toAbsoluteUrl(item.path)
    }))
  };
}

export function buildWebSiteSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WallpaperLaunchpad",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/browse?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function buildOrganizationSchema() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WallpaperLaunchpad",
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`
  };
}

export function buildCollectionPageSchema({
  title,
  description,
  path,
  items
}: {
  title: string;
  description: string;
  path: string;
  items: Array<{ title: string; path: string; image?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: toAbsoluteUrl(path),
    hasPart: items.map((item) => ({
      "@type": "CreativeWork",
      name: item.title,
      url: toAbsoluteUrl(item.path),
      image: item.image ? toAbsoluteUrl(item.image) : undefined
    }))
  };
}

export function buildCategorySchema(category: Category, wallpapers: Wallpaper[]) {
  return buildCollectionPageSchema({
    title: category.name,
    description: category.description,
    path: `/categories/${category.slug}`,
    items: wallpapers.map((wallpaper) => ({
      title: wallpaper.title,
      path: `/wallpapers/${wallpaper.slug}`,
      image: wallpaper.image
    }))
  });
}

export function buildCollectionSchema(collection: Collection, wallpapers: Wallpaper[]) {
  return buildCollectionPageSchema({
    title: collection.title,
    description: collection.shortDescription,
    path: `/collections/${collection.slug}`,
    items: wallpapers.map((wallpaper) => ({
      title: wallpaper.title,
      path: `/wallpapers/${wallpaper.slug}`,
      image: wallpaper.image
    }))
  });
}

export function buildWallpaperSchema(wallpaper: Wallpaper, categoryName?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: wallpaper.title,
    description: wallpaper.description,
    contentUrl: toAbsoluteUrl(wallpaper.image),
    url: toAbsoluteUrl(`/wallpapers/${wallpaper.slug}`),
    width: wallpaper.width,
    height: wallpaper.height,
    keywords: wallpaper.tags.join(", "),
    genre: categoryName ?? wallpaper.category,
    isAccessibleForFree: wallpaper.accessLevel === "free",
    creator: {
      "@type": "Organization",
      name: "WallpaperLaunchpad"
    }
  };
}

export function buildFaqSchema(page: FaqPage) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}
