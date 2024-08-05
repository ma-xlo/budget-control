import Header from "@core/components/header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@core/components/ui/resizable";
import { TooltipProvider } from "@core/components/ui/tooltip";
// import { useGlobalStore } from "@core/stores/global";

import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { MobileSideBar } from "@core/components/sidebar/mobile";
import { Separator } from "@core/components/ui/separator";
import { ImperativePanelHandle } from "react-resizable-panels";
import useMediaQuery from "@core/hooks/use-media-query";
import useElementDimensions from "@/hooks/use-element-dimensions";
import React from "react";
import { cn } from "../lib/utils";
import { LogOut, LucideIcon, Receipt, Sidebar } from "lucide-react";
import path from "path";
import { Button } from "../components/ui/button";
import SidebarAction from "../components/sidebar/sidebar-action";
import { SideBar, SideBarContent, SideBarNav } from "../components/sidebar";
import LogoutSidebarButton from "../../auth/components/logout-button";

export interface SideBarLink {
  title: string;
  label?: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  path: string;
  subItems?: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant?: "default" | "ghost";
    path: string;
  }[];
}

interface DefaultLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  sideBarCollapsedSize?: number;
}

export default function DashboardLayout({
  defaultLayout = [15, 85],
  defaultCollapsed = false,
  sideBarCollapsedSize = 3,
}: DefaultLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  //   const [sideBarLinks] = useGlobalStore((state) => [state.sideBarLinks]);
  const sideBarRef = useRef<ImperativePanelHandle>(null);

  const isDesktop = useMediaQuery();
  const sideBarLinks: SideBarLink[] = [
    {
      title: "Despesas",
      icon: Receipt,
      variant: "ghost",
      path: "/",
    },
  ];

  return (
    <div className="flex h-svh flex-col">
      <TooltipProvider delayDuration={0}>
        <Header
          sideBarCollapsed={isCollapsed}
          onMenuToggleClick={(collapsed: boolean) => {
            setIsCollapsed(collapsed);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              collapsed
            )}`;
            if (!collapsed) sideBarRef.current?.expand(100);

            if (collapsed) sideBarRef.current?.collapse();
          }}
        />
        <div className="w-full grow">
          {isDesktop ? (
            <ResizablePanelGroup
              direction="horizontal"
              onLayout={(sizes: number[]) =>
                (document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                  sizes
                )}`)
              }
              className="items-stretch"
            >
              <ResizablePanel
                ref={sideBarRef}
                defaultSize={defaultLayout[0]}
                collapsedSize={sideBarCollapsedSize}
                collapsible={true}
                minSize={10}
                maxSize={15}
                onCollapse={() => {
                  setIsCollapsed(true);
                  document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                    true
                  )}`;
                }}
                onExpand={() => {
                  setIsCollapsed(false);
                  document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                    false
                  )}`;
                }}
                className={cn(
                  isCollapsed &&
                    "min-w-[50px] transition-all duration-300 ease-in-out"
                )}
              >
                <SideBar>
                  <SideBarContent className=" justify-between">
                    <div>
                      <SideBarNav
                        links={sideBarLinks}
                        isCollapsed={isCollapsed}
                      ></SideBarNav>
                      <Separator />
                    </div>
                    <SideBarNav isCollapsed={isCollapsed}>
                      <LogoutSidebarButton />
                    </SideBarNav>
                  </SideBarContent>
                </SideBar>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <main className="h-full" id="mainContent">
                  <Outlet />
                </main>
              </ResizablePanel>
            </ResizablePanelGroup>
          ) : (
            <div className="flex h-full flex-col">
              <main className="grow" id="mainContent">
                <Outlet />
              </main>
              <MobileSideBar>
                <SideBarNav
                  links={sideBarLinks}
                  isCollapsed={isCollapsed}
                ></SideBarNav>
              </MobileSideBar>
            </div>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
}
