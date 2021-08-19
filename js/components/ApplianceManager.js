export class ApplianceManager {
  constructor(app) {
    this.app = app;
    this.appliance = [];
    this.labels = [];
    this.color = "success";
    this.type = "appliance";

    this.init();
  }

  init() {
    this.findAppliance();
    this.searchEvent();
  }

  findAppliance() {
    const allAppliance = new Set();

    this.app.recipes.forEach((recipe) => {
      allAppliance.add(recipe.appliance);
    });

    this.appliance = Array.from(allAppliance).sort();
    this.buildItemsList();
  }

  buildItemsList() {
    document.querySelector(".list__appliance").innerHTML = this.appliance
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

  searchByAppliance(word) {
    this.app.recipes = this.app.recipes.reduce((accumulator, recipe) => {
      if (this.hasAppliance(word, recipe)) {
        accumulator.push(recipe);
      }
      return accumulator;
    }, []);
  }

  hasAppliance(word, recipe) {
    return recipe.appliance.toLowerCase().includes(word.toLowerCase());
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
    const searchInput = document.getElementById("search--appliance");
    searchInput.addEventListener("keyup", (e) => {
      const targetValue = e.target.value;
      const word = targetValue?.trim()?.toLowerCase();

      this.findAppliance();

      if (this.app.isWordLongEnough(word)) {
        const result = [];
        this.appliance.forEach((item) => {
          if (item.toLowerCase().includes(word)) result.push(item);
        });
        this.appliance = result;
      }

      this.buildItemsList();
    });
  }
}
