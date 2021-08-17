import { recipes } from "./recipes.js";
import { Card } from "./components/index.js";

class App {
  constructor(recipes = []) {
    this.recipesDB = recipes;
    this.recipes = recipes;

    this.init();
  }

  init() {
    this.appendCardsRecipes(this.recipes);
  }

  appendCardsRecipes(elements) {
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";
    if (elements.length > 0) {
      const cardsRecipes = elements.map((recipe) => {
        return Card(recipe);
      });

      cards.innerHTML = cardsRecipes.join("");
    } else {
      cards.innerHTML = `<h2>Aucune recette ne correspond à votre critère… vous pouvez
      chercher « tarte aux pommes », « poisson », etc.</h2>`;
    }
  }
}

new App(recipes);
