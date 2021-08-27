import { ItemsManager } from "./ItemsManager.js";

// to manage the functionality of ingredients
export class IngredientsManager extends ItemsManager {
  // to build ingredients
  constructor(app) {
    super(app);
    this.ingredients = Array.from(this.app.mapping.ingredients).sort();
    this.labels = [];
    this.color = "primary";
    this.type = "ingredients";
    this.location = document.querySelector(".list__ingredients");

    this.init();
  }
  // constructor call
  init() {
    this.appendIngredients(this.ingredients);
    this.searchEvent();
  }

  // append ingredients
  appendIngredients(items) {
    this.buildItemsList(this, items);
  }

  // input searched words
  searchEvent() {
    const searchInput = document.getElementById("search--ingredients");
    searchInput.addEventListener("input", (e) => {
      const targetValue = e.target.value;
      const word = targetValue?.trim()?.toLowerCase();

      if (this.app.wordLength(word)) {
        const items = this.ingredients.filter((item) => {
          return item.match(new RegExp(word));
        });
        this.appendIngredients(items);
      } else {
        this.appendIngredients(this.ingredients);
      }
    });
  }
}
