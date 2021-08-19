export class ApplianceManager {
  constructor(app) {
    this.app = app;
    this.location = document.querySelector(".list__appliance");
    this.appliance = [];
    this.labels = [];
    this.color = "success";
    this.type = "appliance";
    this.init();
  }

  init() {
    this.findAppliance();
  }

  buildItemsList() {
    this.location.innerHTML = this.appliance
      .map((item) => {
        return `<li class="list__item list__item--${this.color} col py-1">${item}</li>`;
      })
      .join("");

    this.itemsEvents();
  }

  itemsEvents() {
    document.querySelectorAll(`.list__item--${this.color}`).forEach((item) => {
      item.addEventListener("click", (e) => {
        // e.stopPropagation();
        const items = new Set([...this.labels]);
        items.add(e.target.outerText);
        this.labels = Array.from(items);
        this.app.update();
        // this.app.appendLabels();
      });
    });
  }

  searchEvent() {
    const searchInput = document.getElementById("search--appliance");
    searchInput.addEventListener("keyup", (e) => {
      const targetValue = e.target.value;
      const word = targetValue?.trim()?.toLowerCase();

      if (word === "") {
        this.findAppliance();
      } else if (this.app.isWordLongEnough(word)) {
        const result = [];
        this.appliance.forEach((item) => {
          if (item.toLowerCase().includes(word)) result.push(item);
        });
        this.appliance = result;
      }

      this.buildItemsList();
    });
  }

  findAppliance() {
    const allAppliance = new Set();

    this.app.recipes.forEach((recipe) => {
      allAppliance.add(recipe.appliance);
    });

    this.appliance = Array.from(allAppliance).sort();
    this.buildItemsList();
    this.searchEvent();
  }

  searchByAppliance(word) {
    this.app.recipes = this.app.recipes.reduce((accumulator, recipe) => {
      if (this.hasAppliance(word, recipe)) {
        accumulator.push(recipe);
      }
      return accumulator;
    }, []);
  }

  removeLabel(label) {
    this.labels =
      this.labels.filter((item) => {
        if (label !== item.toLowerCase()) return item;
      }) || [];
    this.appliance =
      this.appliance.filter((item) => {
        if (label !== item.toLowerCase()) return item;
      }) || [];
  }

  hasAppliance(word, recipe) {
    return recipe.appliance.toLowerCase().includes(word.toLowerCase());
  }
}
