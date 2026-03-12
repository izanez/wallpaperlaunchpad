import { CollectionGrid } from "@/components/collection-grid";
import { getCollections } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Collections | WallpaperLaunchpad",
  description: "Browse themed wallpaper packs built for future downloadable and premium bundles.",
  pathname: "/collections"
});

export default function CollectionsPage() {
  const collections = getCollections();

  return (
    <div className="space-y-8">
      <section className="max-w-4xl space-y-4">
        <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Collections</p>
        <h1 className="text-4xl font-semibold text-white">Wallpaper packs and themed drops</h1>
        <p className="text-base leading-8 text-slate-300">
          Explore curated wallpaper packs grouped by visual direction. The structure is ready for
          future premium packs without changing the content model.
        </p>
      </section>

      <CollectionGrid collections={collections} />
    </div>
  );
}
