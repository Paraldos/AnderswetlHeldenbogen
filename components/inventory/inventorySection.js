import Section from "../section/section.js";
import ConsumablesContainer from "./consumables/consumablesContainer.js";
import Items from "./items/items.js";
import Money from "./money/money.js";

export default class InventorySection {
  constructor() {
    this.section = new Section("Inventar", "inventory");
    this.container = this.section.contentContainer;
    this.editToggle = false;
    new Money(this.container);
    new Items(this.container);
    new ConsumablesContainer(this.container);
    new Other(this.container);
  }
}

class Other {
  constructor(container) {
    this.container = container;
    // init
    this.header = this.initHeader();
  }

  initHeader() {
    let element = document.createElement("div");
    element.className = "inventory__header";
    element.innerHTML = `<h3>Sonstiges</h3>`;
    this.container.appendChild(element);
    return element;
  }
}
