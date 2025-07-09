import { cn } from "@/lib/utils";
import React from "react";

const BgGrid = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex h-[50rem] w-full items-center justify-center bg-gray-50 dark:bg-[oklch(0.05_0_0)]",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
        )}
      />

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gray-200 [mask-image:radial-gradient(ellipse_at_center,transparent_2%,black)] dark:bg-[oklch(0.02_0_0)]"></div>

      <div className="mt-32"> {children}</div>
    </div>
  );
};

export default BgGrid;
