export default function Programmes() {

  const programmes = [
    {
      name: "Civic Leadership and Democratic Governance Programme",
      directorate: "Directorate of Programmes",
      manager: "Programme Manager",
      status: "Active",
      period: "2026 - 2029",
    },
    {
      name: "Mental Resilience and Wellbeing Programme",
      directorate: "Directorate of Programmes",
      manager: "Programme Manager",
      status: "Active",
      period: "2026 - 2029",
    },
    {
      name: "Youth Development Programme",
      directorate: "Directorate of Programmes",
      manager: "Programme Manager",
      status: "Planning",
      period: "2026 - 2029",
    },
    {
      name: "Community Engagement Programme",
      directorate: "Directorate of Programmes",
      manager: "Programme Manager",
      status: "Planning",
      period: "2026 - 2029",
    },
    {
      name: "Communications and Advocacy Programme",
      directorate: "Directorate of Communications",
      manager: "Programme Manager",
      status: "Active",
      period: "2026 - 2029",
    },
  ];


  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <header className="bg-green-800 text-white p-6 rounded-lg shadow">

        <h1 className="text-3xl font-bold">
          Programme Portfolio
        </h1>

        <p className="mt-2">
          VSI Programme Management Information System
        </p>

      </header>


      <section className="mt-8 bg-white rounded-lg shadow p-6">

        <h2 className="text-xl font-bold mb-5">
          Registered Programmes
        </h2>


        <table className="w-full">

          <thead>
            <tr className="border-b text-left">

              <th className="p-3">
                Programme
              </th>

              <th className="p-3">
                Directorate
              </th>

              <th className="p-3">
                Programme Manager
              </th>

              <th className="p-3">
                Status
              </th>

              <th className="p-3">
                Period
              </th>

            </tr>
          </thead>


          <tbody>

            {programmes.map((programme, index) => (

              <tr key={index} className="border-b">

                <td className="p-3 font-medium">
                  {programme.name}
                </td>

                <td className="p-3">
                  {programme.directorate}
                </td>

                <td className="p-3">
                  {programme.manager}
                </td>

                <td className="p-3 text-green-700">
                  {programme.status}
                </td>

                <td className="p-3">
                  {programme.period}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </section>


    </main>
  );
}