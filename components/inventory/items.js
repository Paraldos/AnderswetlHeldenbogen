import hero from "../../data/hero.js";
import Item from "./item.js";

export default class Items {
  constructor(container) {
    this.mainContainer = container;
    this.items = this.init();
    this.itemsContainer = this.items.querySelector(
      ".inventory__items-container"
    );
    this.itemsLabels = this.items.querySelector(".inventory__labels");
    this.plusBtn = this.items.querySelector(".inventory__items-plus-btn");
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    document.addEventListener("resetItems", () => this.resetItems());
    this.resetItems();
  }

  init() {
    let element = Object.assign(document.createElement("div"), {
      innerHTML: `
        <div class="inventory__header">
          <h3>Werkzeuge</h3>
          <button class="inventory__items-plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="inventory__labels">
          <label>Name</label>
          <label>Bonus</label>
          <label>Pool</label>
          <label>Beschreibung</label>
        </div>
        <div class="inventory__items-container"></div>`,
    });
    this.mainContainer.appendChild(element);
    return element;
  }

  onPlusBtnClick() {
    hero.items.push({ name: "", description: "", bonus: 0 });
    hero.saveHero();
    this.resetItems();
  }

  resetItems() {
    this.updateLabelVisibility();
    this.itemsContainer.innerHTML = "";
    hero.items.forEach((item, index) => {
      new Item(item, index, this.itemsContainer);
    });
  }

  updateLabelVisibility() {
    this.itemsLabels.classList.toggle("invisible", hero.items.length <= 0);
  }
}
