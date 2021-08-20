export class UstensilsManager {
  constructor(app) {
    this.app = app;
    this.ustensils = [];
    this.labels = [];
    this.color = "danger";
    this.type = "ustensils";

    this.init();
  }

  init() {
    this.findUstensils();
    // this.searchEvent();
  }

  findUstensils() {
    const allUstensils = new Set();

    this.app.recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        allUstensils.add(ustensil);
      });
    });

    this.ustensils = Array.from(allUstensils).sort();
    this.buildItemsList();
  }

  buildItemsList() {
    document.querySelector(".list__ustensils").innerHTML = this.ustensils
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

  removeLabel(text) {
    const result = [];
    this.labels.forEach((label) => {
      if (label.toLowerCase() !== text.toLowerCase()) result.push(label);
    });
    this.labels = result;
    this.app.update();
  }
}
