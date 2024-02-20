import Section from "../section/section.js";
import ConsumablesContainer from "./consumables/consumablesContainer.js";
import Items from "./items/items.js";
import Money from "./money/money.js";
import Other from "./other/other.js";

export default class InventorySection extends Section {
  constructor() {
    super("Inventar", "inventory");
    new Money(this);
    // new Items(this.container);
    // new ConsumablesContainer(this.container);
    // new Other(this.container);
  }
}
