import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { CommandItem } from '@core/components/ui/command'
import { cn } from '@core/lib/utils'

interface SearchableListItemProps extends ComponentPropsWithoutRef<typeof CommandPrimitive.Item> {
  children: ReactNode
  onSelect: (value: string) => void
}

const SearchableListItem = forwardRef<
  ElementRef<typeof CommandPrimitive.Item>,
  SearchableListItemProps
>(({ children, className, onSelect, ...props }, ref) => (
  <CommandItem
    className={cn('', className)}
    ref={ref}
    onSelect={(currentValue) => onSelect(currentValue)}
    {...props}
  >
    {children}
  </CommandItem>
))

export default SearchableListItem
