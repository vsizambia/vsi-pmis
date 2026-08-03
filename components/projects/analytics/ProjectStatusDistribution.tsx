"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type ProjectStatusDistributionProps = {
  data: {
    name: string;
    value: number;
  }[];
};

export default function ProjectStatusDistribution({
  data,
}: ProjectStatusDistributionProps) {
  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#003566]">
        Project Status Distribution
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Current implementation status across the portfolio.
      </p>

      <div className="mt-6 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {data.map((item) => (
                <Cell
                  key={item.name}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        {data.map((item) => (
          <div
            key={item.name}
            className="flex justify-between text-sm"
          >
            <span className="text-gray-600">
              {item.name}
            </span>

            <span className="font-semibold">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}