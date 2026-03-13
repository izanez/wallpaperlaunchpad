import { CollectionGrid } from "@/components/collection-grid";
import { StructuredData } from "@/components/structured-data";
import { getCollections } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { buildBreadcrumbSchema, buildCollectionPageSchema } from "@/lib/structured-data";

export const metadata = buildMetadata({
  title: "Collections | WallpaperLaunchpad",
  description: "Browse themed wallpaper packs built for future downloadable and premium bundles.",
  pathname: "/collections"
});

export default function CollectionsPage() {
  const collections = getCollections();

  return (
    <div className="space-y-8">
      <StructuredData
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Collections", path: "/collections" }
          ]),
          buildCollectionPageSchema({
            title: "Collections",
            description:
              "Browse themed wallpaper packs built for future downloadable and premium bundles.",
            path: "/collections",
            items: collections.map((collection) => ({
              title: collection.title,
              path: `/collections/${collection.slug}`,
              image: collection.coverImage
            }))
          })
        ]}
      />
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
