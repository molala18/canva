"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isActive: boolean;
}

export const SideBarItem = ({
  icon: Icon,
  label,
  onClick,
  isActive,
}: SidebarItemProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full h-20 px-3 flex flex-col py-3 rounded-lg text-muted-foreground hover:text-foreground transition-colors",
        isActive && "bg-muted text-foreground"
      )}
      onClick={onClick}
    >
      <Icon className="size-5 stroke-2 shrink-0" />
      <span className="mt-1 text-xs font-medium">{label}</span>
    </Button>
  );
};
