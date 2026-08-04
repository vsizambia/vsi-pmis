"use client";

import { RefreshCw, Download } from "lucide-react";

interface ExecutiveHeaderProps {
  title?: string;
  subtitle?: string;
  lastUpdated?: Date;
}

export default function ExecutiveHeader({
  title = "Executive Dashboard",
  subtitle = "Enterprise Project Management Information System",
  lastUpdated = new Date(),
}: ExecutiveHeaderProps) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">
          Welcome back
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          {subtitle}
        </p>

        <p className="mt-3 text-xs text-gray-500">
          Last updated{" "}
          {lastUpdated.toLocaleDateString("en-ZM", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}{" "}
          at{" "}
          {lastUpdated.toLocaleTimeString("en-ZM", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>

        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white opacity-60"
        >
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>
    </div>
  );
}