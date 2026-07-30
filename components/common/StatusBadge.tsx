type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const value = status.toLowerCase();

  const classes =
    value === "completed"
      ? "bg-green-100 text-green-700"
      : value === "ongoing"
      ? "bg-blue-100 text-blue-700"
      : value === "planned"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-slate-100 text-slate-700";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${classes}`}
    >
      {status}
    </span>
  );
}