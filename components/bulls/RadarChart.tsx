"use client";

import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

import { BullStats } from "@/types/bulls";

import { STAT_LABELS_SHORT } from "@/lib/bulls";
import { RADAR_CHART } from "@/lib/constants";

interface RadarChartProps {
  stats: BullStats;
  size?: number;
}

export default function RadarChart({ 
  stats, 
  size = RADAR_CHART.DEFAULT_SIZE 
}: RadarChartProps) {
  const data = Object.entries(stats).map(([key, value]) => ({
    stat: STAT_LABELS_SHORT[key as keyof BullStats],
    value,
    fullMark: RADAR_CHART.FULL_MARK,
  }));

  return (
    <div
      className="rounded-full bg-bg-tertiary flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <PolarGrid
            stroke={RADAR_CHART.COLOR}
            strokeOpacity={0.3}
            gridType="polygon"
          />
          <PolarAngleAxis dataKey="stat" tick={false} />
          <Radar
            name="Stats"
            dataKey="value"
            stroke={RADAR_CHART.COLOR}
            fill={RADAR_CHART.COLOR}
            fillOpacity={0.3}
            strokeWidth={2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
