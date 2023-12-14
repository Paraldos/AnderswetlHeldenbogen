import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";

export default class StatesSection {
  constructor() {
    this.section = new Section("Merkmale", "states");
    this.initSection();
    this.toggleWithEditElements =
      this.section.contentContainer.querySelectorAll(
        ".states__toggle-with-edit"
      );
    this.section.editBtn.addEventListener("click", () => this.onEditBtnClick());
  }

  initSection() {
    const states = ["ap", "lp", "sp"];
    const list = document.createElement("ul");
    list.classList.add("states__list");

    states.forEach((trait) => {
      list.appendChild(this.initListItem(trait));
    });

    this.section.contentContainer.appendChild(list);
  }

  initListItem(id) {
    let dbEntry = db.states[id];
    let mainTxt = `${dbEntry.name} (${dbEntry.abbreviation}) ${hero.states[id]}`;
    let listItem = Object.assign(document.createElement("li"), {
      classList: ["states__list-item"],
      innerHTML: `
        <button class="states__main-btn">${mainTxt}</button>
        <div class="states__squares">
          <i class="fa-solid fa-square"></i>
          <i class="fa-solid fa-square"></i>
          <i class="fa-solid fa-square"></i>
          <i class="fa-regular fa-square"></i>
          <i class="fa-regular fa-square"></i>
        </div>
        <button class="symbol-btn"><i class="fa-solid fa-minus"></i></button>
        <button class="symbol-btn"><i class="fa-solid fa-plus"></i></button>`,
    });
    return listItem;
  }

  onEditBtnClick() {
    this.toggleWithEditElements.forEach((el) => {
      el.classList.toggle("invisible");
    });
  }
}
