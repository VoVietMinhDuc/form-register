import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  size?: number;
  color?: string;
  blur?: number;
};

export function Spotlight({
  className,
  size = 520,
  color = "rgba(255,67,20,0.75)",
  blur = 120,
}: SpotlightProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-auto mix-blend-screen opacity-80", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
    />
  );
}

