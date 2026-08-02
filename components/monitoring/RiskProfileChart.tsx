"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

import type { ReactNode } from "react";

type RiskLevel =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "CRITICAL";

type RiskData = {
  level: RiskLevel;
  count: number;
};

const RISK_CONFIG: Record<
  RiskLevel,
  {
    label: string;
    color: string;
  }
> = {
  LOW: {
    label: "Low Risk",
    color: "#16a34a",
  },
  MEDIUM: {
    label: "Medium Risk",
    color: "#f59e0b",
  },
  HIGH: {
    label: "High Risk",
    color: "#dc2626",
  },
  CRITICAL: {
    label: "Critical Risk",
    color: "#991b1b",
  },
};

export default function RiskProfileChart({
  data,
}: {
  data: RiskData[];
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Risk Profile
        </h2>

        <p className="text-sm text-gray-500">
          Distribution of projects by implementation risk level.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center text-sm text-gray-500">
          No risk data available.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={{
              top: 25,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <XAxis
              dataKey="level"
              tickFormatter={(value: string) =>
                RISK_CONFIG[value as RiskLevel]?.label ??
                value
              }
            />

            <YAxis
              allowDecimals={false}
            />

            <Tooltip
              formatter={(value) => [
                Number(value ?? 0),
                "Projects",
              ]}
              labelFormatter={(label: ReactNode) =>
                RISK_CONFIG[
                  String(label) as RiskLevel
                ]?.label ?? String(label)
              }
            />

            <Bar
              dataKey="count"
              radius={[8, 8, 0, 0]}
            >
              <LabelList
                dataKey="count"
                position="top"
              />

              {data.map((entry) => (
                <Cell
                  key={entry.level}
                  fill={
                    RISK_CONFIG[entry.level].color
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}