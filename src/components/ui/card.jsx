import { cn } from "../../utils/cn.js";

function Card({ className, ...props }) {
  return (
    <div
      className={cn("glass rounded-3xl border border-white/10 p-6", className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}

function CardContent({ className, ...props }) {
  return <div className={cn("mt-4", className)} {...props} />;
}

export { Card, CardHeader, CardContent };
