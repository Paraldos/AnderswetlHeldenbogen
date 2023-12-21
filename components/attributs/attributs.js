import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import Attribut from "./attribut.js";

export default class Attributs {
  constructor() {
    this.section = new Section("Attribute", "attributs");
    this.editToggle = false;
    this.attributs = Object.keys(db.attributs).map((key) => new Attribut(key));
    this.updateSectionHeader();
    document.addEventListener("updateAttributsHeader", () => {
      this.updateSectionHeader();
    });
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  updateSectionHeader() {
    const visible = this.editToggle ? "" : "invisible";
    this.section.headerText.innerHTML = `Attribute <span class="${visible}">(${this.getAttributsSum()})</span>`;
  }

  getAttributsSum() {
    let sum = 0;
    for (let key in hero.attributs) {
      sum += hero.attributs[key].value;
    }
    return sum;
  }

  onToggleEdit() {
    this.editToggle = !this.editToggle;
    this.updateSectionHeader();
  }
}
