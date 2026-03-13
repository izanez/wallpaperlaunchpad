import { FavoritesProvider } from "@/components/favorites-provider";
import { StructuredData } from "@/components/structured-data";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "@/app/globals.css";
import { getSiteUrl } from "@/lib/seo";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "WallpaperLaunchpad",
  description: "AI wallpapers for desktop and mobile with static SEO pages and local generation.",
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <StructuredData data={[buildWebSiteSchema(), buildOrganizationSchema()]} />
        <FavoritesProvider>
          <div className="relative min-h-screen">
            <SiteHeader />
            <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
            <SiteFooter />
          </div>
          <Analytics />
        </FavoritesProvider>
      </body>
    </html>
  );
}
