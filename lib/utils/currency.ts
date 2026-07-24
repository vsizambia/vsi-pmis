export function formatCurrency(amount: number | null | undefined) {
  if (amount === null || amount === undefined) {
    return "ZMW 0.00";
  }

  return new Intl.NumberFormat("en-ZM", {
    style: "currency",
    currency: "ZMW",
    currencyDisplay: "code",
    minimumFractionDigits: 2,
  }).format(amount);
}