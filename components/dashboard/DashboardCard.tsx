import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: number;
  description?: string;
  icon: LucideIcon;
  href?: string;
  colour?: string;
}

export default function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  href,
  colour = "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100",
}: DashboardCardProps) {
  const content = (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-md
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>

        <div
          className={`
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-xl
            transition
            ${colour}
          `}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}