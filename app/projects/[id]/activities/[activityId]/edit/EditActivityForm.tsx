"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Activity = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  startDate: Date | null;
  endDate: Date | null;
};

export default function EditActivityForm({
  projectId,
  activity,
}: {
  projectId: string;
  activity: Activity;
}) {
  const router = useRouter();

  const [message, setMessage] = useState("");

  async function updateActivity(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const response = await fetch("/api/activities", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: activity.id,
        title: form.get("title"),
        description: form.get("description"),
        status: form.get("status"),
        startDate: form.get("startDate"),
        endDate: form.get("endDate"),
      }),
    });

    if (response.ok) {
      router.push(`/projects/${projectId}`);
      router.refresh();
    } else {
      setMessage("Failed to update activity");
    }
  }

  return (
    <form
      onSubmit={updateActivity}
      className="space-y-4"
    >
      <input
        name="title"
        defaultValue={activity.title}
        required
        className="border p-3 rounded w-full"
      />

      <textarea
        name="description"
        defaultValue={activity.description ?? ""}
        className="border p-3 rounded w-full"
      />

      <select
        name="status"
        defaultValue={activity.status}
        className="border p-3 rounded w-full"
      >
        <option value="Planned">
          Planned
        </option>

        <option value="In Progress">
          In Progress
        </option>

        <option value="Completed">
          Completed
        </option>

        <option value="Cancelled">
          Cancelled
        </option>
      </select>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="date"
          name="startDate"
          defaultValue={
            activity.startDate
              ? activity.startDate.toISOString().split("T")[0]
              : ""
          }
          className="border p-3 rounded"
        />

        <input
          type="date"
          name="endDate"
          defaultValue={
            activity.endDate
              ? activity.endDate.toISOString().split("T")[0]
              : ""
          }
          className="border p-3 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Update Activity
      </button>

      {message && (
        <p className="text-red-600">
          {message}
        </p>
      )}
    </form>
  );
}