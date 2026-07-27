import prisma from "@/lib/prisma";
import ActivityEditForm from "./ActivityEditForm";

export default async function EditActivityPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } = await params;


  const activity = await prisma.activity.findUnique({
    where: {
      id,
    },
  });


  if (!activity) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-bold">
          Activity Not Found
        </h1>
      </div>
    );
  }


  return (
    <div className="p-8 space-y-6">

      <h1 className="text-3xl font-bold">
        Edit Activity
      </h1>

      <ActivityEditForm activity={activity} />

    </div>
  );
}