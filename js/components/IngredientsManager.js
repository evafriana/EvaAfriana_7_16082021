import { ItemsManager } from "./ItemsManager.js";

export class IngredientsManager extends ItemsManager {
  constructor(app) {
    super(app);
    this.ingredients = [];
    this.labels = [];
    this.color = "primary";
    this.type = "ingredients";
    this.location = document.querySelector(".list__ingredients");

    this.init();
  }

  init() {
    this.findIngredients();
    this.searchEvent();
  }

  findIngredients() {
    const allIngredients = new Set();
    this.app.recipes.forEach((recipe) => {
      recipe.ingredients.forEach(({ ingredient }) => {
        allIngredients.add(ingredient);
      });
      this.ingredients = Array.from(allIngredients).sort();
      this.buildItemsList(this, this.ingredients);
    });
  }

  searchByIngredients(word) {
    this.app.recipes = this.app.recipes.reduce((accumulator, recipe) => {
      if (this.hasIngredients(word, recipe)) {
        accumulator.push(recipe);
      }
      return accumulator;
    }, []);
  }

  hasIngredients(word, recipe) {
    return recipe.ingredients.some((item) =>
      item.ingredient.toLowerCase().includes(word.toLowerCase())
    );
  }

  searchEvent() {
    const searchInput = document.getElementById("search--ingredients");
    searchInput.addEventListener("keyup", (e) => {
      const targetValue = e.target.value;
      const word = targetValue?.trim()?.toLowerCase();

      this.findIngredients();

      if (this.app.isWordLongEnough(word)) {
        const result = [];
        this.ingredients.forEach((item) => {
          if (item.toLowerCase().includes(word)) result.push(item);
        });
        this.ingredients = result;
      }

      this.buildItemsList(this, this.ingredients);
    });
  }
}
