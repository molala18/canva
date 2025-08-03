import { ChevronsLeft } from "lucide-react";

interface ToolSideBarCloseProps {
  onClick: () => void;
}

export const ToolSideBarClose = ({ onClick }: ToolSideBarCloseProps) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 p-2 rounded-full bg-white hover:bg-gray-100 transition-colors group"
    >
      <ChevronsLeft className="size-4 group-hover:opacity-75 transition text-black" />
    </button>
  );
};
