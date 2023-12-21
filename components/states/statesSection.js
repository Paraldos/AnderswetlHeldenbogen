import hero from "../../data/hero.js";
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
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
    document.addEventListener("updateStatesHeader", () => {
      this.updateSectionHeader();
    });
  }

  initList(ids, itemType) {
    let list = document.createElement("ul");
    list.classList.add("states__list");
    this.container.appendChild(list);
    ids.forEach((id) => {
      new itemType(id, list);
    });
  }

  onToggleEdit() {
    this.editElement.forEach((el) => {
      el.classList.toggle("invisible");
    });
    this.updateSectionHeader();
  }

  updateSectionHeader() {
    const visible = this.section.editToggle ? "" : "invisible";
    this.section.headerText.innerHTML = `Merkmale <span class="${visible}">(${this.getStatesSum()})</span>`;
  }

  getStatesSum() {
    let sum = -14;
    sum += hero.states.ap.max;
    sum += hero.states.lp.max;
    return sum;
  }
}
