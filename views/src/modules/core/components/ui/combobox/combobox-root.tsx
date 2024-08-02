import { Drawer } from "@core/components/ui/drawer";
import { Popover } from "@core/components/ui/popover";
import useMediaQuery from "@core/hooks/use-media-query";
import { ComponentPropsWithoutRef, ReactNode } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Drawer as DrawerPrimitive } from "vaul";
import React from "react";

type ComboboxRootProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof PopoverPrimitive.Root>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>);

const ComboboxRoot = ({ ...props }: ComboboxRootProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <Popover {...props} />;
    case "mobile":
      return <Drawer {...props} />;
  }
};

export default ComboboxRoot;
