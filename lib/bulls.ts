import { BullStats } from "@/types/bulls";

/**
 * Rotates through the 3 available bull images based on ID
 * Used in: BullCard, BullCardCompact, BullDetailModal
 */
export const getBullImage = (id: number): string => {
  const imageIndex = (id % 3) + 1;
  return `/images/bulls/bull-${imageIndex}.png`;
};

/**
 * Returns the badge variant for bull origin
 * Used in: BullCard, BullCardCompact, BullDetailModal
 */
export const getOrigenBadgeVariant = (origen: "propio" | "catalogo") =>
  origen === "propio" ? "origin-propio" : "origin-catalogo";

/**
 * Returns the badge variant for bull usage type
 * Used in: BullCard, BullDetailModal
 */
export const getUsoBadgeVariant = (uso: "vaquillona" | "vaca") =>
  uso === "vaquillona" ? "uso-vaquillona" : "uso-vaca";

/**
 * Full labels for bull statistics
 * Used in: BullScoreDetail
 */
export const STAT_LABELS: Record<keyof BullStats, string> = {
  crecimiento: "Crecimiento",
  facilidad_parto: "Facilidad de parto",
  reproduccion: "Reproducción",
  carcasa: "Carcasa",
  moderacion: "Moderación",
};

/**
 * Short labels for bull statistics (used in charts)
 * Used in: RadarChart
 */
export const STAT_LABELS_SHORT: Record<keyof BullStats, string> = {
  crecimiento: "Crec",
  facilidad_parto: "F.Parto",
  reproduccion: "Repro",
  moderacion: "Mod",
  carcasa: "Carc",
};

/**
 * Returns the color class for stat bar based on value
 * Used in: BullScoreDetail
 */
export const getStatBarColor = (value: number): string => {
  if (value >= 70) return "bg-brand-green";
  if (value >= 40) return "bg-yellow-400";
  return "bg-red-500";
};

/**
 * Badge label mappings for origin and usage
 * Used in: BullCard, BullCardCompact, BullDetailModal
 */
export const ORIGEN_LABELS: Record<"propio" | "catalogo", string> = {
  propio: "Propio",
  catalogo: "Catálogo",
};

export const USO_LABELS: Record<"vaquillona" | "vaca", string> = {
  vaquillona: "Para vaquillona",
  vaca: "Para vaca",
};
