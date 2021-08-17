export const Ingredient = ({ ingredient, quantity, unit }) => {
  const quantityText = quantity ? ": " + quantity : "";

  return `<li><strong>${ingredient || ""}</strong>${quantityText} ${
    unit || ""
  }</li>`;
};
