import { ItemsManager } from "./ItemsManager.js";

export class UstensilsManager extends ItemsManager {
  constructor(app) {
    super(app);
    this.ustensils = Array.from(this.app.mapping.ustensils).sort();
    this.labels = [];
    this.color = "danger";
    this.type = "ustensils";
    this.location = document.querySelector(".list__ustensils");

    this.init();
  }

  init() {
    this.appendUstensils(this.ustensils);
    this.searchEvent();
  }

  appendUstensils(items) {
    this.buildItemsList(this, items);
  }

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
