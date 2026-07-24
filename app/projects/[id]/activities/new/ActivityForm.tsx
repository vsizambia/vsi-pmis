"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function ActivityForm({
  projectId,
}: {
  projectId: string;
}) {

  const router = useRouter();

  const [message, setMessage] = useState("");


  async function submitActivity(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();


    const form = new FormData(e.currentTarget);


    const response = await fetch("/api/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        projectId,
        title: form.get("title"),
        description: form.get("description"),
        status: form.get("status"),
        startDate: form.get("startDate"),
        endDate: form.get("endDate"),
      }),
    });


    if (response.ok) {
      router.push(`/projects/${projectId}`);
    } else {
      setMessage("Failed to create activity");
    }

  }


  return (
    <form
      onSubmit={submitActivity}
      className="space-y-4"
    >

      <input
        name="title"
        required
        placeholder="Activity Title"
        className="border p-3 w-full rounded"
      />


      <textarea
        name="description"
        placeholder="Activity Description"
        className="border p-3 w-full rounded"
      />


      <select
        name="status"
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


      <div className="grid grid-cols-2 gap-4">

        <input
          name="startDate"
          type="date"
          className="border p-3 rounded"
        />


        <input
          name="endDate"
          type="date"
          className="border p-3 rounded"
        />

      </div>


      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 rounded"
      >
        Save Activity
      </button>


      {message && (
        <p className="text-red-600">
          {message}
        </p>
      )}

    </form>
  );
}