import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <main className="p-8 bg-slate-100 min-h-screen">
      <h1 className="text-3xl font-bold">
        VSI Programme Management Information System
      </h1>

      <p className="text-slate-600 mt-2">
        Executive Secretariat Dashboard
      </p>

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <Card>
          <CardHeader>
            <CardTitle>Registered Programmes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-blue-700">5</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-green-700">14</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Volunteers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-orange-600">126</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Beneficiaries</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-purple-700">3,840</p>
          </CardContent>
        </Card>

      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-8">

        <Card>
          <CardHeader>
            <CardTitle>Programme Portfolio</CardTitle>
          </CardHeader>

          <CardContent>

            <div className="space-y-3">

              <Link
                href="/programmes/civic-leadership"
                className="block p-3 rounded-lg bg-blue-50 hover:bg-blue-100"
              >
                Civic Leadership & Democratic Governance
              </Link>

              <Link
                href="/programmes"
                className="block p-3 rounded-lg bg-green-50 hover:bg-green-100"
              >
                All Registered Programmes
              </Link>

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>

          <CardContent>

            <div className="space-y-3">

              <button className="w-full bg-blue-700 text-white rounded p-3">
                Register Programme
              </button>

              <button className="w-full bg-green-700 text-white rounded p-3">
                Create Project
              </button>

              <button className="w-full bg-purple-700 text-white rounded p-3">
                Register Volunteer
              </button>

            </div>

          </CardContent>

        </Card>

      </div>
    </main>
  );
}