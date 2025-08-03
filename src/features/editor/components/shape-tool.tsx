import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon | IconType;
  onClick: () => void;
  iconClassName?: string;
}

export const ShapeTool = ({
  icon: Icon,
  onClick,
  iconClassName = "",
}: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn("aspect-square border rounded-md p-5")}
    >
      <Icon className={cn("h-full w-full", iconClassName)} />
    </button>
  );
};
