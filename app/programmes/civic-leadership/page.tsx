export default function CivicLeadershipProgramme() {

  const indicators = [
    {
      indicator: "Students trained in civic leadership",
      target: "5,000",
      achieved: "1,850",
      progress: "37%",
    },
    {
      indicator: "Schools reached",
      target: "50",
      achieved: "24",
      progress: "48%",
    },
    {
      indicator: "Volunteers engaged",
      target: "200",
      achieved: "120",
      progress: "60%",
    },
  ];


  return (

    <main className="min-h-screen bg-gray-100 p-8">


      <header className="bg-green-800 text-white p-6 rounded-lg shadow">

        <h1 className="text-3xl font-bold">
          Civic Leadership and Democratic Governance Programme
        </h1>

        <p className="mt-2">
          VSI Programme Profile | 2026 - 2029
        </p>

      </header>



      <section className="mt-8 grid md:grid-cols-3 gap-6">


        <div className="bg-white p-6 rounded-lg shadow">

          <h2 className="font-bold text-gray-500">
            Directorate
          </h2>

          <p className="mt-2">
            Directorate of Programmes
          </p>

        </div>



        <div className="bg-white p-6 rounded-lg shadow">

          <h2 className="font-bold text-gray-500">
            Programme Manager
          </h2>

          <p className="mt-2">
            Assigned Programme Manager
          </p>

        </div>



        <div className="bg-white p-6 rounded-lg shadow">

          <h2 className="font-bold text-gray-500">
            Status
          </h2>

          <p className="mt-2 text-green-700">
            Active
          </p>

        </div>


      </section>



      <section className="mt-8 bg-white p-6 rounded-lg shadow">

        <h2 className="text-xl font-bold mb-4">
          Programme Description
        </h2>


        <p>
          The Civic Leadership and Democratic Governance Programme
          strengthens young people's understanding of citizenship,
          national values and principles, democratic participation,
          leadership responsibility and community engagement.
        </p>


      </section>




      <section className="mt-8 bg-white p-6 rounded-lg shadow">

        <h2 className="text-xl font-bold mb-5">
          Key Performance Indicators
        </h2>


        <table className="w-full">


          <thead>

            <tr className="border-b text-left">

              <th className="p-3">
                Indicator
              </th>

              <th className="p-3">
                Target
              </th>

              <th className="p-3">
                Achieved
              </th>

              <th className="p-3">
                Progress
              </th>

            </tr>

          </thead>



          <tbody>

          {indicators.map((item,index)=>(

            <tr key={index} className="border-b">

              <td className="p-3">
                {item.indicator}
              </td>

              <td className="p-3">
                {item.target}
              </td>

              <td className="p-3">
                {item.achieved}
              </td>

              <td className="p-3 text-green-700">
                {item.progress}
              </td>

            </tr>

          ))}

          </tbody>


        </table>


      </section>



      <section className="mt-8 bg-white p-6 rounded-lg shadow">

        <h2 className="text-xl font-bold mb-4">
          Recent Activities
        </h2>


        <ul className="space-y-3">

          <li>
            ✓ Civic leadership training conducted in secondary schools
          </li>

          <li>
            ✓ Volunteer facilitators deployed
          </li>

          <li>
            ✓ Student engagement sessions completed
          </li>

        </ul>


      </section>


    </main>

  );

}