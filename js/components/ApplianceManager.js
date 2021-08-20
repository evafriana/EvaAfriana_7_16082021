import { ItemsManager } from "./ItemsManager.js";

export class ApplianceManager extends ItemsManager {
  constructor(app) {
    super(app);
    this.appliance = [];
    this.labels = [];
    this.color = "success";
    this.type = "appliance";
    this.location = document.querySelector(".list__appliance");

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
    this.buildItemsList(this, this.appliance);
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

      this.buildItemsList(this, this.appliance);
    });
  }
}
