import { ItemsManager } from "./ItemsManager.js";

// to manage the functionality of ustensils
export class UstensilsManager extends ItemsManager {
  // to build ustensils
  constructor(app) {
    super(app);
    this.ustensils = Array.from(this.app.mapping.ustensils).sort();
    this.labels = [];
    this.color = "danger";
    this.type = "ustensils";
    this.location = document.querySelector(".list__ustensils");

    this.init();
  }

  // constructor call
  init() {
    this.appendUstensils(this.ustensils);
    this.searchEvent();
  }

  // append ustensils
  appendUstensils(items) {
    this.buildItemsList(this, items);
  }

  // input searched words
  searchEvent() {
    const searchInput = document.getElementById("search--ustensils");
    searchInput.addEventListener("input", (e) => {
      const targetValue = e.target.value;
      const word = targetValue?.trim()?.toLowerCase();

      if (this.app.wordLength(word)) {
        const items = this.ustensils.filter((item) => {
          return item.match(new RegExp(word));
        });
        this.appendUstensils(items);
      } else {
        this.appendUstensils(this.ustensils);
      }
    });
  }
}
