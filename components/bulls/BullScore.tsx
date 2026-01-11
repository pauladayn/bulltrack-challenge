import { cn } from "@/lib/utils";

interface BullScoreProps {
  score: number;
  highlight?: string | null;
  className?: string;
}

export default function BullScore({ score, highlight, className }: BullScoreProps) {
  // Normalizar score a porcentaje (asumiendo max 100)
  const percentage = Math.min(score, 100);
  
  // Formatear score para display (ej: 90 -> 0.9)
  const displayScore = (score / 100).toFixed(1);

  return (
    <div className={cn("flex flex-col gap-2 flex-1", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary uppercase tracking-wider">
          Bull score
        </span>
        <span className="text-2xl font-semibold text-text-primary">
          {displayScore}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-[#F1F1F1] rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-green rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Highlight text */}
      {highlight && (
        <p className="text-base text-text-primary">
          {highlight}
        </p>
      )}
    </div>
  );
}