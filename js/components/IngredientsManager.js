import { ItemsManager } from "./ItemsManager.js";

export class IngredientsManager extends ItemsManager {
  constructor(app) {
    super(app);
    this.ingredients = Array.from(this.app.mapping.ingredients).sort();
    this.labels = [];
    this.color = "primary";
    this.type = "ingredients";
    this.location = document.querySelector(".list__ingredients");

    this.init();
  }

  init() {
    this.appendIngredients(this.ingredients);
    this.searchEvent();
  }

  appendIngredients(items) {
    this.buildItemsList(this, items);
  }

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
