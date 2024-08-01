import { cn } from "@core/lib/utils";
import { buttonVariants } from "@core/components/ui/button";
import { ChevronDown } from "lucide-react";
import NavSubItems from "@core/components/sidebar/sidebar-nav-sub-item";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Text from "@core/components/ui/text";
import { SideBarLink } from "../../layouts/default";

interface NavItemProps {
  size?: "icon" | "sm";
  link: SideBarLink;
}

const NavItem = ({ size = "sm", link }: NavItemProps) => {
  const [subItemsOpen, setSubItemsOpen] = useState(false);
  const currentRoute = useLocation();
  const variant = currentRoute.pathname.includes(link.path)
    ? "default"
    : "ghost";

  return (
    <Link
      to={link.path}
      className={cn(
        buttonVariants({ variant: variant, size: size }),
        variant === "default" && "dark:text-white dark:hover:text-white",
        "justify-start hover:cursor-pointer rounded-full",
        size === "icon" && "justify-center"
      )}
      onMouseEnter={() => {
        setSubItemsOpen(true);
      }}
      onMouseLeave={() => {
        setSubItemsOpen(false);
      }}
    >
      <link.icon
        className={`${size === "icon" ? "" : "mr-2"} h-4 min-h-4 w-4 min-w-4`}
      />
      <div
        className={`${
          size === "icon" ? "" : "grow"
        } flex  items-center justify-between overflow-hidden`}
      >
        <Text
          className={`overflow-hidden ${size === "icon" ? "sr-only" : ""} `}
        >
          {link.title}
        </Text>
        {link.label && link.subItems && (
          <span
            className={cn(
              "ml-auto",
              variant === "default" && "text-background dark:text-white"
            )}
          >
            {link.label}
          </span>
        )}
        {size !== "icon" &&
          link.subItems &&
          (subItemsOpen ? (
            <ChevronDown className="ml-2 h-3 min-h-3 w-3 min-w-3 rotate-180 transition-all" />
          ) : (
            <ChevronDown className="ml-2 h-3 w-3 transition-all" />
          ))}
      </div>
    </Link>
  );
};

export default NavItem;
