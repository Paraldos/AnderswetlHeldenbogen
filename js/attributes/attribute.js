import AttributeJSON from "../../blub/attribute.json" assert { type: "json" };
import Attribut from "./attribut.js";

export default class Attribute {
  constructor() {
    this.db = [
      new Attribut("Stärke", 1),
      new Attribut("Geschick", 1),
      new Attribut("Zähigkeit", 1),
      new Attribut("Klugheit", 1),
      new Attribut("Charisma", 1),
      new Attribut("Weisheit", 1),
    ];
    this.section = document.querySelector(".attribute");
    this.editButton = this.section.querySelector(".section-header__button");
    this.addEditButtonEventListener();
  }

  addEditButtonEventListener() {
    this.editButton.addEventListener("click", () => {
      this.editButton.classList.toggle("on");
      const btnsVisible = this.editButton.classList.contains("on");
      this.db.forEach((element) => element.toggleButtonVisibility(btnsVisible));
    });
  }
}
