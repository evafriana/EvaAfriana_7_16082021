export class ItemsManager {
  constructor(app) {
    this.app = app;
  }

  // build all list items (appliance, ustensils, ingredients) in li
  buildItemsList(obj, items) {
    obj.location.innerHTML = items
      .slice(0, 30)
      .map((item) => {
        return `<li class="list__item list__item--${obj.color} toto col py-1">${item}</li>`;
      })
      .join("");

    this.itemsEvents(obj);
  }

  // add event (remove label) when click
  itemsEvents(obj) {
    document.querySelectorAll(`.list__item--${obj.color}`).forEach((item) => {
      item.addEventListener("click", (e) => {
        // e.stopPropagation();
        const items = new Set([...obj.labels]);
        items.add(e.target.outerText.trim());
        obj.labels = Array.from(items);
        this.app.update();
      });
    });
  }
}
