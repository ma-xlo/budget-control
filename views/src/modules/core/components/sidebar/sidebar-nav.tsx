import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@core/components/ui/tooltip";
import NavItem from "@core/components/sidebar/sidebar-nav-item";
import useMediaQuery from "@core/hooks/use-media-query";
import { SideBarLink } from "../../layouts/dashboard";
import React, { ReactNode } from "react";

interface NavProps {
  isCollapsed: boolean;
  links?: SideBarLink[];
  children?: ReactNode;
}

export default function SideBarNav({ children, links, isCollapsed }: NavProps) {
  const isDesktop = useMediaQuery();

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      {children ? (
        <div
          className={`flex ${
            isDesktop
              ? "flex-col group-[[data-collapsed=true]]:justify-center"
              : "justify-around"
          } w-full gap-1 px-2  group-[[data-collapsed=true]]:px-2`}
        >
          {children}
        </div>
      ) : (
        <nav
          className={`flex ${
            isDesktop
              ? "flex-col group-[[data-collapsed=true]]:justify-center"
              : "justify-around"
          } w-full gap-1 px-2  group-[[data-collapsed=true]]:px-2`}
        >
          {links &&
            links.map((link, index) =>
              isCollapsed && isDesktop ? (
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger>
                    <NavItem link={link} size="icon" />
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    {link.title}
                    {link.label && (
                      <span className="ml-auto text-muted-foreground">
                        {link.label}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <NavItem
                  link={link}
                  key={index}
                  size={!isDesktop ? "icon" : "sm"}
                />
              )
            )}
        </nav>
      )}
    </div>
  );
}
