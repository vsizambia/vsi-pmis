import prisma from "@/lib/prisma";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default async function Dashboard() {

  const [
    programmes,
    projects,
    activities,
    indicators,

  ] = await Promise.all([

    prisma.programme.count(),

    prisma.project.count(),

    prisma.activity.count(),

    prisma.indicator.count(),

  ]);


  const statistics = [

    {
      title: "Registered Programmes",
      value: programmes,
      colour: "border-[#003566]",
      text: "text-[#003566]",
    },

    {
      title: "Projects",
      value: projects,
      colour: "border-[#ffc300]",
      text: "text-[#001d3d]",
    },

    {
      title: "Activities",
      value: activities,
      colour: "border-[#ffd60a]",
      text: "text-[#003566]",
    },

    {
      title: "Indicators",
      value: indicators,
      colour: "border-[#000814]",
      text: "text-[#000814]",
    },

  ];


  return (

    <main className="min-h-screen bg-slate-100 p-6 md:p-8">


      <section>

        <h1 className="text-3xl font-bold text-[#001d3d]">
          Executive Secretariat Dashboard
        </h1>


        <p className="mt-2 text-slate-600">
          Real-time overview of programmes, projects,
          activities and performance indicators.
        </p>

      </section>



      <section className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">


        {statistics.map((item) => (

          <Card
            key={item.title}
            className={`border-t-4 ${item.colour} shadow-sm`}
          >

            <CardHeader>

              <CardTitle className="text-sm text-slate-600">
                {item.title}
              </CardTitle>

            </CardHeader>


            <CardContent>

              <p
                className={`text-5xl font-bold ${item.text}`}
              >
                {item.value}
              </p>

            </CardContent>

          </Card>

        ))}


      </section>




      <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">


        <Card>

          <CardHeader>

            <CardTitle>
              Programme Portfolio
            </CardTitle>

          </CardHeader>


          <CardContent className="space-y-3">


            <Link
              href="/programmes"
              className="
                block rounded-lg
                bg-[#003566]/10
                p-3
                transition
                hover:bg-[#003566]/20
              "
            >
              View Programme Portfolio
            </Link>



            <Link
              href="/activities"
              className="
                block rounded-lg
                bg-[#ffc300]/20
                p-3
                transition
                hover:bg-[#ffc300]/30
              "
            >
              View Programme Activities
            </Link>


          </CardContent>

        </Card>





        <Card>

          <CardHeader>

            <CardTitle>
              Quick Actions
            </CardTitle>

          </CardHeader>


          <CardContent className="space-y-3">


            <Link
              href="/programmes/new"
              className="
                block rounded-lg
                bg-[#003566]
                p-3
                text-center
                text-white
                transition
                hover:bg-[#001d3d]
              "
            >
              Register Programme
            </Link>



            <Link
              href="/projects/new"
              className="
                block rounded-lg
                bg-[#001d3d]
                p-3
                text-center
                text-white
                transition
                hover:bg-[#000814]
              "
            >
              Create Project
            </Link>



            <Link
              href="/activities/new"
              className="
                block rounded-lg
                bg-[#ffc300]
                p-3
                text-center
                text-[#000814]
                transition
                hover:bg-[#ffd60a]
              "
            >
              Add Activity
            </Link>


          </CardContent>

        </Card>


      </section>


    </main>

  );

}