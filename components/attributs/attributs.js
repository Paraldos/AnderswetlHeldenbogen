import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import Attribut from "./attribut.js";

export default class Attributs {
  constructor() {
    this.section = new Section("Attribute", "attributs");
    this.attributs = this.fillAttributsArray();
    document.addEventListener("updateAttributsHeader", () =>
      this.updateSectionHeader()
    );
    this.section.editBtn.addEventListener("click", () => this.onEditBtnClick());
  }

  onEditBtnClick() {
    const btnIsOn = this.section.toggleEditBtn();
    this.updateSectionHeader();
    this.attributs.forEach((el) => el.toggleEditBtn(btnIsOn));
  }

  fillAttributsArray() {
    let attributs = [];
    for (let key in db.attributs) {
      attributs.push(new Attribut(key));
    }
    return attributs;
  }

  updateSectionHeader() {
    if (this.section.editBtn.classList.contains("on")) {
      this.section.updateHeader(`Attribute (${this.getAttributsSum()})`);
    } else {
      this.section.updateHeader("Attribute");
    }
  }

  getAttributsSum() {
    let sum = 0;
    for (let key in hero.attributs) {
      sum += hero.attributs[key].value;
    }
    return sum;
  }
}
