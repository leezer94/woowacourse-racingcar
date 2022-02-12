export const getRandomNumber = () => {
  const numbers = Array(10).fill(0);
  const randomNumber = Math.floor(Math.random() * numbers.length);

  return randomNumber;
};
