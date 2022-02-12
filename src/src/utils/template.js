export const carPlayerTemplate = (carName, count) => {
  return `
<div class ="racing-car" data-name=${carName} data-item-count = ${count}>
   <div class="car-player mr-2">${carName}</div>
</div>
`;
};

export const carForwardTemplate = (arrow) => {
  return `<div class="forward-icon mt-2">${arrow}</div>`;
};
