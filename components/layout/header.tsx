export default function Header() {
  return (
    <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          Volunteer for Sustainable Initiatives (VSI)
        </h1>
        <p className="text-sm text-gray-500">
          Programme Management Information System
        </p>
      </div>

      <div className="text-right">
        <p className="font-semibold">Administrator</p>
        <p className="text-sm text-gray-500">
          admin@vsi.org.zm
        </p>
      </div>
    </header>
  );
}