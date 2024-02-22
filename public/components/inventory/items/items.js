import database from "../../../data/database.js";
import Item from "./item.js";

export default class Items {
  constructor(section) {
    this.section = section;
    this.editToggle = false;
    // init
    this.element = this.createElement();
    this.headerBtn = this.element.querySelector(".items__plus-btn");
    this.header = this.element.querySelector(".items__header");
    this.labels = this.element.querySelector(".items__labels");
    this.itemsContainer = this.element.querySelector(".items__body");
    this.headerBtn.addEventListener("click", () => this.onHeaderBtnclick());
    // events
    document.addEventListener("resetItems", () => this.resetItems());
    document.addEventListener("toggleEdit", () => this.updateLabelVisibility());
    this.resetItems();
  }

  createElement() {
    let element = Object.assign(document.createElement("div"), {
      className: "items",
      innerHTML: `
        <div class="items__header">
          <h3>Werkzeuge</h3>
          <button class="items__plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>
        </div>
        <ul class="items__labels">
          <li>Name</li>
          <li>Bonus</li>
          <li>Pool</li>
          <li>Beschreibung</li>
        </ul>
        <div class="items__body"></div>`,
    });
    this.section.content.appendChild(element);
    return element;
  }

  // ================== events
  onHeaderBtnclick() {
    if (!database.hero.items) database.hero.items = [];
    database.hero.items.push({ name: "", description: "", bonus: 0, pool: 0 });
    database.saveHero();
    this.resetItems();
  }

  resetItems() {
    this.itemsContainer.innerHTML = "";
    this.updateLabelVisibility();
    if (!database.hero.items) return;
    database.hero.items.forEach(
      (item, index) => new Item(item, index, this.section, this.itemsContainer)
    );
  }

  updateLabelVisibility() {
    const heroHasItems = database.hero.items && database.hero.items.length > 0;
    const itemsAreEditable = heroHasItems && this.section.editToggle;
    this.element.classList.toggle("disabled", itemsAreEditable);
    this.labels.classList.toggle("disabled", !heroHasItems);
    this.labels.classList.toggle("items__labels--edit", itemsAreEditable);
    this.itemsContainer.classList.toggle("disabled", !heroHasItems);
  }
}
