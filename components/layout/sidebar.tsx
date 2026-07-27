"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  Briefcase,
  BarChart3,
  FileText,
  Users,
  Settings,
} from "lucide-react";


const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Directorates",
    href: "/directorates",
    icon: Building2,
  },
  {
    name: "Programmes",
    href: "/programmes",
    icon: FolderKanban,
  },
  {
    name: "Projects",
    href: "/projects",
    icon: Briefcase,
  },
  {
    name: "Monitoring & Evaluation",
    href: "/m-e",
    icon: BarChart3,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
  },
  {
    name: "Users",
    href: "/users",
    icon: Users,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];


export default function Sidebar() {

  const pathname = usePathname();


  return (

    <aside className="w-72 min-h-screen bg-vsi-navy text-white shadow-xl">


      {/* Branding */}

      <div className="border-b border-vsi-blue p-6">

        <h1 className="text-2xl font-bold text-vsi-yellow">
          VSI-PMIS
        </h1>

        <p className="mt-2 text-sm text-blue-100">
          Programme Management Information System
        </p>

      </div>



      {/* Navigation */}

      <nav className="p-4 space-y-2">

        {menu.map((item) => {

          const Icon = item.icon;

          const active = pathname === item.href;


          return (

            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 rounded-lg px-4 py-3
                transition-all duration-200
                ${
                  active
                    ? "bg-vsi-yellow text-vsi-navy font-semibold shadow-md"
                    : "text-blue-100 hover:bg-vsi-blue hover:text-white"
                }
              `}
            >

              <Icon
                size={20}
                className={
                  active
                    ? "text-vsi-navy"
                    : "text-vsi-gold"
                }
              />

              <span>
                {item.name}
              </span>

            </Link>

          );

        })}

      </nav>



      {/* Footer */}

      <div className="absolute bottom-0 w-72 p-6 text-xs text-blue-200">

        Visionary Students Initiative

      </div>


    </aside>

  );
}