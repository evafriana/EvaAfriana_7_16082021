import { ItemsManager } from "./ItemsManager.js";

// to manage the functionality of appliance
export class ApplianceManager extends ItemsManager {
  // to build appliance
  constructor(app) {
    super(app);
    this.appliance = Array.from(this.app.mapping.appliance).sort();
    this.labels = [];
    this.color = "success";
    this.type = "appliance";
    this.location = document.querySelector(".list__appliance");

    this.init();
  }

  // constructor call
  init() {
    this.appendAppliance(this.appliance);
    this.searchEvent();
  }

  // append appliance
  appendAppliance(items) {
    this.buildItemsList(this, items);
  }

  // input searched words
  searchEvent() {
    const searchInput = document.getElementById("search--appliance");
    searchInput.addEventListener("input", (e) => {
      const targetValue = e.target.value;
      const word = targetValue?.trim()?.toLowerCase();

      if (this.app.wordLength(word)) {
        const items = this.appliance.filter((item) => {
          return item.match(new RegExp(word));
        });
        this.appendAppliance(items);
      } else {
        this.appendAppliance(this.appliance);
      }
    });
  }
}
