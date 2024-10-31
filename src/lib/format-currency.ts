export const currencyFormatter = new Intl.NumberFormat("en-SG", {
  minimumFractionDigits: 2,
});

export const formatCents = (cents: number) => {
  return currencyFormatter.format(cents / 100);
};
