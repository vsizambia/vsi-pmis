export function formatCurrency(
  amount: number | null,
  currency = "ZMW"
) {
  if (amount === null || amount === undefined) {
    return `${currency} 0`;
  }

  return new Intl.NumberFormat("en-ZM", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | null) {
  if (!date) {
    return "Not set";
  }

  return new Intl.DateTimeFormat("en-ZM", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}