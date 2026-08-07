"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Sidebar() {

  const pathname = usePathname();


  const menuClass = (path: string) =>
    `
      block rounded-lg px-4 py-3 transition
      ${
        pathname === path
          ? "bg-[#003566] text-[#ffc300] font-semibold"
          : "hover:bg-[#001d3d] text-white"
      }
    `;


  return (
    <aside className="w-72 min-h-screen bg-[#000814] text-white flex flex-col">

      <div className="p-6 border-b border-[#003566]">

        <h1 className="text-2xl font-bold text-[#ffc300]">
          VSI-PMIS
        </h1>

        <p className="text-sm text-gray-300 mt-1">
          Programme Management Information System
        </p>

      </div>


      <nav className="p-4 space-y-2 flex-1">

        <Link
          href="/"
          className={menuClass("/")}
        >
          Executive Dashboard
        </Link>


        <Link
          href="/executive"
          className={menuClass("/executive")}
        >
          Executive Command Centre
        </Link>



        <p className="px-4 pt-5 pb-2 text-xs uppercase text-[#ffc300]">
          Programme Management
        </p>


        <Link
          href="/programmes"
          className={menuClass("/programmes")}
        >
          Programme Portfolio
        </Link>


        <Link
          href="/projects"
          className={menuClass("/projects")}
        >
          Projects
        </Link>


        <Link
          href="/activities"
          className={menuClass("/activities")}
        >
          Activities
        </Link>


        <Link
          href="/monitoring"
          className={menuClass("/monitoring")}
        >
          Monitoring, Evaluation & Learning
        </Link>


        <Link
          href="/beneficiaries"
          className={menuClass("/beneficiaries")}
        >
          Beneficiary Management
        </Link>


        <Link
          href="/volunteers"
          className={menuClass("/volunteers")}
        >
          Volunteer Management
        </Link>



        <p className="px-4 pt-5 pb-2 text-xs uppercase text-[#ffc300]">
          Knowledge & Reports
        </p>


        <Link
          href="/reports"
          className={menuClass("/reports")}
        >
          Reports
        </Link>


        <Link
          href="/documents"
          className={menuClass("/documents")}
        >
          Documents
        </Link>



        <p className="px-4 pt-5 pb-2 text-xs uppercase text-[#ffc300]">
          System
        </p>


        <Link
          href="/administration"
          className={menuClass("/administration")}
        >
          System Administration
        </Link>


      </nav>



      <div className="p-4 border-t border-[#003566]">

        <p className="text-sm text-gray-300">
          Visionary Students Initiative (VSI)
        </p>

        <p className="text-xs text-[#ffc300]">
          Sustainable Development Through Action
        </p>

      </div>


    </aside>
  );
}