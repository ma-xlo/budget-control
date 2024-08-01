import { ReactNode } from 'react'

interface SideBarFooterProps {
  children: ReactNode
}

export default function SideBarFooter({ children }: SideBarFooterProps) {
  return <footer className="sticky py-4">{children}</footer>
}
