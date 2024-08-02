import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { CommandInput } from '@core/components/ui/command'
import { cn } from '@core/lib/utils'

interface SearchableListInputProps extends ComponentPropsWithoutRef<typeof CommandPrimitive.Input> {
  placeholder: string
}

const SearchableListInput = forwardRef<
  ElementRef<typeof CommandPrimitive.Input>,
  SearchableListInputProps
>(({ placeholder, className, ...props }, ref) => (
  <CommandInput placeholder={placeholder} className={cn('', className)} ref={ref} {...props} />
))

export default SearchableListInput
