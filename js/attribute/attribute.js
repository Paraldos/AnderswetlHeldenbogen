import DB from "./db.js";
import Section from "../section/section.js";
import Attribut from "./attribut.js";

export default class Attribute {
  constructor() {
    this.db = new DB();
    this.section = new Section("Attribute");
    this.attribute = this.db.map((dbElement) => new Attribut(dbElement));
    this.addEditButtonEventListener();
  }

  addEditButtonEventListener() {
    this.section.editBtn.addEventListener("click", () => {
      const btnIsOn = this.section.toggleEditBtn();
      this.attribute.forEach((element) =>
        element.toggleButtonVisibility(btnIsOn)
      );
    });
  }
}
