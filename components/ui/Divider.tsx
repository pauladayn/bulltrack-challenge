import { cn } from "@/lib/utils";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export default function Divider({ 
  orientation = "horizontal", 
  className 
}: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === "horizontal" 
          ? "w-full h-px" 
          : "w-px h-24 self-center shrink-0",
        "bg-divider",
        className
      )}
    />
  );
}
