import { createElement, HTMLAttributes, ReactNode } from "react";
import { cn } from "../../lib/utils";

type tagVariants =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "blockquote"
  | "small"
  | "span";

interface TextProps extends Omit<HTMLAttributes<HTMLElement>, "tag"> {
  tag?: tagVariants;
  truncate?: boolean;
  children: ReactNode;
}

const Text = ({
  children,
  tag = "span",
  truncate = true,
  className,
  ...props
}: TextProps) => {
  return (
    <DynamicTypography
      tag={tag}
      className={cn("", truncate && "truncate", className)}
      {...props}
    >
      {children}
    </DynamicTypography>
  );
};

const DynamicTypography = ({
  tag = "span",
  children,
  className,
  ...props
}: TextProps) => {
  return createElement(tag, { className, ...props }, children);
};

export default Text;
