import { ComponentPropsWithoutRef, HTMLAttributes } from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { Drawer as DrawerPrimitive } from "vaul";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
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

type ResponsiveAlertDialogProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Root>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Root>);

const ResponsiveAlertDialog = ({ ...props }: ResponsiveAlertDialogProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <AlertDialog {...props} />;
    case "mobile":
      return <Drawer {...props} />;
  }
};

type ResponsiveAlertDialogTriggerProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Trigger>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>);

const ResponsiveAlertDialogTrigger = ({
  ...props
}: ResponsiveAlertDialogTriggerProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <AlertDialogTrigger {...props} />;
    case "mobile":
      return <DrawerTrigger {...props} />;
  }
};

type ResponsiveAlertDialogContentProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>);

const ResponsiveAlertDialogContent = ({
  ...props
}: ResponsiveAlertDialogContentProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <AlertDialogContent {...props} />;
    case "mobile":
      return <DrawerContent {...props} />;
  }
};

type ResponsiveAlertDialogHeaderProps =
  | ({
      device?: "desktop";
    } & HTMLAttributes<HTMLDivElement>)
  | ({
      device?: "mobile";
    } & HTMLAttributes<HTMLDivElement>);

const ResponsiveAlertDialogHeader = ({
  ...props
}: ResponsiveAlertDialogHeaderProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <AlertDialogHeader {...props} />;
    case "mobile":
      return <DrawerHeader {...props} />;
  }
};

type ResponsiveAlertDialogFooterProps =
  | ({
      device?: "desktop";
    } & HTMLAttributes<HTMLDivElement>)
  | ({
      device?: "mobile";
    } & HTMLAttributes<HTMLDivElement>);

const ResponsiveAlertDialogFooter = ({
  ...props
}: ResponsiveAlertDialogFooterProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <AlertDialogFooter {...props} />;
    case "mobile":
      return <DrawerFooter {...props} />;
  }
};

type ResponsiveAlertDialogTitleProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>);

const ResponsiveAlertDialogTitle = ({
  ...props
}: ResponsiveAlertDialogTitleProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <AlertDialogTitle {...props} />;
    case "mobile":
      return <DrawerTitle {...props} />;
  }
};

type ResponsiveAlertDialogDescriptionProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>);

const ResponsiveAlertDialogDescription = ({
  ...props
}: ResponsiveAlertDialogDescriptionProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <AlertDialogDescription {...props} />;
    case "mobile":
      return <DrawerDescription {...props} />;
  }
};

type ResponsiveAlertDialogCancelProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>)
  | ({
      device?: "mobile";
    } & ComponentPropsWithoutRef<typeof DrawerPrimitive.Close>);

const ResponsiveAlertDialogCancel = ({
  ...props
}: ResponsiveAlertDialogCancelProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <AlertDialogCancel {...props} />;
    case "mobile":
      return <DrawerClose {...props} />;
  }
};

type ResponsiveAlertDialogActionProps =
  | ({
      device?: "desktop";
    } & ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>)
  | ({
      device?: "mobile";
    } & ButtonProps);

const ResponsiveAlertDialogAction = ({
  ...props
}: ResponsiveAlertDialogActionProps) => {
  props.device = useMediaQuery() ? "desktop" : "mobile";

  switch (props.device) {
    case "desktop":
      return <AlertDialogAction {...props} />;
    case "mobile":
      return <Button {...props} />;
  }
};

export {
  ResponsiveAlertDialog,
  ResponsiveAlertDialogTrigger,
  ResponsiveAlertDialogContent,
  ResponsiveAlertDialogHeader,
  ResponsiveAlertDialogFooter,
  ResponsiveAlertDialogTitle,
  ResponsiveAlertDialogDescription,
  ResponsiveAlertDialogCancel,
  ResponsiveAlertDialogAction,
};
