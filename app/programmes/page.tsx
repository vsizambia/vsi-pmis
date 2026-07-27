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
      try {
        const response = await fetch("/api/programmes");
        const data = await response.json();

        setProgrammes(data);
      } catch (error) {
        console.error("Failed to load programmes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgrammes();
  }, []);

  return (
    <main className="p-8">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-vsi-navy">
          Programmes
        </h1>

        <Link
          href="/programmes/register"
          className="bg-vsi-yellow text-vsi-navy font-semibold px-5 py-2 rounded-lg hover:opacity-90"
        >
          Register Programme
        </Link>

      </div>


      {loading ? (

        <p className="text-gray-500">
          Loading programmes...
        </p>

      ) : programmes.length === 0 ? (

        <p className="text-gray-500">
          No programmes registered.
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {programmes.map((programme) => (

            <Link
              key={programme.id}
              href={`/programmes/${programme.id}`}
              className="block"
            >

              <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-vsi-yellow hover:shadow-xl transition cursor-pointer">

                <h2 className="text-xl font-bold text-vsi-navy">
                  {programme.name}
                </h2>


                <p className="mt-3 text-gray-600">
                  {programme.description}
                </p>


                <p className="mt-4 text-sm text-gray-500">
                  Period: {programme.startYear} - {programme.endYear}
                </p>


                <p className="mt-4 text-sm font-semibold text-vsi-navy">
                  View Programme →
                </p>

              </div>

            </Link>

          ))}

        </div>

      )}

    </main>
  );
}