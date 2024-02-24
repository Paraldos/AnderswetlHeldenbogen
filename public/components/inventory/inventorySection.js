import Section from "../section/section.js";
import Consumables from "./consumables/consumables.js";
import Tools from "./tools/tools.js";
import Money from "./money/money.js";
import Other from "./other/other.js";

export default class InventorySection extends Section {
  constructor() {
    super("Inventar", "inventory");
    new Money(this);
    new Tools(this);
    new Consumables(this);
    new Other(this);
  }
}
