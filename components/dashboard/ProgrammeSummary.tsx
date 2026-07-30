import type { Programme, Directorate } from "@prisma/client";


interface ProgrammeWithDirectorate extends Programme {
  directorate: Directorate;
}


interface ProgrammeSummaryProps {
  programmes: ProgrammeWithDirectorate[];
}


export default function ProgrammeSummary({
  programmes,
}: ProgrammeSummaryProps) {

  if (!programmes || programmes.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-6 text-center text-gray-500">
        No programmes registered yet.
      </div>
    );
  }


  return (
    <div className="space-y-4">

      {programmes.map((programme) => (

        <div
          key={programme.id}
          className="rounded-lg border bg-white p-5 shadow-sm"
        >

          <div className="flex items-start justify-between gap-4">

            <div>

              <h3 className="text-lg font-semibold text-gray-900">
                {programme.name}
              </h3>


              <p className="mt-1 text-sm text-gray-600">
                {programme.description || "No description available"}
              </p>

            </div>


            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              {programme.directorate?.name || "No Directorate"}
            </span>

          </div>


          <div className="mt-4 text-sm text-gray-500">

            {programme.startYear && programme.endYear ? (
              <span>
                Duration: {programme.startYear} - {programme.endYear}
              </span>
            ) : (
              <span>
                Duration not specified
              </span>
            )}

          </div>


        </div>

      ))}

    </div>
  );
}