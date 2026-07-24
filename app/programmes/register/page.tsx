"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Directorate = {
  id: string;
  name: string;
};

type ProgrammeForm = {
  name: string;
  description: string;
  startYear: string;
  endYear: string;
  directorateId: string;
};

export default function RegisterProgramme() {
  const [directorates, setDirectorates] = useState<Directorate[]>([]);

  const [form, setForm] = useState<ProgrammeForm>({
    name: "",
    description: "",
    startYear: "2026",
    endYear: "2029",
    directorateId: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/directorates")
      .then((res) => res.json())
      .then((data: Directorate[]) => setDirectorates(data));
  }, []);

  async function submitProgramme(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/programmes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      setMessage("Programme registered successfully");

      setForm({
        name: "",
        description: "",
        startYear: "2026",
        endYear: "2029",
        directorateId: "",
      });
    } else {
      setMessage("Failed to register programme");
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Register New Programme
      </h1>

      <form
        onSubmit={submitProgramme}
        className="space-y-5 max-w-xl"
      >
        <input
          className="border p-3 w-full rounded"
          placeholder="Programme Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <textarea
          className="border p-3 w-full rounded"
          placeholder="Programme Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

        <input
          className="border p-3 w-full rounded"
          value={form.startYear}
          readOnly
        />

        <input
          className="border p-3 w-full rounded"
          value={form.endYear}
          readOnly
        />

        <select
          className="border p-3 w-full rounded"
          value={form.directorateId}
          onChange={(e) =>
            setForm({
              ...form,
              directorateId: e.target.value,
            })
          }
        >
          <option value="">
            Select Directorate
          </option>

          {directorates.map((directorate) => (
            <option
              key={directorate.id}
              value={directorate.id}
            >
              {directorate.name}
            </option>
          ))}
        </select>

        <Button type="submit">
          Save Programme
        </Button>
      </form>

      {message && (
        <p className="mt-5">
          {message}
        </p>
      )}
    </main>
  );
}