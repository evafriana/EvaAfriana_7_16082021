import { Ingredient } from "./Ingredient.js";

export const Card = (recipe) => {
  const { name, time, description, ingredients } = recipe;
  const ingredientsList = ingredients.map((ingredient) => {
    return Ingredient(ingredient);
  });
  return `
        <div class="col-md-6 col-xl-4 col-12">
            <div class="card__recipe rounded border bg-white">
                <img
                src="./images/les_petits_plats_logo.png"
                class="img-fluid p-1"
                alt="..."
                />
                <div class="card__recipe__info p-4 bg-light">
                    <div
                        class="d-flex my-3 justify-content-between align-items-center"
                    >
                        <h3>${name}</h3>
                        <h3>
                        <strong><i class="far fa-clock"></i>\u00A0${time}\u00A0min</strong>
                        </h3>
                    </div>
                    <div class="row">
                        <ul class="ingredients__list col">
                            ${ingredientsList.join("")}
                        </ul>
                        <p class="col card__recipe__description">
                        ${description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    `;
};
