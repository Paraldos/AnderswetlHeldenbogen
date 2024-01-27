import database from "../../data/database.js";
import Section from "../../templates/section/section.js";
import Attribut from "./attribut.js";

export default class Attributs {
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
      (key) => new Attribut(key, this.section.contentContainer)
    );
  }

  updateSectionHeader() {
    const visible = this.section.editToggle ? "" : "disabled";
    this.section.header.innerHTML = `Attribute <span class="${visible}">(${this.getAttributsSum()})</span>`;
  }

  getAttributsSum() {
    let attributsSum = -12;
    for (let key in database.hero.attributs) {
      attributsSum += database.hero.attributs[key].value;
    }
    return attributsSum;
  }
}
