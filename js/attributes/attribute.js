import AttributeJSON from "../../blub/attribute.json" assert { type: "json" };
import Attribut from "./attribut.js";

export default class Attribute {
  constructor() {
    // variables
    this.db = [
      new Attribut("Stärke", 1),
      new Attribut("Geschick", 1),
      new Attribut("Zähigkeit", 1),
      new Attribut("Klugheit", 1),
      new Attribut("Charisma", 1),
      new Attribut("Weisheit", 1),
    ];
    this.section = document.querySelector(".attribute");
    this.sectionHeader = document.querySelector(".attribute__section-header");

    // functions
    this.addSectionHeaderEventListener();
  }

  addSectionHeaderEventListener() {
    this.sectionHeader.addEventListener("click", () => {
      console.log("Click!");
    });
  }
}
