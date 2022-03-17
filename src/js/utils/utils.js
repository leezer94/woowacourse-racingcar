export const getRandomNumber = () => {
  const numbers = Array(10).fill(0);
  const randomNumber = Math.floor(Math.random() * numbers.length);

  return randomNumber;
};

export const disableChildNodes = (...target) => {
  target.forEach(({ childNodes }) => {
    childNodes.forEach((child) => {
      child.disabled = true;
    });
  });
};

export const ableChildNodes = (...target) => {
  target.forEach(({ childNodes }) => {
    childNodes.forEach((child) => {
      child.disabled = false;
    });
  });
};

export const showElement = (...targets) => {
  targets.forEach((target) => (target.hidden = false));
};

export const hideElement = (...targets) => {
  targets.forEach((target) => (target.hidden = true));
};

export const clearInputValue = (inputs) => {
  [...inputs].map((input) => (input.value = ''));
};
