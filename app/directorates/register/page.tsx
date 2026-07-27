"use client";

import { FormEvent, useState } from "react";

export default function RegisterDirectorate() {
  const [message, setMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const response = await fetch("/api/directorates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: form.get("name"),
        description: form.get("description"),
      }),
    });

    if (response.ok) {
      setMessage("Directorate created successfully.");

      e.currentTarget.reset();
    } else {
      setMessage("Failed to create directorate.");
    }
  }

  return (
    <div className="p-8 max-w-xl">

      <h1 className="text-3xl font-bold mb-6 text-vsi-navy">
        Register Directorate
      </h1>

      <form
        onSubmit={submit}
        className="space-y-4 bg-white rounded-xl shadow p-6"
      >

        <div>
          <label className="block mb-2 font-medium">
            Directorate Name
          </label>

          <input
            name="name"
            required
            placeholder="Enter directorate name"
            className="border rounded-lg p-3 w-full"
          />
        </div>


        <div>
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            name="description"
            rows={4}
            placeholder="Enter description"
            className="border rounded-lg p-3 w-full"
          />
        </div>


        <button
          type="submit"
          className="bg-vsi-navy text-white px-6 py-3 rounded-lg hover:opacity-90"
        >
          Save Directorate
        </button>

      </form>


      {message && (
        <p className="mt-4 text-green-700 font-medium">
          {message}
        </p>
      )}

    </div>
  );
}