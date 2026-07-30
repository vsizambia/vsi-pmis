export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="rounded-2xl bg-gradient-to-r from-[#001D3D] via-[#003566] to-[#00509D] p-8 text-white shadow-lg">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#FFD60A]">
            VSI-PMIS
          </h1>

          <p className="mt-2 text-xl font-semibold">
            Programme Management Information System
          </p>

          <p className="mt-3 max-w-3xl text-blue-100">
            Executive Secretariat Dashboard providing a real-time overview of
            programmes, projects, activities, beneficiaries and organisational
            performance.
          </p>
        </div>

        <div className="rounded-xl bg-white/10 px-6 py-5 backdrop-blur">
          <p className="text-sm uppercase tracking-widest text-blue-200">
            Today
          </p>

          <p className="mt-2 text-lg font-semibold">
            {today}
          </p>
        </div>
      </div>
    </section>
  );
}