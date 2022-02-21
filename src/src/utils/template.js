export const carPlayerTemplate = (carName) => {
  return `
<div class ="racing-car" data-name=${carName} data-racing-count = '0'>
   <div class="car-player mr-2">${carName}</div>
</div>
`;
};

export const carForwardTemplate = (arrow) => {
  return `<div class="forward-icon mt-2">${arrow}</div>`;
};
