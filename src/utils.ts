export const convertUpperCase = (string: string) => {
  return string.toUpperCase();
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString("en-US");
};
