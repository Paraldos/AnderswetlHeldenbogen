import Section from "../section/section.js";
import Consumables from "./consumables.js";
import Items from "./items.js";
import Money from "./money.js";

export default class InventorySection {
  constructor() {
    this.section = new Section("Inventar", "inventory");
    this.container = this.section.contentContainer;
    this.editToggle = false;
    new Consumables(this.container);
    new Items(this.container);
    new Money(this.container);
    this.initOther();
  }

  initOther() {
    let element = document.createElement("div");
    element.innerHTML = `<h3>Sonstiges</h3>`;
    this.container.appendChild(element);
  }
}
