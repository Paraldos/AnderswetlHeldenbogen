import Section from "../section/section.js";
import db from "../db/db.js";
import Attribut from "./attribut.js";

export default class Attribute {
  constructor() {
    this.section = new Section("Attribute");
    this.attribute = this.fillAttributeArray();
    this.addEditButtonListener();
    this.addUpdateSectionHeader();
  }

  addUpdateSectionHeader() {
    document.addEventListener("updateAttributeHeader", () =>
      this.updateSectionHeader()
    );
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

  updateSectionHeader() {
    if (this.section.editBtn.classList.contains("on")) {
      this.section.updateHeader(`Attribute (${this.getAttributeSum()})`);
    } else {
      this.section.updateHeader("Attribute");
    }
  }

  getAttributeSum() {
    let sum = 0;
    for (let key in db.attribute) {
      sum += db.attribute[key].value;
    }
    return sum;
  }
}
