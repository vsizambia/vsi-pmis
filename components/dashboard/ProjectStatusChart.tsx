"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
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

  const total = planned + ongoing + completed;


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


  const getPercentage = (value: number) => {
    if (total === 0) return 0;

    return Math.round((value / total) * 100);
  };


  return (
    <div className="bg-white rounded-lg shadow p-6">

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Project Portfolio Status
      </h2>


      <div className="relative">

        <ResponsiveContainer width="100%" height={320}>

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={3}
              label={({ name, value }) =>
                `${name}: ${value}`
              }
            >

              {data.map((entry, index) => (

                <Cell
                  key={`cell-${index}`}
                />

              ))}

            </Pie>


            <Tooltip />


            <Legend />

          </PieChart>

        </ResponsiveContainer>



        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

          <div className="text-center">

            <p className="text-3xl font-bold text-gray-900">
              {total}
            </p>

            <p className="text-sm text-gray-500">
              Total Projects
            </p>

          </div>

        </div>


      </div>



      <div className="grid grid-cols-3 gap-4 mt-4 text-center">


        <div>

          <p className="text-2xl font-bold text-gray-900">
            {getPercentage(planned)}%
          </p>

          <p className="text-sm text-gray-600">
            Planned
          </p>

        </div>



        <div>

          <p className="text-2xl font-bold text-gray-900">
            {getPercentage(ongoing)}%
          </p>

          <p className="text-sm text-gray-600">
            Ongoing
          </p>

        </div>



        <div>

          <p className="text-2xl font-bold text-gray-900">
            {getPercentage(completed)}%
          </p>

          <p className="text-sm text-gray-600">
            Completed
          </p>

        </div>


      </div>


    </div>
  );
}