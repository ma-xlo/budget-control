import useMediaQuery from "@core/hooks/use-media-query";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Drawer as DrawerPrimitive } from "vaul";
import React from "react";
import { PopoverTrigger } from "../popover";
import { DrawerTrigger } from "../drawer";

type ComboboxTriggerProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>);

const ComboboxRoot = ({ ...props }: ComboboxTriggerProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <PopoverTrigger {...props} />;
    case "mobile":
      return <DrawerTrigger {...props} />;
  }
};

export default ComboboxRoot;
