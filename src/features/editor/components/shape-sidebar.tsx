import { cn } from "@/lib/utils";
import { ActiveTools } from "../types";
import { ToolSideBarHeader } from "./tool-sidebarheader";
import { ToolSideBarClose } from "./tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShapeTool } from "./shape-tool";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";

interface ShapeSidebarProps {
  editor: any; // Replace with the actual type of your editor
  activeTool: ActiveTools;
  onChangeActiveTool: (tool: ActiveTools) => void;
}

export const ShapeSideBar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ShapeSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select"); // Reset to select tool when closing the sidebar
  };
  return (
    <aside
      className={cn(
        "bg-white border-r h-full relative flex flex-col w-[360px]",
        activeTool === "shapes" ? "visible" : "hidden"
      )}
    >
      <ToolSideBarHeader
        title="Shapes"
        description="Add Shapes To Your Canvas"
      />
      <ScrollArea>
        <div className="p-4 grid grid-cols-3 gap-4">
          <ShapeTool
            icon={FaCircle}
            onClick={() => {
              editor?.addCircle();
            }}
          />
          <ShapeTool
            icon={FaSquare}
            onClick={() => {
              editor?.addSquare();
            }}
          />
          <ShapeTool
            icon={FaSquareFull}
            onClick={() => {
              editor?.addSquareFull();
            }}
          />
          <ShapeTool
            icon={IoTriangle}
            onClick={() => {
              editor?.addTriangle();
            }}
          />
          <ShapeTool
            icon={IoTriangle}
            onClick={() => {
              editor?.addTriangleReversed();
            }}
            iconClassName="rotate-180"
          />
          <ShapeTool
            icon={FaDiamond}
            onClick={() => {
              editor?.addDiamond();
            }}
          />
        </div>
      </ScrollArea>
      <ToolSideBarClose onClick={onClose} />
    </aside>
  );
};
