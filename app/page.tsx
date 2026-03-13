import Link from "next/link";
import { CategoryCard } from "@/components/category-card";
import { CollectionGrid } from "@/components/collection-grid";
import { Hero } from "@/components/hero";
import { StructuredData } from "@/components/structured-data";
import { WallpaperGrid } from "@/components/wallpaper-grid";
import {
  getCategories,
  getCollections,
  getNewestWallpapers,
  getPopularWallpapers,
  getWallpapersByCategory
} from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "WallpaperLaunchpad | AI Wallpapers for Desktop & Mobile",
  description:
    "Browse premium AI wallpapers for desktop and mobile across fantasy, cyberpunk, space, gaming, and more.",
  pathname: "/"
});

export default function HomePage() {
  const categories = getCategories();
  const collections = getCollections();
  const newestWallpapers = getNewestWallpapers(6);
  const trendingWallpapers = getPopularWallpapers(6);
  const featuredCollections = collections.slice(0, 3);
  const spotlightWallpaper = trendingWallpapers[0];
  const categoryCards = categories.map((category) => ({
    category,
    previewImage: getWallpapersByCategory(category.slug)[0]?.image ?? spotlightWallpaper.image
  }));

  return (
    <div className="space-y-20">
      <StructuredData
        data={[
          buildBreadcrumbSchema([{ name: "Home", path: "/" }]),
          buildCollectionPageSchema({
            title: "WallpaperLaunchpad Home",
            description:
              "Browse AI wallpapers for desktop and mobile across categories, packs, and trending drops.",
            path: "/",
            items: trendingWallpapers.map((wallpaper) => ({
              title: wallpaper.title,
              path: `/wallpapers/${wallpaper.slug}`,
              image: wallpaper.image
            }))
          })
        ]}
      />
      <Hero spotlightWallpaper={spotlightWallpaper} featuredCollection={featuredCollections[0]} />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="glass-panel rounded-[2rem] p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Why WallpaperLaunchpad</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            A premium-feeling wallpaper platform built for discovery
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-300">
            WallpaperLaunchpad is a curated AI wallpaper platform for desktop and mobile users who
            want atmospheric scenes, clean organization, and instant downloads. Browse by category,
            explore themed packs, save favorites locally, and move through a fast static catalog
            designed for SEO and polished visual browsing.
          </p>
        </div>
        <div className="glass-panel rounded-[2rem] p-8">
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Quick Links</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {[
              { href: "/categories/fantasy-wallpapers", label: "Fantasy Wallpapers" },
              { href: "/categories/cyberpunk-wallpapers", label: "Cyberpunk Wallpapers" },
              { href: "/categories/space-wallpapers", label: "Space Wallpapers" },
              { href: "/collections/dark-dragon-pack", label: "Dark Dragon Pack" },
              { href: "/collections/neon-city-pack", label: "Neon City Pack" },
              { href: "/collections/space-dreams-pack", label: "Space Dreams Pack" }
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Categories</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Explore premium wallpaper worlds</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categoryCards.map((item) => (
            <CategoryCard
              key={item.category.slug}
              category={item.category}
              previewImage={item.previewImage}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Trending</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">High-impact wallpapers</h2>
          </div>
          <Link href="/browse" className="text-sm text-slate-300 hover:text-white">
            Browse all wallpapers
          </Link>
        </div>
        <WallpaperGrid wallpapers={trendingWallpapers} />
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Newest</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Freshly added visuals</h2>
          </div>
          <Link href="/browse?sort=newest" className="text-sm text-slate-300 hover:text-white">
            View newest
          </Link>
        </div>
        <WallpaperGrid wallpapers={newestWallpapers} />
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Collections</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Featured wallpaper packs</h2>
          </div>
          <Link href="/collections" className="text-sm text-slate-300 hover:text-white">
            View all packs
          </Link>
        </div>
        <CollectionGrid collections={featuredCollections} />
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Benefits</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">Built for fast visual browsing</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[
            {
              title: "Free downloads",
              description: "Download original saved wallpaper files directly from the detail pages with no account required."
            },
            {
              title: "Desktop and mobile",
              description: "Browse wide monitor backgrounds and portrait lock screen art in the same polished catalog."
            },
            {
              title: "Cinematic AI artwork",
              description: "Explore moody fantasy scenes, neon cityscapes, and cosmic visuals designed for premium setups."
            }
          ].map((benefit) => (
            <div key={benefit.title} className="glass-panel rounded-[1.75rem] p-6">
              <h3 className="text-xl font-semibold text-white">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
