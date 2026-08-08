"use client";

import { FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

type Directorate = {
  id: string;
  code: string | null;
  name: string;
};

export default function RegisterProgramme() {
  const [directorates, setDirectorates] = useState<Directorate[]>([]);

  const [form, setForm] = useState({
    code: "",
    name: "",
    theme: "",
    description: "",
    startYear: "2026",
    endYear: "2030",
    budgetCeiling: "",
    currency: "ZMW",
    status: "ACTIVE",
    directorateId: "",
  });

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/directorates")
      .then((res) => res.json())
      .then((data: Directorate[]) => setDirectorates(data))
      .catch(() => setMessage("Failed to load directorates."));
  }, []);

  async function submitProgramme(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/programmes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (response.ok) {
        setMessage("Programme registered successfully.");

        setForm({
          code: "",
          name: "",
          theme: "",
          description: "",
          startYear: "2026",
          endYear: "2030",
          budgetCeiling: "",
          currency: "ZMW",
          status: "ACTIVE",
          directorateId: "",
        });
      } else {
        setMessage(data?.message || "Failed to register programme.");
      }
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while registering the programme.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-vsi-navy">
        Register New Programme
      </h1>

      <form
        onSubmit={submitProgramme}
        className="space-y-5 bg-white rounded-xl shadow p-6"
      >
        <div>
          <label className="block mb-2 font-medium">
            Programme Code
          </label>

          <input
            required
            className="border p-3 w-full rounded"
            placeholder="e.g. CLDG"
            value={form.code}
            onChange={(e) =>
              setForm({
                ...form,
                code: e.target.value.toUpperCase(),
              })
            }
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Programme Name
          </label>

          <input
            required
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
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Programme Theme
          </label>

          <input
            className="border p-3 w-full rounded"
            placeholder="Strategic theme"
            value={form.theme}
            onChange={(e) =>
              setForm({
                ...form,
                theme: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            className="border p-3 w-full rounded"
            placeholder="Programme description"
            rows={4}
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">
              Start Year
            </label>

            <input
              required
              type="number"
              min="2000"
              className="border p-3 w-full rounded"
              value={form.startYear}
              onChange={(e) =>
                setForm({
                  ...form,
                  startYear: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              End Year
            </label>

            <input
              required
              type="number"
              min="2000"
              className="border p-3 w-full rounded"
              value={form.endYear}
              onChange={(e) =>
                setForm({
                  ...form,
                  endYear: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Budget Ceiling (ZMW)
          </label>

          <input
            type="number"
            min="0"
            className="border p-3 w-full rounded"
            placeholder="Optional programme budget ceiling"
            value={form.budgetCeiling}
            onChange={(e) =>
              setForm({
                ...form,
                budgetCeiling: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Directorate
          </label>

          <select
            required
            className="border p-3 w-full rounded"
            value={form.directorateId}
            onChange={(e) =>
              setForm({
                ...form,
                directorateId: e.target.value,
              })
            }
          >
            <option value="">Select Directorate</option>

            {directorates.map((directorate) => (
              <option
                key={directorate.id}
                value={directorate.id}
              >
                {directorate.code
                  ? `${directorate.code} — ${directorate.name}`
                  : directorate.name}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Programme"}
        </Button>
      </form>

      {message && (
        <p className="mt-5 font-medium">
          {message}
        </p>
      )}
    </main>
  );
}
