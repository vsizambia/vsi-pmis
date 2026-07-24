"use client";

import { useState } from "react";

export default function ActivityForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log({
      title,
      description,
    });

    alert("Activity captured successfully!");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block font-medium mb-1">
          Activity Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded-md w-full p-2"
          placeholder="Enter activity title"
          required
        />
      </div>

      <div>
        <label className="block font-medium mb-1">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-md w-full p-2"
          rows={5}
          placeholder="Describe the activity"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
      >
        Save Activity
      </button>
    </form>
  );
}