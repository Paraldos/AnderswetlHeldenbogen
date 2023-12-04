import db from "../db/db.js";
import hero from "../hero/hero.js";
import Section from "../section/section.js";
import Attribut from "./attribut.js";

export default class Attribute {
  constructor() {
    this.section = new Section("Attribute");
    this.attribute = this.fillAttributeArray();
    this.addEditButtonListener();
    this.addUpdateSectionHeader();
    this.addResetListener();
  }

  addResetListener() {
    document.addEventListener("resetAttribute", () => {
      this.attribute.forEach((el) => {
        el.updateElement();
      });
    });
  }

  fillAttributeArray() {
    let attribute = [];
    for (let key in db.attribute) {
      attribute.push(new Attribut(key));
    }
    return attribute;
  }

  addEditButtonListener() {
    this.section.editBtn.addEventListener("click", () => {
      const btnIsOn = this.section.toggleEditBtn();
      this.updateSectionHeader();
      this.attribute.forEach((el) => el.toggleEditBtn(btnIsOn));
    });
  }

  addUpdateSectionHeader() {
    document.addEventListener("updateAttributeHeader", () =>
      this.updateSectionHeader()
    );
  }

  updateSectionHeader() {
    if (this.section.editBtn.classList.contains("on")) {
      this.section.updateHeader(`Attribute (${this.getAttributeSum()})`);
    } else {
      this.section.updateHeader("Attribute");
    }
  }

  getAttributeSum() {
    let sum = 0;
    for (let key in hero.attribute) {
      sum += hero.attribute[key].value;
    }
    return sum;
  }
}
