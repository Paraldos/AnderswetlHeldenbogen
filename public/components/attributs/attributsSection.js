import database from "../../data/database.js";
import Section from "../section/section.js";
import AttributsSectionItem from "./attributsSectionItem.js";

export default class AttributsSection extends Section {
  constructor() {
    super("Attribute", "attributs");
    Object.keys(database.attributs).map(
      (key) => new AttributsSectionItem(key, this)
    );
    document.addEventListener("updateAttributsHeader", () => this.update());
  }

  onToggleEdit() {
    super.onToggleEdit();
    this.update();
  }

  update() {
    const visible = this.editToggle ? "" : "disabled";
    this.header.innerHTML = `Attribute <span class="${visible}">(${this.getAttributsSum()})</span>`;
  }

  getAttributsSum() {
    let sum = -12;
    for (let key in database.hero.attributs) {
      sum += database.hero.attributs[key].value;
    }
    return sum;
  }
}
