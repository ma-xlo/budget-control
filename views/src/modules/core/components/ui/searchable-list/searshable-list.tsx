import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { CommandList } from '@core/components/ui/command'
import { cn } from '@core/lib/utils'

interface SearchableListProps extends ComponentPropsWithoutRef<typeof CommandPrimitive.List> {
  children: ReactNode
}

const SearchableList = forwardRef<ElementRef<typeof CommandPrimitive.List>, SearchableListProps>(
  ({ children, className, ...props }, ref) => (
    <CommandList className={cn('', className)} ref={ref} {...props}>
      {children}
    </CommandList>
  ),
)

export default SearchableList
