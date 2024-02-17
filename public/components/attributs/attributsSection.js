import database from "../../data/database.js";
import Section from "../section/section.js";
import AttributsSectionItem from "./attributsSectionItem.js";

export default class AttributsSection {
  constructor() {
    this.section = new Section("Attribute", "attributs");
    this.createAttributs();
    document.addEventListener("updateAttributsHeader", () => {
      this.updateSectionHeader();
    });
    document.addEventListener("toggleEdit", () => this.updateSectionHeader());
  }

  createAttributs() {
    Object.keys(database.attributs).map(
      (key) => new AttributsSectionItem(key, this.section)
    );
  }

  updateSectionHeader() {
    const visible = this.section.editToggle ? "" : "disabled";
    this.section.header.innerHTML = `Attribute <span class="${visible}">(${this.getAttributsSum()})</span>`;
  }

  getAttributsSum() {
    let sum = -12;
    for (let key in database.hero.attributs) {
      sum += database.hero.attributs[key].value;
    }
    return sum;
  }
}
