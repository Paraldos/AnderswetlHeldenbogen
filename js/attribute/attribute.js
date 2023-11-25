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

  addEditButtonListener() {
    this.section.editBtn.addEventListener("click", () => {
      const btnIsOn = this.section.toggleEditBtn();
      this.attribute.forEach((element) =>
        element.toggleButtonVisibility(btnIsOn)
      );
    });
  }
}
