import database from "../../../data/database.js";
import Item from "./item.js";

export default class Items {
  constructor(container) {
    this.container = container;
    this.editToggle = false;
    // init
    this.header = this.initHeader();
    this.labels = this.initLabels();
    this.body = this.initBody();
    this.plusBtn = this.header.querySelector(".items__plus-btn");
    // events
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    document.addEventListener("resetItems", () => this.resetItems());
    this.resetItems();
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  // ================== init
  initHeader() {
    let element = document.createElement("div");
    element.className = "inventory__header";
    element.innerHTML = `
      <h3>Werkzeuge</h3>
      <button class="items__plus-btn symbol-btn invisible"><i class="fa-solid fa-plus"></i></button>`;
    this.container.appendChild(element);
    return element;
  }

  initLabels() {
    let element = document.createElement("ul");
    element.className = "items__labels";
    element.innerHTML = `
      <li>Name</li>
      <li>Bonus</li>
      <li>Pool</li>
      <li class="items__description-label">Beschreibung</li>`;
    this.container.appendChild(element);
    return element;
  }

  initBody() {
    let element = document.createElement("div");
    element.className = "items__body";
    this.container.appendChild(element);
    return element;
  }

  // ================== events
  onToggleEdit() {
    this.editToggle = !this.editToggle;
    this.plusBtn.classList.toggle("invisible", !this.editToggle);
    this.labels.classList.toggle("items__labels--edit", this.editToggle);
    // this.updateLabelVisibility();
  }

  onPlusBtnClick() {
    hero.items.push({ name: "", description: "", bonus: 0, pool: 0 });
    hero.saveHero();
    this.resetItems();
  }

  resetItems() {
    // this.updateLabelVisibility();
    this.body.innerHTML = "";
    hero.items.forEach((item, index) => {
      new Item(item, index, this.body, this.editToggle);
    });
  }

  // updateLabelVisibility() {
  //   if (database.hero.items && database.hero.items.length <= 0) {
  //     this.header.classList.toggle("invisible", !this.editToggle);
  //   }
  //   this.labels.classList.toggle("invisible", hero.items.length <= 0);
  //   this.body.classList.toggle("invisible", hero.items.length <= 0);
  // }
}
