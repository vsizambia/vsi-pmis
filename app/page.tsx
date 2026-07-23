export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-green-700 text-white p-6 shadow">
        <h1 className="text-3xl font-bold">
          VSI Programme Management Information System
        </h1>
        <p className="mt-2">
          Digital platform for programme planning, implementation,
          monitoring and reporting
        </p>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white shadow p-5">
          <nav className="space-y-4">
            <div className="font-semibold text-green-700">
              Dashboard
            </div>

            <div>
              Programmes
            </div>

            <div>
              Projects & Activities
            </div>

            <div>
              Monitoring & Evaluation
            </div>

            <div>
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

        {/* Main Dashboard */}
        <section className="flex-1 p-8">

          <h2 className="text-2xl font-bold mb-6">
            Executive Dashboard
          </h2>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">
                Active Programmes
              </h3>
              <p className="text-4xl font-bold text-green-700">
                6
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">
                Volunteers
              </h3>
              <p className="text-4xl font-bold text-green-700">
                120
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">
                Schools Reached
              </h3>
              <p className="text-4xl font-bold text-green-700">
                24
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-gray-500">
                Beneficiaries
              </h3>
              <p className="text-4xl font-bold text-green-700">
                3,500
              </p>
            </div>

          </div>


          {/* Programme Overview */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">

            <h3 className="text-xl font-bold mb-4">
              Programme Portfolio
            </h3>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-3">
                    Programme
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

                  <td className="p-3 text-green-700">
                    Active
                  </td>

                  <td className="p-3">
                    60%
                  </td>
                </tr>


                <tr>
                  <td className="p-3">
                    Community Volunteer Programme
                  </td>

                  <td className="p-3 text-yellow-600">
                    Planning
                  </td>

                  <td className="p-3">
                    30%
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

        </section>

      </div>

    </main>
  );
}