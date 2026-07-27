"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";


export async function createDirectorate(formData: FormData) {

  const name = formData.get("name") as string;

  const description = formData.get("description") as string;


  await prisma.directorate.create({

    data: {

      name,

      description,

    },

  });


  redirect("/directorates");

}