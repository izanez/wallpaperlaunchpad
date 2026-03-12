import { CollectionCard } from "@/components/collection-card";
import type { Collection } from "@/lib/types";

export function CollectionGrid({ collections }: { collections: Collection[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {collections.map((collection) => (
        <CollectionCard key={collection.slug} collection={collection} />
      ))}
    </div>
  );
}
