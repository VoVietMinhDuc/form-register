import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type GradientTextProps = HTMLAttributes<HTMLSpanElement> & {
  gradientClassName?: string;
};

export function GradientText({
  className,
  gradientClassName = "from-[#ff0000] via-[#ffd86b] to-[#ff6b00]",
  children,
  ...props
}: GradientTextProps) {
  return (
    <span
      className={cn(
        "inline-block bg-clip-text text-transparent",
        `bg-gradient-to-r ${gradientClassName}`,
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

