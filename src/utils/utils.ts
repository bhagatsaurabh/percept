export const getRandom = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const normalize = (value: number, min: number, max: number) => {
  if (min === max) return 1;
  return (value - min) / (max - min);
};
