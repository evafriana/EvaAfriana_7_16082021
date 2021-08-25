import { ItemsManager } from "./ItemsManager.js";

export class ApplianceManager extends ItemsManager {
  constructor(app) {
    super(app);
    this.appliance = this.app.mapping.applianceMap;
    this.applianceArray = Object.keys(this.appliance).sort();
    this.labels = [];
    this.color = "success";
    this.type = "appliance";
    this.location = document.querySelector(".list__appliance");

    this.init();
  }

  init() {
    this.appendAppliance();
    this.searchEvent();
  }

  appendAppliance() {
    this.buildItemsList(this, this.applianceArray);
  }

  searchEvent() {
    const searchInput = document.getElementById("search--appliance");
    searchInput.addEventListener("keyup", (e) => {
      const targetValue = e.target.value;
      const word = targetValue?.trim()?.toLowerCase();

      if (this.app.wordLength(word)) {
        const result = [];
        this.applianceArray.forEach((item) => {
          if (item.toLowerCase().includes(word)) result.push(item);
        });
        this.applianceArray = result;
      }

      this.appendAppliance();
    });
  }
}
