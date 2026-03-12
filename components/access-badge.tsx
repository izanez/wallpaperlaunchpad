import { clsx } from "clsx";
import { getAccessLabel, isPremiumAccess } from "@/lib/access";
import type { AccessLevel } from "@/lib/types";

export function AccessBadge({
  accessLevel,
  className
}: {
  accessLevel: AccessLevel;
  className?: string;
}) {
  const premium = isPremiumAccess(accessLevel);

  return (
    <span
      className={clsx(
        "rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em]",
        premium
          ? "border-amber-300/30 bg-amber-300/12 text-amber-100"
          : "border-emerald-300/20 bg-emerald-300/10 text-emerald-100",
        className
      )}
    >
      {getAccessLabel(accessLevel)}
    </span>
  );
}
