"use server";

import { Bull } from "@/types/bulls";
import bullsData from "@/data/bulls_data.json";

// Simula un delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getBulls(): Promise<Bull[]> {
  // Simular latencia de API (300-500ms)
  await delay(300 + Math.random() * 200);
  
  return bullsData.bulls as Bull[];
}

export async function getBullById(id: number): Promise<Bull | null> {
  await delay(200);
  
  const bull = (bullsData.bulls as Bull[]).find((b) => b.id === id);
  return bull || null;
}