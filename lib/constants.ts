import { BarChart3, TrendingUp, Star } from "lucide-react";
import { LucideIcon } from "lucide-react";

// Onboarding Modal Features
export interface OnboardingFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ONBOARDING_FEATURES: OnboardingFeature[] = [
  {
    icon: BarChart3,
    title: "Ranking inteligente",
    description: "Ordenado automáticamente por tu Bull Track Score personal.",
  },
  {
    icon: TrendingUp,
    title: "Análisis profundo",
    description: "Indicadores productivos clave visibles a primera vista.",
  },
  {
    icon: Star,
    title: "Herramientas",
    description: "Filtros avanzados, comparador de toros y detalles genéticos.",
  },
];

// Storage Keys
export const STORAGE_KEYS = {
  ONBOARDING_DISMISSED: "onboarding-dismissed",
  FAVORITES: "bulltrack-favorites",
} as const;

// Ranking Criteria (RankingCriteria component)
export const RANKING_CRITERIA = [
  { name: "Crecimiento", weight: 30, colorVar: "var(--criteria-green-1)" },
  { name: "Habilidad materna", weight: 30, colorVar: "var(--criteria-green-2)" },
  { name: "Fertilidad", weight: 30, colorVar: "var(--criteria-green-3)" },
] as const;

// Color Guide (RankingCriteria component)
export const COLOR_GUIDE = [
  {
    color: "bg-brand-green",
    label: "Excelente (Top 25%)",
    description: "Superior al promedio de la raza",
  },
  {
    color: "bg-yellow-400",
    label: "Promedio / Normal",
    description: "Dentro de la desviación estándar (#1)",
  },
  {
    color: "bg-red-500",
    label: "Inferior / Alerta",
    description: "Impacto negativo en el objetivo (Bottom 25%)",
  },
] as const;

// Placeholder badges for Sidebar active filters
export const ACTIVE_FILTER_BADGES = ["Badge", "Badge", "Badge", "Badge"] as const;