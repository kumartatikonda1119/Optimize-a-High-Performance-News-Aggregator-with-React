import { cn } from "../../utils/cn.js";

function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "animate-shimmer rounded-2xl bg-gradient-to-r from-white/5 via-white/15 to-white/5 bg-[length:200%_200%]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
