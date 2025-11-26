import { cn } from "@/lib/utils";

type BackgroundGridProps = {
  className?: string;
  glowColor?: string;
  fade?: string;
};

export function BackgroundGrid({
  className,
  glowColor = "rgba(255, 107, 0, 0.25)",
  fade = "rgba(0,0,0,0.85)",
}: BackgroundGridProps) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0 magicui-grid overflow-hidden", className)}
    >
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor}, transparent 55%), linear-gradient(180deg, rgba(17,17,17,0) 0%, ${fade} 100%)`,
        }}
      />
    </div>
  );
}

