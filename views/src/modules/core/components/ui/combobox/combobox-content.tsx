import useMediaQuery from "@core/hooks/use-media-query";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Drawer as DrawerPrimitive } from "vaul";
import React from "react";
import { PopoverContent } from "../popover";
import { DrawerContent } from "../drawer";

type ComboboxTriggerProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>);

const ComboboxRoot = ({ ...props }: ComboboxTriggerProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <PopoverContent {...props} />;
    case "mobile":
      return <DrawerContent {...props} />;
  }
};

export default ComboboxRoot;
