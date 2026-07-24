"use client";

import { useEffect, useState } from "react";

type Directorate = {
  id: string;
  name: string;
  description?: string;
};

export default function DirectoratesPage() {
  const [directorates, setDirectorates] = useState<Directorate[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function loadDirectorates() {
    const response = await fetch("/api/directorates");
    const data = await response.json();

    setDirectorates(data);
  }

useEffect(() => {
  async function fetchDirectorates() {
    await loadDirectorates();
  }

  fetchDirectorates();
}, []);

  async function addDirectorate(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/directorates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });

    setName("");
    setDescription("");

    loadDirectorates();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Directorates
          </h1>

          <p className="text-gray-600 mt-2">
            Manage VSI organisational directorates.
          </p>
        </div>
      </div>


      <div className="bg-white rounded-lg shadow p-6 mb-8">

        <h2 className="text-xl font-semibold mb-4">
          Add New Directorate
        </h2>

        <form
          onSubmit={addDirectorate}
          className="space-y-4"
        >

          <input
            className="w-full border rounded p-3"
            placeholder="Directorate name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <textarea
            className="w-full border rounded p-3"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            className="bg-blue-600 text-white px-6 py-3 rounded"
            type="submit"
          >
            Save Directorate
          </button>

        </form>

      </div>


      <div className="bg-white rounded-lg shadow">

        <table className="w-full">

          <thead className="border-b">
            <tr>
              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Description
              </th>
            </tr>
          </thead>


          <tbody>

            {directorates.map((directorate) => (
              <tr
                key={directorate.id}
                className="border-b"
              >

                <td className="p-4 font-medium">
                  {directorate.name}
                </td>

                <td className="p-4 text-gray-600">
                  {directorate.description || "-"}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}