import { forwardRef, HTMLAttributes } from "react";
import { Button } from "@core/components/ui/button";
import { Menu } from "lucide-react";
import Image from "@shared/image";
// import useLogo from "@core/hooks/use-logo";
import useMediaQuery from "@core/hooks/use-media-query";
import { useGlobalStore } from "@stores/global";
import { queryClient } from "@core/lib/react-query";
import { keyCurrentUser } from "@user/services/keys";
import { ThemeToggle } from "./theme-toggle";
import React from "react";
import { cn } from "../lib/utils";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  sideBarCollapsed: boolean;
  onMenuToggleClick: (collapsed: boolean) => void;
}

const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ sideBarCollapsed, className, onMenuToggleClick, ...props }, ref) => {
    const isDesktop = useMediaQuery();
    // const logo = useLogo();

    const toggleCollapse = () => {
      onMenuToggleClick(!sideBarCollapsed);
    };

    return (
      <header
        ref={ref}
        className={cn(
          `sticky top-0 flex w-full items-center justify-between border-b bg-background/25 backdrop-blur transition-all dark:bg-background/95 ${
            isDesktop ? "px-2 py-2" : "px-2 py-2"
          }`,
          className
        )}
        {...props}
      >
        <div className="flex w-1/3 items-center gap-2">
          {isDesktop && (
            <Button variant="ghost" size="icon" onClick={toggleCollapse}>
              <Menu />
            </Button>
          )}
          {/* <Image
            src={logo}
            alt="Logo"
            className={`${isDesktop ? "max-h-9 py-2" : "max-h-3"}`}
          /> */}
        </div>

        <div className="flex w-1/3 items-center justify-end gap-1">
          <ThemeToggle />
        </div>
      </header>
    );
  }
);

export default Header;
