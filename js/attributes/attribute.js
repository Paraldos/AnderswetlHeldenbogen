import DB from "./db.js";
import Section from "../section/sections.js";
import Attribut from "./attribut.js";

export default class Attribute {
  constructor() {
    this.section = new Section("Attribute");
    this.db = new DB();
    this.list = this.db.map((dbElement) => new Attribut(dbElement.name, 1));
    this.addEditButtonEventListener();
  }

  addEditButtonEventListener() {
    this.section.editBtn.addEventListener("click", () => {
      const btnIsOn = this.section.toggleEditBtn();
      this.list.forEach((element) => element.toggleButtonVisibility(btnIsOn));
    });
  }
}
