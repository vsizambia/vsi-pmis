"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ExpenditureForm({
  projectId,
}: {
  projectId: string;
}) {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    const form = new FormData(
      event.currentTarget,
    );

    try {
      const response = await fetch(
        `/api/projects/${projectId}/expenditure`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            transactionDate:
              form.get("transactionDate"),
            amount: form.get("amount"),
            category: form.get("category"),
            description:
              form.get("description"),
            reference:
              form.get("reference"),
            fundingSource:
              form.get("fundingSource"),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Failed to record expenditure",
        );
        return;
      }

      event.currentTarget.reset();
      setMessage(
        "Expenditure recorded successfully.",
      );

      router.refresh();
    } catch (error) {
      console.error(error);

      setMessage(
        "An error occurred while recording expenditure.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-xl bg-white p-6 shadow">
      <h2 className="text-xl font-semibold">
        Record Expenditure
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Capture an actual project expenditure
        transaction.
      </p>

      <form
        onSubmit={submit}
        className="mt-6 grid gap-5 md:grid-cols-2"
      >
        <div>
          <label className="mb-2 block font-medium">
            Transaction Date
          </label>

          <input
            name="transactionDate"
            type="date"
            required
            defaultValue={
              new Date()
                .toISOString()
                .split("T")[0]
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Amount (ZMW)
          </label>

          <input
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            required
            placeholder="Enter amount"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            name="category"
            required
            className="w-full rounded-lg border p-3"
          >
            <option value="">
              Select category
            </option>
            <option value="Personnel">
              Personnel
            </option>
            <option value="Transport">
              Transport
            </option>
            <option value="Training">
              Training
            </option>
            <option value="Equipment">
              Equipment
            </option>
            <option value="Supplies">
              Supplies
            </option>
            <option value="Communication">
              Communication
            </option>
            <option value="Venue">
              Venue
            </option>
            <option value="Construction">
              Construction
            </option>
            <option value="Administration">
              Administration
            </option>
            <option value="Other">
              Other
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Funding Source
          </label>

          <input
            name="fundingSource"
            placeholder="e.g. Grant, Internal Funding"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Reference
          </label>

          <input
            name="reference"
            placeholder="Receipt, voucher or transaction reference"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Description
          </label>

          <input
            name="description"
            required
            placeholder="What was the expenditure for?"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-vsi-navy px-6 py-3 font-medium text-white disabled:bg-gray-400"
          >
            {saving
              ? "Recording..."
              : "Record Expenditure"}
          </button>
        </div>

        {message && (
          <p className="md:col-span-2 text-sm">
            {message}
          </p>
        )}
      </form>
    </section>
  );
}
