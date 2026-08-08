interface ExecutiveHeaderProps {
  title?: string;
  subtitle?: string;
}

export default function ExecutiveHeader({
  title = "Executive Dashboard",
  subtitle = "Visionary Students Initiative Programme Management Information System",
}: ExecutiveHeaderProps) {
  const lastUpdated = new Date().toLocaleString("en-ZM", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="mb-8 flex flex-col gap-2">
      <p className="text-sm text-gray-500">
        Executive Management View
      </p>

      <h1 className="text-3xl font-bold text-[#000814]">
        {title}
      </h1>

      <p className="text-gray-600">
        {subtitle}
      </p>

      <p className="mt-3 text-xs text-gray-500">
        Last updated {lastUpdated}
      </p>
    </div>
  );
}
