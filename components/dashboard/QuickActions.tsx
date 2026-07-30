import Link from "next/link";
import {
  FolderPlus,
  ClipboardPlus,
  FileBarChart2,
  Users,
} from "lucide-react";

const actions = [
  {
    title: "New Project",
    description: "Register a new project",
    href: "/projects/new",
    icon: FolderPlus,
    color: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    title: "New Activity",
    description: "Create an implementation activity",
    href: "/activities/new",
    icon: ClipboardPlus,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    title: "Reports",
    description: "View monitoring reports",
    href: "/reports",
    icon: FileBarChart2,
    color: "bg-violet-600 hover:bg-violet-700",
  },
  {
    title: "Beneficiaries",
    description: "Manage beneficiaries",
    href: "/beneficiaries",
    icon: Users,
    color: "bg-amber-600 hover:bg-amber-700",
  },
];

export default function QuickActions() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">
          Quick Actions
        </h2>

        <p className="text-sm text-slate-500">
          Frequently used shortcuts
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className={`${action.color} rounded-xl p-5 text-white transition duration-200`}
            >
              <Icon className="mb-4 h-8 w-8" />

              <h3 className="font-semibold">
                {action.title}
              </h3>

              <p className="mt-1 text-sm text-white/90">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}