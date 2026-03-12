import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/seo";

export function buildMetadata({
  title,
  description,
  pathname,
  image,
  imageWidth,
  imageHeight
}: {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
}): Metadata {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${pathname}`;
  const ogImage = image
    ? [
        {
          url: image.startsWith("http") ? image : `${siteUrl}${image}`,
          width: imageWidth,
          height: imageHeight,
          alt: title
        }
      ]
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "WallpaperLaunchpad",
      type: "website",
      images: ogImage
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage?.map((item) => item.url)
    },
    alternates: {
      canonical: url
    }
  };
}
