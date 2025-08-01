"use client";
import { Button } from "@/components/ui/button";
import Logo from "./logo";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  Download,
  MousePointerClick,
  Redo2,
  Undo2,
} from "lucide-react";
import { CiFileOn } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import { Hint } from "@/components/hint";
import { BsCloudCheck } from "react-icons/bs";
import { ActiveTools } from "../types";
import { on } from "events";
import { cn } from "@/lib/utils";

interface NavBarProps {
  activeTool?: ActiveTools;
  onChangeActiveTool: (tool: ActiveTools) => void; // Optional prop for active tool
}

export const NavBar = ({ activeTool, onChangeActiveTool }: NavBarProps) => {
  return (
    <nav className="w-full flex items-center h-[68px] p-4 gap-x-8 border-b">
      <Logo />
      <div className="w-full h-full gap-x-1 flex items-center">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <Button size="sm" variant="ghost">
              File
              <ChevronDown className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-60">
            <DropdownMenuItem
              className="flex items-center gap-x-2"
              onClick={() => alert("New File")} //TODO: Implement new file creation
            >
              <CiFileOn className=" size-8" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <Hint label="Select" sideOffset={10} side="bottom">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onChangeActiveTool("select")}
            className={cn(activeTool === "select" && "bg-gray-200")}
          >
            <MousePointerClick />
          </Button>
        </Hint>
        <Hint label="Undo" sideOffset={10} side="bottom">
          <Button variant="ghost" size="icon" onClick={() => {}} className="">
            <Undo2 />
          </Button>
        </Hint>
        <Hint label="Redo" sideOffset={10} side="bottom">
          <Button variant="ghost" size="icon" onClick={() => {}} className="">
            <Redo2 />
          </Button>
        </Hint>
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-x-2">
          <BsCloudCheck className="size-[20px] text-muted-foreground" />
          <div className="text-xs text-muted-foreground">Saved</div>
        </div>
        <div className="flex items-center ml-auto gap-x-4">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                Export
                <Download className="size-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => alert("New File")} //TODO: Implement new file creation
              >
                <CiFileOn className=" size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Save For Later Editing{" "}
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => alert("New File")} //TODO: Implement new file creation
              >
                <CiFileOn className=" size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Best For Sharing on the Web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => alert("New File")} //TODO: Implement new file creation
              >
                <CiFileOn className=" size-8" />
                <div>
                  <p>JPEG</p>
                  <p className="text-xs text-muted-foreground">
                    Best For Anything
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => alert("New File")} //TODO: Implement new file creation
              >
                <CiFileOn className=" size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Best For Anything SVg
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};
