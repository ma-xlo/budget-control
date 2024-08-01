// import { useGlobalStore } from '@stores/global'
import { forwardRef, HTMLAttributes, ReactNode } from "react";
import useMediaQuery from "../../../hooks/use-media-query";
import { cn } from "../../../lib/utils";

interface MobileSideBarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const MobileSideBar = forwardRef<HTMLDivElement, MobileSideBarProps>(
  ({ children, className, ...props }, ref) => {
    const isDesktop = useMediaQuery();

    return (
      <div
        ref={ref}
        className={cn(
          "sticky bottom-0 w-full border-t bg-background dark:bg-background transition-all",
          isDesktop && "hidden",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

export default MobileSideBar;
