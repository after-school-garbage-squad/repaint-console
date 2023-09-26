import type React from "react";

import { twMerge } from "tailwind-merge";

export type PanelCardProps = {
  className?: string;
  children?: React.ReactNode;
} & React.ComponentProps<"div">;

export const PanelCard = ({ children, className, ...rest }: PanelCardProps) => {
  return (
    <div
      className={twMerge(
        "relative max-w-sm rounded-lg border-2 border-gray bg-white p-4",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
