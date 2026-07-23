import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">VSI-PMIS</h1>
        <p className="text-sm text-slate-400">
          Programme Management Information System
        </p>
      </div>

      <nav className="p-4 space-y-2">

        <Link
          href="/"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Executive Dashboard
        </Link>

        <Link
          href="/programmes"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Programme Portfolio
        </Link>

        <Link
          href="/activities"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Activities
        </Link>

        <Link
          href="/monitoring"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Monitoring & Evaluation
        </Link>

        <Link
          href="/beneficiaries"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Beneficiaries
        </Link>

        <Link
          href="/volunteers"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Volunteer Management
        </Link>

        <Link
          href="/reports"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Reports
        </Link>

        <Link
          href="/documents"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Documents
        </Link>

        <Link
          href="/administration"
          className="block rounded-lg px-4 py-3 hover:bg-slate-800"
        >
          Administration
        </Link>

      </nav>
    </aside>
  );
}