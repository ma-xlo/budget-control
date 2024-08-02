import { Command } from '@core/components/ui/command'
import { cn } from '@core/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'

interface SearchableListRootProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const SearchableListRoot = ({ children, className }: SearchableListRootProps) => {
  return <Command className={cn('', className)}>{children}</Command>
}

export default SearchableListRoot
