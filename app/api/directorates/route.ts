import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

  const directorates = await prisma.directorate.findMany({
    include:{
      programmes:true
    }
  });

  return NextResponse.json(directorates);

}


export async function POST(request: Request){

  const body = await request.json();


  const directorate = await prisma.directorate.create({

    data:{
      name: body.name,
      description: body.description
    }

  });


  return NextResponse.json(directorate);

}