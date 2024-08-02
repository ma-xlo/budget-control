import { CommandGroup } from '@core/components/ui/command'
import { cn } from '@core/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'

interface SearchableListGroupProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

const SearchableListGroup = ({ children, className, ...props }: SearchableListGroupProps) => {
  return (
    <CommandGroup className={cn('', className)} {...props}>
      {children}
    </CommandGroup>
  )
}

export default SearchableListGroup
