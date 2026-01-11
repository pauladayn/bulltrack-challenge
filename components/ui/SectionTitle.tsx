import { cn } from "@/lib/utils";

interface SectionTitleProps {
  children: React.ReactNode;
  size?: "sm" | "md";
  className?: string;
}

export default function SectionTitle({ 
  children, 
  size = "md",
  className 
}: SectionTitleProps) {
  const sizeClasses = size === "sm" 
    ? "text-[12px]" 
    : "text-[14px]";

  return (
    <p 
      className={cn(
        sizeClasses,
        "font-medium text-white uppercase tracking-wider",
        className
      )}
    >
      {children}
    </p>
  );
}
