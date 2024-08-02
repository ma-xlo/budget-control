import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  HTMLAttributes,
} from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import useMediaQuery from "@core/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import { cn } from "@core/lib/utils";
import { Button, ButtonProps } from "./button";
import { Drawer as DrawerPrimitive } from "vaul";
import React from "react";

interface ResponsiveDropdownMenuProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {}

const ResponsiveDropdownMenu = ({ ...props }: ResponsiveDropdownMenuProps) => {
  const isDesktop = useMediaQuery();

  if (isDesktop) {
    return <DropdownMenu {...props} />;
  }

  return <Drawer {...props} />;
};

interface ResponsiveDropdownMenuTriggerProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger> {}

const ResponsiveDropdownTrigger = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  ResponsiveDropdownMenuTriggerProps
>(({ className, ...props }, ref) => {
  const isDesktop = useMediaQuery();

  if (isDesktop) {
    return (
      <DropdownMenuTrigger ref={ref} className={cn("", className)} {...props} />
    );
  }

  return <DrawerTrigger ref={ref} className={cn("", className)} {...props} />;
});

type ResponsiveDropdownContentProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>);

const ResponsiveDropdownContent = ({
  ...props
}: ResponsiveDropdownContentProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <DropdownMenuContent {...props} />;
    case "mobile":
      return <DrawerContent {...props} />;
  }
};

interface ResponsiveDropdownMenuLabelProps
  extends ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {}

const ResponsiveDropdownLabel = forwardRef<
  ElementRef<typeof DropdownMenuPrimitive.Label>,
  ResponsiveDropdownMenuLabelProps
>(({ className, ...props }, ref) => {
  const isDesktop = useMediaQuery();

  if (isDesktop) {
    return (
      <DropdownMenuLabel ref={ref} className={cn("", className)} {...props} />
    );
  }

  return <DrawerTitle ref={ref} className={cn("", className)} {...props} />;
});

type ResponsiveDropdownMenuItemProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item>)
  | ({
      device?: "mobile";
    } & ButtonProps);

const ResponsiveDropdownMenuItem = ({
  className,
  ...props
}: ResponsiveDropdownMenuItemProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <DropdownMenuItem className={cn("", className)} {...props} />;
    case "mobile":
      return (
        <Button
          variant="secondary"
          className={cn(
            "justify-start gap-1 rounded-none bg-secondary/25 text-sm hover:cursor-pointer",
            className
          )}
          {...props}
        />
      );
  }
};

type ResponsiveDropdownMenuSeparatorProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>)
  | ({
      device?: "mobile";
    } & HTMLAttributes<HTMLDivElement>);

const ResponsiveDropdownMenuSeparator = ({
  className,
  ...props
}: ResponsiveDropdownMenuSeparatorProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <DropdownMenuSeparator className={cn("", className)} {...props} />;
    case "mobile":
      return (
        <div
          className={cn("h-4 border-b border-t border-border", className)}
          {...props}
        />
      );
  }
};

const ResponsiveDropdownMenuHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  const isDesktop = useMediaQuery();

  if (isDesktop) {
    return <div className={cn("", className)} {...props} />;
  }

  return <DrawerHeader className={cn("text-left", className)} {...props} />;
};

export {
  ResponsiveDropdownMenu,
  ResponsiveDropdownTrigger,
  ResponsiveDropdownContent,
  ResponsiveDropdownLabel,
  ResponsiveDropdownMenuItem,
  ResponsiveDropdownMenuSeparator,
  ResponsiveDropdownMenuHeader,
};
