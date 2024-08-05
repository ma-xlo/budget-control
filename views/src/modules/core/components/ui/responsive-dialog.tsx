import { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Drawer as DrawerPrimitive } from "vaul";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";
import useMediaQuery from "../../hooks/use-media-query";
import { Button, ButtonProps } from "../ui/button";
import React from "react";

type ResponsiveDialogProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof DialogPrimitive.Root>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>);

const ResponsiveDialog = ({ ...props }: ResponsiveDialogProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <Dialog {...props} />;
    case "mobile":
      return <Drawer {...props} />;
  }
};

type ResponsiveDialogTriggerProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>);

const ResponsiveDialogTrigger = ({
  ...props
}: ResponsiveDialogTriggerProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <DialogTrigger {...props} />;
    case "mobile":
      return <DrawerTrigger {...props} />;
  }
};

type ResponsiveDialogContentProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof DialogPrimitive.Content>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>);

const ResponsiveDialogContent = ({
  ...props
}: ResponsiveDialogContentProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <DialogContent {...props} />;
    case "mobile":
      return <DrawerContent {...props} />;
  }
};

type ResponsiveDialogHeaderProps =
  | ({
      device?: "desktop";
    } & HTMLAttributes<HTMLDivElement>)
  | ({
      device?: "mobile";
    } & HTMLAttributes<HTMLDivElement>);

const ResponsiveDialogHeader = ({ ...props }: ResponsiveDialogHeaderProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <DialogHeader {...props} />;
    case "mobile":
      return <DrawerHeader {...props} />;
  }
};

type ResponsiveDialogFooterProps =
  | ({
      device?: "desktop";
    } & HTMLAttributes<HTMLDivElement>)
  | ({
      device?: "mobile";
    } & HTMLAttributes<HTMLDivElement>);

const ResponsiveDialogFooter = ({ ...props }: ResponsiveDialogFooterProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <DialogFooter {...props} />;
    case "mobile":
      return <DrawerFooter {...props} />;
  }
};

type ResponsiveDialogTitleProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof DialogPrimitive.Title>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>);

const ResponsiveDialogTitle = ({ ...props }: ResponsiveDialogTitleProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <DialogTitle {...props} />;
    case "mobile":
      return <DrawerTitle {...props} />;
  }
};

type ResponsiveDialogDescriptionProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof DialogPrimitive.Description>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>);

const ResponsiveDialogDescription = ({
  ...props
}: ResponsiveDialogDescriptionProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <DialogDescription {...props} />;
    case "mobile":
      return <DrawerDescription {...props} />;
  }
};

type ResponsiveDialogCancelProps =
  | ({
      device?: "desktop";
    } & ButtonProps)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>);

const ResponsiveDialogCancel = ({ ...props }: ResponsiveDialogCancelProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      const variant = "outline";
      return <Button variant={props.variant ?? variant} {...props} />;
    case "mobile":
      return <DrawerClose {...props} />;
  }
};

interface ResponsiveDialogActionProps extends ButtonProps {}

const ResponsiveDialogAction = ({ ...props }: ResponsiveDialogActionProps) => {
  return <Button {...props} />;
};

export {
  ResponsiveDialog,
  ResponsiveDialogTrigger,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogFooter,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
  ResponsiveDialogCancel,
  ResponsiveDialogAction,
};
