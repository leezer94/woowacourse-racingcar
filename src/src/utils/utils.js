export const getRandomNumber = () => {
  const numbers = Array(10).fill(0);
  const randomNumber = Math.floor(Math.random() * numbers.length);

  return randomNumber;
};

export const disableChildNodes = ({ childNodes }) => {
  childNodes.forEach((child) => {
    child.disabled = true;
  });
};

export const ableChildNodes = ({ childNodes }) => {
  childNodes.forEach((child) => {
    child.disabled = false;
  });
};
