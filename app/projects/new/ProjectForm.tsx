"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProjectFormData = {
  id?: string;
  referenceNo?: string | null;
  code?: string | null;
  name?: string;
  description?: string | null;
  programmeId?: string;
  status?: string;
  priority?: string;
  riskLevel?: string;
  progress?: number;
  budget?: number | null;
  fundingSource?: string | null;
  donor?: string | null;
  projectManagerId?: string | null;
  startDate?: string | null;
  endDate?: string | null;
};

type Programme = {
  id: string;
  name: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

const STATUS_OPTIONS = [
  ["PLANNED", "Planned"],
  ["APPROVED", "Approved"],
  ["ACTIVE", "Active"],
  ["SUSPENDED", "Suspended"],
  ["COMPLETED", "Completed"],
  ["CLOSED", "Closed"],
  ["CANCELLED", "Cancelled"],
];

const PRIORITY_OPTIONS = [
  ["LOW", "Low"],
  ["MEDIUM", "Medium"],
  ["HIGH", "High"],
  ["CRITICAL", "Critical"],
];

const RISK_OPTIONS = [
  ["LOW", "Low"],
  ["MEDIUM", "Medium"],
  ["HIGH", "High"],
  ["CRITICAL", "Critical"],
];

function formatDate(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0];
}

export default function ProjectForm({
  programmes,
  users,
  project,
}: {
  programmes: Programme[];
  users: User[];
  project?: ProjectFormData;
}) {
  const router = useRouter();

  const isEdit = Boolean(project?.id);

  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function submitProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);
    setMessage("");

    const form = new FormData(e.currentTarget);

    const payload = {
      ...(project?.id ? { id: project.id } : {}),

      referenceNo: form.get("referenceNo") || null,
      code: form.get("code") || null,
      name: form.get("name"),
      description: form.get("description") || null,
      programmeId: form.get("programmeId"),

      status: form.get("status"),
      priority: form.get("priority"),
      riskLevel: form.get("riskLevel"),

      progress: form.get("progress")
        ? Number(form.get("progress"))
        : 0,

      budget: form.get("budget")
        ? Number(form.get("budget"))
        : null,

      fundingSource: form.get("fundingSource") || null,
      donor: form.get("donor") || null,
      projectManagerId: form.get("projectManagerId") || null,

      startDate: form.get("startDate") || null,
      endDate: form.get("endDate") || null,
    };

    try {
      const response = await fetch("/api/projects", {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        setMessage(
          result?.message ||
            (isEdit
              ? "Failed to update project"
              : "Failed to create project"),
        );
        return;
      }

      router.push(
        isEdit
          ? `/projects/${project?.id}`
          : "/projects",
      );

      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while saving the project.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={submitProject}
      className="space-y-8"
    >
      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          Project Identification
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Basic identification and classification of the project.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Reference Number
            </label>

            <input
              name="referenceNo"
              defaultValue={project?.referenceNo ?? ""}
              placeholder="e.g. VSI-2026-005"
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Project Code
            </label>

            <input
              name="code"
              defaultValue={project?.code ?? ""}
              placeholder="e.g. CLDG-002"
              className="w-full rounded border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Project Name *
            </label>

            <input
              name="name"
              required
              defaultValue={project?.name ?? ""}
              placeholder="Enter project name"
              className="w-full rounded border p-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              name="description"
              rows={4}
              defaultValue={project?.description ?? ""}
              placeholder="Describe the project, its purpose and intended results."
              className="w-full rounded border p-3"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          Programme and Management
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Programme *
            </label>

            <select
              name="programmeId"
              required
              defaultValue={project?.programmeId ?? ""}
              className="w-full rounded border p-3"
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
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Project Manager
            </label>

            <select
              name="projectManagerId"
              defaultValue={project?.projectManagerId ?? ""}
              className="w-full rounded border p-3"
            >
              <option value="">
                Not assigned
              </option>

              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name} — {user.email}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          Status, Priority and Risk
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              name="status"
              defaultValue={
                project?.status ?? "PLANNED"
              }
              className="w-full rounded border p-3"
            >
              {STATUS_OPTIONS.map(([value, label]) => (
                <option
                  key={value}
                  value={value}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Priority
            </label>

            <select
              name="priority"
              defaultValue={
                project?.priority ?? "MEDIUM"
              }
              className="w-full rounded border p-3"
            >
              {PRIORITY_OPTIONS.map(([value, label]) => (
                <option
                  key={value}
                  value={value}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Risk Level
            </label>

            <select
              name="riskLevel"
              defaultValue={
                project?.riskLevel ?? "LOW"
              }
              className="w-full rounded border p-3"
            >
              {RISK_OPTIONS.map(([value, label]) => (
                <option
                  key={value}
                  value={value}
                >
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Progress (%)
            </label>

            <input
              name="progress"
              type="number"
              min="0"
              max="100"
              step="0.1"
              defaultValue={project?.progress ?? 0}
              className="w-full rounded border p-3"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          Financial Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Project budget and funding information. Actual expenditure
          is captured separately through financial transactions.
        </p>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Budget (ZMW)
            </label>

            <input
              name="budget"
              type="number"
              min="0"
              step="0.01"
              defaultValue={project?.budget ?? ""}
              placeholder="0.00"
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Funding Source
            </label>

            <input
              name="fundingSource"
              defaultValue={
                project?.fundingSource ?? ""
              }
              placeholder="e.g. Grant, Internal Funding"
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Donor / Partner
            </label>

            <input
              name="donor"
              defaultValue={project?.donor ?? ""}
              placeholder="e.g. Strategic Partner"
              className="w-full rounded border p-3"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">
          Implementation Period
        </h2>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Start Date
            </label>

            <input
              name="startDate"
              type="date"
              defaultValue={formatDate(project?.startDate)}
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              End Date
            </label>

            <input
              name="endDate"
              type="date"
              defaultValue={formatDate(project?.endDate)}
              className="w-full rounded border p-3"
            />
          </div>
        </div>
      </section>

      {message && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {message}
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-green-600 px-6 py-3 font-medium text-white disabled:bg-gray-400"
        >
          {saving
            ? "Saving..."
            : isEdit
              ? "Update Project"
              : "Register Project"}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push(
              isEdit
                ? `/projects/${project?.id}`
                : "/projects",
            )
          }
          className="rounded border px-6 py-3 font-medium"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
