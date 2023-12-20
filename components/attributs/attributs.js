import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import Attribut from "./attribut.js";

export default class Attributs {
  constructor() {
    this.section = new Section("Attribute", "attributs");
    this.attributs = this.fillAttributsArray();
    this.updateSectionHeader();
    document.addEventListener("updateAttributsHeader", () =>
      this.updateSectionHeader()
    );
  }

  fillAttributsArray() {
    let attributs = [];
    for (let key in db.attributs) {
      attributs.push(new Attribut(key));
    }
    return attributs;
  }

  updateSectionHeader() {
    this.section.updateHeader(
      `Attribute <span class="attributes__sum">(${this.getAttributsSum()})</span>`
    );
  }

  getAttributsSum() {
    let sum = 0;
    for (let key in hero.attributs) {
      sum += hero.attributs[key].value;
    }
    return sum;
  }
}
