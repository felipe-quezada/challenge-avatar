export const capitalizeText = (word) => {
  const firstLeter = word.charAt(0);
  const wordWithin = word.slice(1);
  return firstLeter.toUpperCase() + wordWithin;
};
