export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-8">

      <div>
        <h2 className="text-xl font-semibold">
          Volunteer for Sustainable Initiatives
        </h2>
      </div>

      <div className="flex items-center gap-6">

        <button>
          🔔
        </button>

        <button>
          ⚙️
        </button>

        <div className="text-right">
          <p className="font-semibold">
            Executive Director
          </p>

          <p className="text-sm text-gray-500">
            Administrator
          </p>
        </div>

      </div>

    </header>
  );
}