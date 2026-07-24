"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Programme = {
  id: string;
  name: string;
  description: string | null;
  startYear: number;
  endYear: number;
};

export default function ProgrammesPage() {
  const [programmes, setProgrammes] = useState<Programme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgrammes() {
      const response = await fetch("/api/programmes");
      const data = await response.json();

      setProgrammes(data);
      setLoading(false);
    }

    fetchProgrammes();
  }, []);

  return (
    <main className="p-8">

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Programmes
        </h1>

        <Link
          href="/programmes/register"
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          Register Programme
        </Link>

      </div>


      {loading ? (
        <p>
          Loading programmes...
        </p>
      ) : (

        <div className="space-y-4">

          {programmes.map((programme) => (

            <div
              key={programme.id}
              className="border p-5 rounded"
            >

              <h2 className="text-xl font-semibold">
                {programme.name}
              </h2>

              <p>
                {programme.description}
              </p>

              <p className="text-sm mt-2">
                Period: {programme.startYear} - {programme.endYear}
              </p>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}