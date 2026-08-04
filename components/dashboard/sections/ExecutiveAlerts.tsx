import {
  AlertCircle,
  AlertTriangle,
  Info,
  CheckCircle,
} from "lucide-react";

import type { ExecutiveAlert } from "@/types/dashboard";

interface ExecutiveAlertsProps {
  data: ExecutiveAlert[];
}

function getAlertStyle(
  severity: ExecutiveAlert["severity"],
) {
  switch (severity) {
    case "critical":
      return {
        icon: (
          <AlertCircle className="h-5 w-5 text-red-600" />
        ),
        style:
          "border-red-200 bg-red-50",
      };

    case "high":
      return {
        icon: (
          <AlertTriangle className="h-5 w-5 text-orange-600" />
        ),
        style:
          "border-orange-200 bg-orange-50",
      };

    case "medium":
      return {
        icon: (
          <Info className="h-5 w-5 text-yellow-600" />
        ),
        style:
          "border-yellow-200 bg-yellow-50",
      };

    default:
      return {
        icon: (
          <CheckCircle className="h-5 w-5 text-green-600" />
        ),
        style:
          "border-green-200 bg-green-50",
      };
  }
}

export default function ExecutiveAlerts({
  data,
}: ExecutiveAlertsProps) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Executive Alerts
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Items requiring leadership attention.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="text-sm text-green-700">
            No active alerts requiring executive attention.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((alert) => {
            const alertStyle = getAlertStyle(
              alert.severity,
            );

            return (
              <div
                key={alert.id}
                className={`flex items-start gap-4 rounded-lg border p-4 ${alertStyle.style}`}
              >
                <div>
                  {alertStyle.icon}
                </div>

                <div>
                  <h3 className="font-medium text-gray-900">
                    {alert.title}
                  </h3>

                  <p className="mt-1 text-sm text-gray-600">
                    {alert.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}