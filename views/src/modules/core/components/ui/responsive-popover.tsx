import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  HTMLAttributes,
} from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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

interface ResponsivePopoverProps
  extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> {}

const ResponsivePopover = ({ ...props }: ResponsivePopoverProps) => {
  const isDesktop = useMediaQuery();

  if (isDesktop) {
    return <Popover {...props} />;
  }

  return <Drawer {...props} />;
};

type ResponsivePopoverTriggerProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>);

const ResponsivePopoverTrigger = ({
  ...props
}: ResponsivePopoverTriggerProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <PopoverTrigger {...props} />;
    case "mobile":
      return <DrawerTrigger {...props} />;
  }
};

type ResponsivePopoverContentProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>);

const ResponsivePopoverContent = ({
  ...props
}: ResponsivePopoverContentProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <PopoverContent {...props} />;
    case "mobile":
      return <DrawerContent {...props} />;
  }
};

type ResponsivePopoverTitleProps =
  | ({
      device?: "desktop";
    } & HTMLAttributes<HTMLHeadingElement>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>);

const ResponsivePopoverTitle = ({ ...props }: ResponsivePopoverTitleProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <h3 {...props} />;
    case "mobile":
      return <DrawerTitle {...props} />;
  }
};

const ResponsivePopoverHeader = ({
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
  ResponsivePopover,
  ResponsivePopoverTrigger,
  ResponsivePopoverContent,
  ResponsivePopoverTitle,
  ResponsivePopoverHeader,
};
