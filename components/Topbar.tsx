export default function Topbar() {
  return (
    <header className="bg-[#003566] px-8 py-4 flex items-center justify-between text-white">

      <div>
        <h1 className="text-xl font-bold">
          Visionary Students Initiative (VSI)
        </h1>

        <p className="text-sm text-[#ffd60a]">
          Programme Management Information System (VSI-PMIS)
        </p>
      </div>


      <div className="flex items-center gap-6">

        <div className="text-2xl">
          🔔
        </div>

        <div className="text-2xl">
          ⚙️
        </div>


        <div className="text-right">

          <p className="font-semibold">
            Executive Director
          </p>

          <p className="text-sm text-gray-200">
            Administrator
          </p>

        </div>

      </div>


    </header>
  );
}