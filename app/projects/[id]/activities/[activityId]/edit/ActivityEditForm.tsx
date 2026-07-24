import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditActivityForm from "./EditActivityForm";

export default async function EditActivityPage({
  params,
}: {
  params: Promise<{
    id: string;
    activityId: string;
  }>;
}) {
  const { id, activityId } = await params;

  const activity = await prisma.activity.findUnique({
    where: {
      id: activityId,
    },
  });

  if (!activity) {
    notFound();
  }

  return (
    <main className="max-w-3xl p-8">
      <h1 className="text-3xl font-bold mb-6">
        Edit Activity
      </h1>

      <EditActivityForm
        projectId={id}
        activity={activity}
      />
    </main>
  );
}