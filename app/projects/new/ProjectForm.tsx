"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectForm({
  programmes,
}: {
  programmes: { id: string; name: string }[];
}) {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function submitProject(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    const form = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          programmeId: form.get("programmeId"),
          name: form.get("name"),
          description: form.get("description"),
          status: form.get("status"),
          budget: form.get("budget"),
          startDate: form.get("startDate"),
          endDate: form.get("endDate"),
        }),
      });


      if (response.ok) {
        router.push("/projects");
        router.refresh();
      } else {
        setMessage("Failed to create project");
      }

    } catch (error) {
      console.error(error);
      setMessage("An error occurred while saving project");

    } finally {
      setSaving(false);
    }
  }


  return (
    <form
      onSubmit={submitProject}
      className="space-y-4"
    >

      <select
        name="programmeId"
        required
        className="border p-3 w-full rounded"
      >
        <option value="">
          Select Programme
        </option>

        {programmes.map((programme) => (
          <option
            key={programme.id}
            value={programme.id}
          >
            {programme.name}
          </option>
        ))}

      </select>


      <input
        name="name"
        required
        placeholder="Project Name"
        className="border p-3 w-full rounded"
      />


      <textarea
        name="description"
        placeholder="Project Description"
        rows={4}
        className="border p-3 w-full rounded"
      />


      <select
        name="status"
        defaultValue="Planned"
        className="border p-3 w-full rounded"
      >

        <option value="Planned">
          Planned
        </option>

        <option value="Active">
          Active
        </option>

        <option value="Completed">
          Completed
        </option>

      </select>


      <div>
        <label className="block mb-2 font-medium">
          Budget (ZMW)
        </label>

        <input
          name="budget"
          type="number"
          min="0"
          placeholder="Enter budget in Zambian Kwacha"
          className="border p-3 w-full rounded"
        />
      </div>


      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="block mb-2 font-medium">
            Start Date
          </label>

          <input
            name="startDate"
            type="date"
            className="border p-3 rounded w-full"
          />

        </div>


        <div>
          <label className="block mb-2 font-medium">
            End Date
          </label>

          <input
            name="endDate"
            type="date"
            className="border p-3 rounded w-full"
          />

        </div>

      </div>


      <button
        type="submit"
        disabled={saving}
        className="bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded"
      >
        {saving ? "Saving..." : "Save Project"}
      </button>


      {message && (
        <p className="text-red-600">
          {message}
        </p>
      )}

    </form>
  );
}