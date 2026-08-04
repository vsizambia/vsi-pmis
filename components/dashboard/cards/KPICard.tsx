import { ReactNode } from "react";
import Link from "next/link";

import type { TrendDirection, StatusColor } from "@/types/dashboard";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;

  icon?: ReactNode;

  trend?: TrendDirection;
  trendValue?: string;

  statusColor?: StatusColor;

  href?: string;
}

const statusStyles: Record<StatusColor, string> = {
  primary: "border-blue-200",
  success: "border-green-200",
  warning: "border-yellow-200",
  danger: "border-red-200",
  info: "border-sky-200",
  secondary: "border-gray-200",
};

function CardContent({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  statusColor = "primary",
}: KPICardProps) {
  return (
    <div
      className={`rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md ${statusStyles[statusColor]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </p>

          {subtitle && (
            <p className="mt-2 text-sm text-gray-600">
              {subtitle}
            </p>
          )}

          {trendValue && (
            <p
              className={`mt-3 text-sm ${
                trend === "up"
                  ? "text-green-600"
                  : trend === "down"
                    ? "text-red-600"
                    : "text-gray-500"
              }`}
            >
              {trendValue}
            </p>
          )}
        </div>

        {icon && (
          <div className="rounded-lg bg-gray-100 p-3">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export default function KPICard(props: KPICardProps) {
  if (props.href) {
    return (
      <Link href={props.href}>
        <CardContent {...props} />
      </Link>
    );
  }

  return <CardContent {...props} />;
}