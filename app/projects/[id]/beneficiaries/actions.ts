"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createBeneficiary(
  projectId: string,
  formData: FormData
) {
  const gender = formData.get("gender") as string;
  const age = Number(formData.get("age"));
  const number = Number(formData.get("number"));

  let ageGroup = "";

  if (age <= 17) {
    ageGroup = "Children (0-17)";
  } else if (age <= 35) {
    ageGroup = "Youth (18-35)";
  } else {
    ageGroup = "Adults (36+)";
  }

  await prisma.beneficiary.create({
    data: {
      projectId,
      gender,
      age,
      ageGroup,
      number,
    },
  });

  redirect(`/projects/${projectId}/beneficiaries`);
}