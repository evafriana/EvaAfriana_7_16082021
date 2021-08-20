import { ItemsManager } from "./ItemsManager.js";

export class UstensilsManager extends ItemsManager {
  constructor(app) {
    super(app);
    this.ustensils = [];
    this.labels = [];
    this.color = "danger";
    this.type = "ustensils";
    this.location = document.querySelector(".list__ustensils");

    this.init();
  }

  init() {
    this.findUstensils();
    this.searchEvent();
  }

  findUstensils() {
    const allUstensils = new Set();

    this.app.recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        allUstensils.add(ustensil);
      });
    });

    this.ustensils = Array.from(allUstensils).sort();
    this.buildItemsList(this, this.ustensils);
  }

  searchByUstensils(word) {
    let recipesMatched = [];
    this.app.recipes.forEach((recipe) => {
      if (this.hasUstensils(word, recipe)) {
        recipesMatched.push(recipe);
      }
    });
    this.app.recipes = recipesMatched;
  }

  hasUstensils(word, recipe) {
    return recipe.ustensils.some((item) =>
      item.toLowerCase().includes(word.toLowerCase())
    );
  }

  searchEvent() {
    const searchInput = document.getElementById("search--ustensils");
    searchInput.addEventListener("keyup", (e) => {
      const targetValue = e.target.value;
      const word = targetValue?.trim()?.toLowerCase();

      this.findUstensils();

      if (this.app.isWordLongEnough(word)) {
        const result = [];
        this.ustensils.forEach((item) => {
          if (item.toLowerCase().includes(word)) result.push(item);
        });
        this.ustensils = result;
      }

      this.buildItemsList(this, this.ustensils);
    });
  }
}
