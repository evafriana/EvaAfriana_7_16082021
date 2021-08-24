import { ItemsManager } from "./ItemsManager.js";

export class ApplianceManager extends ItemsManager {
  constructor(app) {
    super(app);
    this.appliance = this.app.mapping.applianceMap;
    this.labels = [];
    this.color = "success";
    this.type = "appliance";
    this.location = document.querySelector(".list__appliance");

    this.init();
  }

  init() {
    this.appendAppliance();
  }

  appendAppliance() {
    this.buildItemsList(this, Object.keys(this.appliance));
  }
}
