import Section from "../section/section.js";
import ComplexListItem from "./complexListItem.js";
import SimpleListItem from "./simpleListItem.js";

export default class StatesSection {
  constructor() {
    this.section = new Section("Merkmale", "states");
    this.container = this.section.contentContainer;
    this.initList(["ap", "lp", "sp"], ComplexListItem);
    this.initList(["ep", "stufe", "tempo"], SimpleListItem);
    this.editElement = this.container.querySelectorAll(".states__edit-element");
    // this.section.editBtn.addEventListener("click", () => this.onEditBtnClick());
  }

  initList(ids, itemType) {
    let list = document.createElement("ul");
    list.classList.add("states__list");
    this.container.appendChild(list);
    ids.forEach((id) => {
      new itemType(id, list);
    });
  }

  onEditBtnClick() {
    this.editElement.forEach((el) => {
      el.classList.toggle("invisible");
    });
  }
}
