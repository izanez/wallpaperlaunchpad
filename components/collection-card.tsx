import { AccessBadge } from "@/components/access-badge";
import Image from "next/image";
import Link from "next/link";
import { buildCollectionAltText } from "@/lib/seo";
import { TagChip } from "@/components/tag-chip";
import type { Collection } from "@/lib/types";

export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className="group glass-panel overflow-hidden rounded-3xl transition duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={collection.coverImage}
          alt={buildCollectionAltText(collection)}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-white">{collection.title}</h3>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan-100">
              Pack
            </span>
            {collection.accessLevel === "premium" ? (
              <AccessBadge accessLevel={collection.accessLevel} />
            ) : null}
          </div>
        </div>
        <p className="text-sm leading-6 text-slate-300">{collection.shortDescription}</p>
        <div className="flex flex-wrap gap-2">
          {collection.tags.slice(0, 3).map((tag) => (
            <TagChip key={tag}>{tag}</TagChip>
          ))}
        </div>
      </div>
    </Link>
  );
}
