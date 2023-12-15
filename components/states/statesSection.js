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
    this.list = Object.assign(document.createElement("ul"), {classList: ["states__list"]})

    states.forEach((id) => {
      this.list.appendChild(this.initListItem(id));
      this.updateStatesSquares(id)
    });

    this.section.contentContainer.appendChild(this.list);
  }

  initListItem(id) {
    let dbEntry = db.states[id];
    let mainTxt = `${dbEntry.name} (${dbEntry.abbreviation}) ${hero.states[id].max}`;
    let listItem = document.createElement('li')
    listItem.classList = `states__list-item states__${id}`
    listItem.innerHTML = `
      <button class="states__main-btn">${mainTxt}</button>
      <div class="states__squares states__${id}-squares"></div>
      <button class="symbol-btn"><i class="fa-solid fa-minus"></i></button>
      <button class="symbol-btn"><i class="fa-solid fa-plus"></i></button>`
    return listItem;
  }

  updateStatesSquares(id) {
    let container = this.list.querySelector(`.states__${id}-squares`)
    container.innerHTML = ""
    for (let i = 1; i <= hero.states[id].max; i ++) {
      let square = document.createElement("i")
      square.classList.add(i <= hero.states[id].current ? "fa-solid" : "fa-regular")
      square.classList.add("fa-square")
      container.appendChild(square)
    }
  }

  onEditBtnClick() {
    this.toggleWithEditElements.forEach((el) => {
      el.classList.toggle("invisible");
    });
  }
}

class ComplexListItem {
  constructor(id) {
    this.id = id
    this.dbEntry = db.states[id];
    this.heroEntry = hero.states[id]
    this.item = this.initItem()
    this.updateStatesSquares()
  }

  initItem() {
    let mainTxt = `${dbEntry.name} (${dbEntry.abbreviation}) ${hero.states[id].max}`;
    let listItem = document.createElement('li')
    listItem.classList = `states__list-item states__${id}`
    listItem.innerHTML = `
      <button class="states__main-btn">${mainTxt}</button>
      <div class="states__squares states__${id}-squares"></div>
      <button class="symbol-btn"><i class="fa-solid fa-minus"></i></button>
      <button class="symbol-btn"><i class="fa-solid fa-plus"></i></button>`
    return listItem
  }


  updateStatesSquares() {
    let container = this.item.querySelector(`.states__${this.id}-squares`)
    container.innerHTML = ""
    for (let i = 1; i <= this.heroEntry.max; i ++) {
      let square = document.createElement("i")
      square.classList.add(i <= hero.states[this.id].current ? "fa-solid" : "fa-regular")
      square.classList.add("fa-square")
      container.appendChild(square)
    }
  }
}