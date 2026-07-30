"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";


interface ProjectStatusChartProps {
  planned: number;
  ongoing: number;
  completed: number;
}


export default function ProjectStatusChart({
  planned,
  ongoing,
  completed,
}: ProjectStatusChartProps) {


  const data = [
    {
      name: "Planned",
      value: planned,
    },
    {
      name: "Ongoing",
      value: ongoing,
    },
    {
      name: "Completed",
      value: completed,
    },
  ];


  const COLORS = [
    "#3b82f6",
    "#f59e0b",
    "#10b981",
  ];


  return (

    <div className="h-[340px] w-full">

      <ResponsiveContainer width="100%" height="100%">

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >

            {data.map((entry, index) => (

              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index]}
              />

            ))}

          </Pie>


          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );
}
