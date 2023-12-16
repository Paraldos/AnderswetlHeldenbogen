import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import ComplexListItem from "./complexListItem.js";

export default class StatesSection {
  constructor() {
    this.section = new Section("Merkmale", "states");
    this.container = this.section.contentContainer;
    this.initSection();

    this.editElement = this.container.querySelectorAll(".states__edit-element");
    this.section.editBtn.addEventListener("click", () => this.onEditBtnClick());
  }

  initSection() {
    const states = ["ap", "lp", "sp"];
    this.list = Object.assign(document.createElement("ul"), {
      classList: ["states__list"],
    });

    states.forEach((id) => {
      new ComplexListItem(id, this.container);
    });
  }

  onEditBtnClick() {
    this.editElement.forEach((el) => {
      el.classList.toggle("invisible");
    });
  }
}
