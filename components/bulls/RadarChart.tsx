"use client";

import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { BullStats } from "@/types/bulls";

interface RadarChartProps {
  stats: BullStats;
  size?: number;
}

const statLabels: Record<keyof BullStats, string> = {
  crecimiento: "Crec",
  facilidad_parto: "F.Parto",
  reproduccion: "Repro",
  moderacion: "Mod",
  carcasa: "Carc",
};

export default function RadarChart({ stats, size = 88 }: RadarChartProps) {
  const data = Object.entries(stats).map(([key, value]) => ({
    stat: statLabels[key as keyof BullStats],
    value,
    fullMark: 100,
  }));

  return (
    <div 
      className="rounded-full bg-[#F1F1F1] flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <PolarGrid 
            stroke="#36e27b" 
            strokeOpacity={0.3}
            gridType="polygon"
          />
          <PolarAngleAxis 
            dataKey="stat" 
            tick={false}
          />
          <Radar
            name="Stats"
            dataKey="value"
            stroke="#36e27b"
            fill="#36e27b"
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}