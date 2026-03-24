export const formatINR = (value) => {
  const number = Number(value);
  if (Number.isNaN(number)) return "₹0.00";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(number);
};
