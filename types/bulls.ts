export interface BullStats {
  crecimiento: number;
  facilidad_parto: number;
  reproduccion: number;
  moderacion: number;
  carcasa: number;
}

export interface Bull {
  id: number;
  caravana: string;
  nombre: string;
  bull_score: number;
  uso: 'vaquillona' | 'vaca';
  origen: 'propio' | 'catalogo';
  pelaje: 'negro' | 'colorado';
  raza: string;
  edad_meses: number;
  caracteristica_destacada: string | null;
  stats: BullStats;
}
