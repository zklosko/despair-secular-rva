
import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  background?: "default" | "muted" | "dark";
  spacing?: "normal" | "large";
  className?: string;
};

const backgrounds = {
  default: "bg-background",
  muted: "bg-muted-background",
  dark: "bg-foreground text-white",
};

const spacingStyles = {
  normal: "py-16 md:py-20",
  large: "py-20 md:py-28",
};

export function Section({
  children,
  background = "default",
  spacing = "normal",
  className = "",
}: SectionProps) {
  return (
    <section
      className={`${backgrounds[background]} ${spacingStyles[spacing]} ${className}`}
    >
      {children}
    </section>
  );
}
