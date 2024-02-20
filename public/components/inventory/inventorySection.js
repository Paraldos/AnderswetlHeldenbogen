import Section from "../section/section.js";
import ConsumablesContainer from "./consumables/consumablesContainer.js";
import Items from "./items/items.js";
import Money from "./money/money.js";
import Other from "./other/other.js";

export default class InventorySection {
  constructor() {
    this.section = new Section("Inventar", "inventory");
    this.container = this.section.content;
    this.editToggle = false;
    new Money(this.container);
    new Items(this.container);
    new ConsumablesContainer(this.container);
    new Other(this.container);
  }
}
