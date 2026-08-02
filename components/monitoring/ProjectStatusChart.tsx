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

type StatusData = {
  status: string;
  count: number;
};

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
  }
> = {
  ACTIVE: {
    label: "Active",
    color: "#16a34a",
  },
  PLANNED: {
    label: "Planned",
    color: "#2563eb",
  },
  COMPLETED: {
    label: "Completed",
    color: "#6b7280",
  },
  SUSPENDED: {
    label: "Suspended",
    color: "#dc2626",
  },
};

export default function ProjectStatusChart({
  data,
}: {
  data: StatusData[];
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">
          Project Status Distribution
        </h2>

        <p className="text-sm text-gray-500">
          Current implementation status across the project portfolio.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex h-[320px] items-center justify-center text-sm text-gray-500">
          No project status data available.
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
              dataKey="status"
              tickFormatter={(value: string) =>
                STATUS_CONFIG[value]?.label ?? value
              }
              tick={{
                fontSize: 12,
              }}
            />

            <YAxis
              allowDecimals={false}
              tick={{
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                fill: "rgba(0,0,0,0.05)",
              }}
              formatter={(value) => [
                Number(value ?? 0),
                "Projects",
              ]}
              labelFormatter={(label: ReactNode) =>
                STATUS_CONFIG[String(label)]?.label ??
                String(label)
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
                  key={entry.status}
                  fill={
                    STATUS_CONFIG[entry.status]?.color ??
                    "#2563eb"
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