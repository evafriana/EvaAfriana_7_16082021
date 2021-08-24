export class ItemsManager {
  constructor(app) {
    this.app = app;
  }

  buildItemsList(obj, items) {
    obj.location.innerHTML = items
      .slice(0, 30)
      .map((item) => {
        return `<li class="list__item list__item--${obj.color} toto col py-1">${item}</li>`;
      })
      .join("");

    // this.itemsEvents(obj);
  }
}
