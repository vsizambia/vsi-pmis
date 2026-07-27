import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


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



  return (

    <main className="p-8 bg-slate-100 min-h-screen">


      <h1 className="text-3xl font-bold text-[#001d3d]">
        Executive Secretariat Dashboard
      </h1>


      <p className="text-slate-600 mt-2">
        Real-time overview of programmes, projects, activities and performance indicators
      </p>




      <div className="grid md:grid-cols-4 gap-6 mt-8">



        <Card className="border-t-4 border-[#003566]">

          <CardHeader>
            <CardTitle>
              Registered Programmes
            </CardTitle>
          </CardHeader>

          <CardContent>

            <p className="text-5xl font-bold text-[#003566]">
              {programmes}
            </p>

          </CardContent>

        </Card>




        <Card className="border-t-4 border-[#ffc300]">

          <CardHeader>
            <CardTitle>
              Projects
            </CardTitle>
          </CardHeader>

          <CardContent>

            <p className="text-5xl font-bold text-[#001d3d]">
              {projects}
            </p>

          </CardContent>

        </Card>




        <Card className="border-t-4 border-[#ffd60a]">

          <CardHeader>
            <CardTitle>
              Activities
            </CardTitle>
          </CardHeader>

          <CardContent>

            <p className="text-5xl font-bold text-[#003566]">
              {activities}
            </p>

          </CardContent>

        </Card>




        <Card className="border-t-4 border-[#000814]">

          <CardHeader>
            <CardTitle>
              Indicators
            </CardTitle>
          </CardHeader>

          <CardContent>

            <p className="text-5xl font-bold text-[#000814]">
              {indicators}
            </p>

          </CardContent>

        </Card>


      </div>





      <div className="grid md:grid-cols-2 gap-6 mt-8">



        <Card>

          <CardHeader>
            <CardTitle>
              Programme Portfolio
            </CardTitle>
          </CardHeader>


          <CardContent>

            <div className="space-y-3">


              <Link
                href="/programmes"
                className="block p-3 rounded-lg bg-[#003566]/10 hover:bg-[#003566]/20"
              >
                View Programme Portfolio
              </Link>



              <Link
                href="/activities"
                className="block p-3 rounded-lg bg-[#ffc300]/20 hover:bg-[#ffc300]/30"
              >
                View Programme Activities
              </Link>


            </div>

          </CardContent>


        </Card>





        <Card>

          <CardHeader>
            <CardTitle>
              Quick Actions
            </CardTitle>
          </CardHeader>


          <CardContent>

            <div className="space-y-3">


              <Link
                href="/programmes/new"
                className="block text-center bg-[#003566] text-white rounded p-3"
              >
                Register Programme
              </Link>



              <Link
                href="/projects/new"
                className="block text-center bg-[#001d3d] text-white rounded p-3"
              >
                Create Project
              </Link>



              <Link
                href="/activities/new"
                className="block text-center bg-[#ffc300] text-[#000814] rounded p-3"
              >
                Add Activity
              </Link>


            </div>

          </CardContent>


        </Card>



      </div>


    </main>

  );
}