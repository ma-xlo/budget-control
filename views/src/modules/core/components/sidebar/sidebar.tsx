import { ReactNode } from "react";

interface SideBarProps {
  children: ReactNode;
}

export default function SideBar({ children }: SideBarProps) {
  return <div className="h-full bg-background">{children}</div>;
}
