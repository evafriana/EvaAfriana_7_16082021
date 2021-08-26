import { ItemsManager } from "./ItemsManager.js";

export class IngredientsManager extends ItemsManager {
  constructor(app) {
    super(app);
    this.ingredients = this.app.mapping.ingredientsMap;
    this.ingredientsArray = [];
    this.labels = [];
    this.color = "success";
    this.type = "ingredients";
    this.location = document.querySelector(".list__ingredients");

    this.init();
  }

  init() {
    this.appendIngredients();
  }

  appendIngredients() {
    this.ingredientsArray = Array.from(Object.keys(this.ingredients)).sort();
    // this.buildItemsList(this, this.ingredientsArray);
  }
}
