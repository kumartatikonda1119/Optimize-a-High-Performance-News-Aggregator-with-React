import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn.js";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border border-white/10 px-3 py-1 text-xs font-medium tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-white/5 text-white",
        positive: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30",
        negative: "bg-rose-500/15 text-rose-200 border-rose-500/30",
        neutral: "bg-slate-500/20 text-slate-200 border-slate-400/30",
        glow: "bg-accent/20 text-accent border-accent/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };
