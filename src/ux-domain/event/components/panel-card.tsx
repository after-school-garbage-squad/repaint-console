import type React from "react";

export type PanelCardProps = {
  className?: string;
  children?: React.ReactNode;
} & React.ComponentProps<"div">;

export const PanelCard = ({ children, className, ...rest }: PanelCardProps) => {
  return (
    <div
      className={`relative w-full max-w-sm rounded-lg border-2 border-gray bg-white p-4 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};
