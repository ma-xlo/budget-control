import { ReactNode } from 'react'

interface SideBarContentProps {
  children: ReactNode
}

export default function SideBarContent({ children }: SideBarContentProps) {
  return <div className="flex h-full w-full grow flex-col">{children}</div>
}
