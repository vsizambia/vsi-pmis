import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      {/* Top Header */}
      <header className="bg-green-800 text-white p-6 shadow">
        <div>
          <h1 className="text-3xl font-bold">
            VSI Programme Management Information System
          </h1>
          <p className="mt-2 text-green-100">
            Secretariat Executive Dashboard | Reporting Period 2026 - 2029
          </p>
        </div>
      </header>


      <div className="flex">

        {/* Sidebar */}
        <aside className="w-72 bg-white min-h-screen shadow p-6">

          <h2 className="text-lg font-bold text-green-800 mb-6">
            VSI Secretariat
          </h2>

          <nav className="space-y-4 text-gray-700">

            <div className="font-semibold text-green-700">
              Dashboard
            </div>

            <div>
              Directorates
            </div>

            <div className="ml-4">
              • Directorate of Programmes
            </div>

            <div className="mt-5 font-semibold">
  Programmes
</div>

<Link 
  href="/programmes"
  className="ml-4 block hover:text-green-700"
>
  • Programme Portfolio
</Link>

<div className="ml-4">
  • Civic Leadership & Democratic Governance
</div>

<div className="ml-4">
  • Mental Resilience Programme
</div>

<div className="ml-4">
  • Youth Development
</div>

<div className="ml-4">
  • Community Engagement
</div>


            <div className="mt-5">
              Volunteer Management
            </div>

            <div>
              Reports
            </div>

            <div>
              Administration
            </div>

          </nav>

        </aside>



        {/* Main Content */}
        <section className="flex-1 p-8">


          <h2 className="text-2xl font-bold mb-6">
            Executive Overview
          </h2>


          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">


            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">
                Active Programmes
              </p>
              <h3 className="text-4xl font-bold text-green-700">
                4
              </h3>
            </div>


            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">
                Volunteers Engaged
              </p>
              <h3 className="text-4xl font-bold text-green-700">
                120
              </h3>
            </div>


            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">
                Schools Reached
              </p>
              <h3 className="text-4xl font-bold text-green-700">
                24
              </h3>
            </div>


            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">
                Activities Completed
              </p>
              <h3 className="text-4xl font-bold text-green-700">
                86
              </h3>
            </div>


            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">
                Beneficiaries Reached
              </p>
              <h3 className="text-4xl font-bold text-green-700">
                3,500
              </h3>
            </div>


            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-500">
                Reports Submitted
              </p>
              <h3 className="text-4xl font-bold text-green-700">
                18
              </h3>
            </div>


          </div>



          {/* Programme Performance */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">

            <h3 className="text-xl font-bold mb-5">
              Programme Performance
            </h3>


            <table className="w-full">

              <thead>
                <tr className="border-b text-left">
                  <th className="p-3">
                    Programme
                  </th>

                  <th className="p-3">
                    Manager
                  </th>

                  <th className="p-3">
                    Status
                  </th>

                  <th className="p-3">
                    Progress
                  </th>

                </tr>
              </thead>


              <tbody>

                <tr className="border-b">
                  <td className="p-3">
                    Civic Leadership & Democratic Governance
                  </td>
                  <td className="p-3">
                    Programme Manager
                  </td>
                  <td className="p-3 text-green-700">
                    Active
                  </td>
                  <td className="p-3">
                    75%
                  </td>
                </tr>


                <tr className="border-b">
                  <td className="p-3">
                    Mental Resilience Programme
                  </td>
                  <td className="p-3">
                    Programme Manager
                  </td>
                  <td className="p-3 text-green-700">
                    Active
                  </td>
                  <td className="p-3">
                    60%
                  </td>
                </tr>


              </tbody>

            </table>

          </div>




          {/* Activity Monitoring */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">

            <h3 className="text-xl font-bold mb-5">
              Recent Activities
            </h3>


            <ul className="space-y-3">

              <li>
                ✓ Student civic leadership training conducted in Lusaka schools
              </li>

              <li>
                ✓ Volunteer engagement session completed
              </li>

              <li>
                ✓ Programme monitoring visit scheduled
              </li>

            </ul>

          </div>



        </section>

      </div>

    </main>
  );
}