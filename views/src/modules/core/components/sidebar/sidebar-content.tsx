import { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";
import React from "react";

interface SideBarContentProps extends HTMLAttributes<HTMLDivElement> {}

export default function SideBarContent({
  children,
  className,
  ...props
}: SideBarContentProps) {
  return (
    <div
      className={cn("flex h-full w-full grow flex-col", className)}
      {...props}
    >
      {children}
    </div>
  );
}
