export class IngredientsManager {
  constructor(app) {
    this.app = app;
    this.ingredients = [];
    this.labels = [];
    this.color = "primary";
    this.type = "ingredients";

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
      this.buildItemsList();
    });
  }

  buildItemsList() {
    document.querySelector(".list__ingredients").innerHTML = this.ingredients
      .slice(0, 30)
      .map((item) => {
        return `<li class="list__item list__item--${this.color} toto col py-1">${item}</li>`;
      })
      .join("");

    this.itemsEvents();
  }

  itemsEvents() {
    document.querySelectorAll(`.list__item--${this.color}`).forEach((item) => {
      item.addEventListener("click", (e) => {
        // e.stopPropagation();
        const items = new Set([...this.labels]);
        items.add(e.target.outerText.trim());
        this.labels = Array.from(items);
        this.app.update();
      });
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

  removeLabel(text) {
    const result = [];
    this.labels.forEach((label) => {
      if (label.toLowerCase() !== text.toLowerCase()) result.push(label);
    });
    this.labels = result;
    this.app.update();
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

      this.buildItemsList();
    });
  }
}
