import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import {
  TooltipProvider,
  Tooltip as ShadcnTooltip,
  TooltipTrigger as ShadcnTooltipTrigger,
  TooltipContent as ShadcnTooltipContent,
} from "./tooltip";
import { cn } from "@core/lib/utils";
import React from "react";

interface TooltipProps
  extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Provider> {
  asChild?: boolean;
  className?: string;
}

const Tooltip = ({ children, delayDuration = 200, ...props }: TooltipProps) => (
  <TooltipProvider {...props} delayDuration={delayDuration}>
    <ShadcnTooltip>{children}</ShadcnTooltip>
  </TooltipProvider>
);

interface TooltipTriggerProps
  extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> {}

const TooltipTrigger = forwardRef<
  ElementRef<typeof TooltipPrimitive.Trigger>,
  TooltipTriggerProps
>(({ className, children, ...props }, ref) => (
  <ShadcnTooltipTrigger ref={ref} className={cn("", className)} {...props}>
    {children}
  </ShadcnTooltipTrigger>
));

interface TooltipContentProps
  extends ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  arrow?: boolean;
}

const TooltipContent = forwardRef<
  ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({ className, arrow = true, children, side = "bottom", ...props }, ref) => (
  <ShadcnTooltipContent
    ref={ref}
    side={side}
    className={cn(
      "flex items-center gap-4 bg-secondary px-2 py-1 text-foreground",
      className
    )}
    {...props}
  >
    {arrow && <TooltipPrimitive.Arrow className="fill-secondary" />}
    {children}
  </ShadcnTooltipContent>
));

export { Tooltip, TooltipTrigger, TooltipContent };
