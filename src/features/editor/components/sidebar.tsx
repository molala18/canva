"use client";

import React from "react";
import { SideBarItem } from "./sidebar-item";
import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Presentation,
  Settings,
  Shapes,
  Sparkle,
  Type,
} from "lucide-react";
import { ActiveTools } from "../types";

interface SidebarProps {
  activeTool: ActiveTools;
  onChangeActiveTool: (tool: ActiveTools) => void;
}

const SideBar = ({ activeTool, onChangeActiveTool }: SidebarProps) => {
  return (
    <aside className="w-[100px] overflow-y-auto flex flex-col h-full bg-white border-r">
      <ul className="flex flex-col gap-y-1 p-2">
        <SideBarItem
          icon={LayoutTemplate}
          label="Design"
          onClick={() => onChangeActiveTool("design")}
          isActive={activeTool === "design"}
        />
        <SideBarItem
          icon={ImageIcon}
          label="Image"
          onClick={() => onChangeActiveTool("images")}
          isActive={activeTool === "images"}
        />
        <SideBarItem
          icon={Type}
          label="Text"
          onClick={() => onChangeActiveTool("text")}
          isActive={activeTool === "text"}
        />
        <SideBarItem
          icon={Shapes}
          label="Shapes"
          onClick={() => onChangeActiveTool("shapes")}
          isActive={activeTool === "shapes"}
        />
        <SideBarItem
          icon={Sparkle}
          label="AI"
          onClick={() => onChangeActiveTool("ai")}
          isActive={activeTool === "ai"}
        />
        <SideBarItem
          icon={Settings}
          label="Settings"
          onClick={() => onChangeActiveTool("settings")}
          isActive={activeTool === "settings"}
        />
      </ul>
    </aside>
  );
};

export default SideBar;
