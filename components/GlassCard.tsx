import { cn } from "@/lib/utils"; // adjust if your `cn` utility is located elsewhere
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlassCard({
  children,
  className,
  style,
}: GlassCardProps) {
  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden rounded-lg border p-4 group transition-all duration-300 backdrop-blur-sm",
        // Light mode
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] shadow-md",
        // Dark mode
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15] dark:shadow-lg",
        className
      )}
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
        ...style,
      }}
    >
      {children}
    </figure>
  );
}
