export const moneyMask = (value: string): string => {
  if (!value) return "R$ 0,00";

  const numericValue = value.replace(/\D/g, "");

  const numberValue = parseInt(numericValue, 10) / 100;

  const formattedValue = numberValue.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return "R$ " + formattedValue;
};
