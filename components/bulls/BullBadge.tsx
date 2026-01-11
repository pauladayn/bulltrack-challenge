import { cn } from "@/lib/utils";

type BadgeVariant = "origin-propio" | "origin-catalogo" | "uso-vaquillona" | "uso-vaca" | "highlight";

interface BullBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  "origin-propio": "bg-brand-green-light border-brand-green text-[#43B75D]",
  "origin-catalogo": "bg-brand-green-light border-brand-green text-[#43B75D]",
  "uso-vaquillona": "bg-accent-blue-light border-accent-blue-border text-accent-blue",
  "uso-vaca": "bg-accent-blue-light border-accent-blue text-accent-blue",
  "highlight": "bg-brand-green-light border-brand-green text-[#43B75D]",
};

export default function BullBadge({ variant, children, className }: BullBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-4 py-1.5 rounded-lg border-[1.5px] text-[10px] font-semibold h-6",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}