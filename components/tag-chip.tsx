import { clsx } from "clsx";
import type { ReactNode } from "react";

export function TagChip({
  active = false,
  children,
  onClick
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
}) {
  const classes = clsx(
    "rounded-full border px-4 py-2 text-sm transition",
    active
      ? "border-cyan-300/50 bg-cyan-300/15 text-cyan-100"
      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
  );

  if (!onClick) {
    return <span className={classes}>{children}</span>;
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
