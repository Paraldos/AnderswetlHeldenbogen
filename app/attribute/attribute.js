import Section from "../section/section.js";
import Attribut from "./attribut.js";
import db from "../db/db.js";

export default class Attribute {
  constructor() {
    this.section = new Section("Attribute");
    this.attribute = this.fillAttributeArray();
    this.addEditButtonListener();
  }

  fillAttributeArray() {
    let attribute = [];
    for (let key in db.attribute) {
      attribute.push(new Attribut(key));
    }
    return attribute;
  }

  getAttributeSum() {
    let sum = 0;
    for (let key in db.attribute) {
      sum += db.attribute[key].value;
    }
    return sum;
  }

  updateSectionHeader() {
    if (this.section.editBtn.classList.contains("on")) {
      this.section.updateHeader(`Attribute (${this.getAttributeSum()})`);
    } else {
      this.section.updateHeader("Attribute");
    }
  }

  addEditButtonListener() {
    this.section.editBtn.addEventListener("click", () => {
      const btnIsOn = this.section.toggleEditBtn();
      this.updateSectionHeader();
      this.attribute.forEach((element) =>
        element.toggleButtonVisibility(btnIsOn)
      );
    });
  }
}
