type ProgressPerformanceProps = {
  averageProgress: number;
};

export default function ProgressPerformance({
  averageProgress,
}: ProgressPerformanceProps) {
  let status = "Needs Attention";

  if (averageProgress >= 75) {
    status = "Strong Performance";
  } else if (averageProgress >= 50) {
    status = "Moderate Performance";
  }

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[#003566]">
        Implementation Performance
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Average implementation progress across the project portfolio.
      </p>

      <div className="mt-6 flex flex-col items-center justify-center">
        <div className="flex h-40 w-40 items-center justify-center rounded-full border-8 border-[#003566]">
          <span className="text-4xl font-bold text-[#001d3d]">
            {averageProgress}%
          </span>
        </div>

        <p className="mt-4 text-lg font-semibold text-[#003566]">
          {status}
        </p>

        <p className="mt-1 text-center text-sm text-gray-500">
          Portfolio implementation progress rating.
        </p>
      </div>
    </section>
  );
}