"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";


type ProgrammeProgress = {
  name: string;
  projects: number;
};


interface ProgrammeProgressChartProps {
  data: ProgrammeProgress[];
}


export default function ProgrammeProgressChart({
  data,
}: ProgrammeProgressChartProps) {

  return (
    <div className="h-[350px] w-full">

      <ResponsiveContainer width="100%" height="100%">

        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 20,
            left: 20,
            bottom: 10,
          }}
        >

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            allowDecimals={false}
          />

          <YAxis
            type="category"
            dataKey="name"
            width={160}
          />

          <Tooltip />

          <Bar
            dataKey="projects"
            radius={[0, 8, 8, 0]}
            fill="#059669"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}