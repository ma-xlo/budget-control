import { CommandEmpty } from '@core/components/ui/command'
import { cn } from '@core/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'

interface SearchableListEmptyProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

const SearchableListEmpty = ({ children, className, ...props }: SearchableListEmptyProps) => {
  return (
    <CommandEmpty
      className={cn('flex justify-center p-2 text-sm text-muted-foreground', className)}
      {...props}
    >
      {children}
    </CommandEmpty>
  )
}

export default SearchableListEmpty
