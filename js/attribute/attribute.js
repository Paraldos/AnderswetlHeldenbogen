import Section from "../section/section.js";
import Attribut from "./attribut.js";

export default class Attribute {
  constructor(db) {
    this.db = db;
    this.section = new Section("Attribute");
    this.attribute = [];
    this.fillAttributeArray();
    this.addEditButtonListener();
  }

  fillAttributeArray() {
    for (let key in this.db.attribute) {
      this.attribute.push(new Attribut(this.db.attribute[key]));
    }
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
