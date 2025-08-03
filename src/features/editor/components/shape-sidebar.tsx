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
  activeTool: ActiveTools;
  onChangeActiveTool: (tool: ActiveTools) => void;
}

export const ShapeSideBar = ({
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
          <ShapeTool icon={FaCircle} onClick={() => {}} />
          <ShapeTool icon={FaSquare} onClick={() => {}} />
          <ShapeTool icon={FaSquareFull} onClick={() => {}} />
          <ShapeTool icon={IoTriangle} onClick={() => {}} />
          <ShapeTool
            icon={IoTriangle}
            onClick={() => {}}
            iconClassName="rotate-180"
          />
          <ShapeTool icon={FaDiamond} onClick={() => {}} />
        </div>
      </ScrollArea>
      <ToolSideBarClose onClick={onClose} />
    </aside>
  );
};
