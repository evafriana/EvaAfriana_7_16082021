export class ItemsManager {
  constructor(app) {
    this.app = app;
  }

  superUpdate(elements, manager) {
    const bestElements =
      elements.length > 30 ? elements.slice(0, 30) : elements;

    // const buildItems = manager.buildItemsList(bestElements, manager.color);
    // console.log(buildItems);
    // manager.appendItems(buildItems, manager.location);
    // // manager.itemsEvents(manager.color, manager.type);
  }

  buildItemsList(items, color) {
    return items.map((item) => {
      return `<li class="list__item list__item--${color} col py-1">${item[0]}</li>`;
    });
  }

  //   appendItems(items, location) {
  //     location.innerHTML = items.join("");
  //   }
}
