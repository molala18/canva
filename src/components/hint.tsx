import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface HintProps {
  label: string;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  alignOffset?: number;
}

export const Hint = ({
  label,
  children,
  align,
  side,
  sideOffset,
  alignOffset,
}: HintProps) => {
  return (
    <Tooltip delayDuration={100}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="text-white bg-slate-800 border-slate-800"
      >
        <p className="font-semibold capitalize">{label}</p>
      </TooltipContent>
    </Tooltip>
  );
};
