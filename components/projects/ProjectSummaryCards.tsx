type SummaryItem = {
  label: string;
  value: string | number;
};

export default function ProjectSummaryCards({
  items,
}: {
  items: SummaryItem[];
}) {
  return (
    <section className="grid gap-5 md:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-gray-500">
            {item.label}
          </p>

          <p className="mt-2 text-2xl font-bold">
            {item.value}
          </p>
        </div>
      ))}
    </section>
  );
}