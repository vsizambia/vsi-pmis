import {
  FolderKanban,
  ClipboardCheck,
  Users,
  Target,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import type { RecentActivity as RecentActivityType } from "@/types/dashboard";

interface RecentActivityProps {
  data: RecentActivityType[];
}

function getModuleIcon(
  module: RecentActivityType["module"],
) {
  switch (module) {
    case "Project":
      return (
        <FolderKanban className="h-5 w-5 text-blue-600" />
      );

    case "Activity":
      return (
        <ClipboardCheck className="h-5 w-5 text-green-600" />
      );

    case "Beneficiary":
      return (
        <Users className="h-5 w-5 text-purple-600" />
      );

    case "Indicator":
      return (
        <Target className="h-5 w-5 text-orange-600" />
      );

    case "Governance":
      return (
        <ShieldCheck className="h-5 w-5 text-red-600" />
      );

    case "Finance":
      return (
        <Wallet className="h-5 w-5 text-emerald-600" />
      );

    default:
      return null;
  }
}

export default function RecentActivity({
  data,
}: RecentActivityProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Latest updates across the VSI-PMIS platform.
        </p>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-gray-500">
          Recent activities will appear here once system events
          are recorded.
        </p>
      ) : (
        <div className="space-y-4">
          {data.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 rounded-lg border border-gray-100 p-4"
            >
              <div className="rounded-lg bg-gray-100 p-2">
                {getModuleIcon(activity.module)}
              </div>

              <div>
                <h3 className="font-medium text-gray-900">
                  {activity.title}
                </h3>

                <p className="mt-1 text-sm text-gray-600">
                  {activity.description}
                </p>

                <p className="mt-2 text-xs text-gray-500">
                  {activity.createdAt.toLocaleDateString(
                    "en-ZM",
                    {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}