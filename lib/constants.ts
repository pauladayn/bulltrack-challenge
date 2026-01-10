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
} as const;