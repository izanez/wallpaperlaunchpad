import Image from "next/image";
import Link from "next/link";
import { buildCategoryAltText } from "@/lib/seo";
import type { Category } from "@/lib/types";

export function CategoryCard({
  category,
  previewImage
}: {
  category: Category;
  previewImage: string;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group glass-panel relative overflow-hidden rounded-[1.75rem] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={previewImage}
          alt={buildCategoryAltText(category.name)}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060816] via-[#060816]/20 to-transparent" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-pink-400/10 opacity-0 transition group-hover:opacity-100" />
      <div className="relative p-6">
        <p className="mb-4 text-xs uppercase tracking-[0.24em] text-cyan-200/80">Category</p>
        <h3 className="mb-3 text-2xl font-semibold text-white">{category.name}</h3>
        <p className="text-sm leading-6 text-slate-300">{category.shortDescription}</p>
      </div>
    </Link>
  );
}
