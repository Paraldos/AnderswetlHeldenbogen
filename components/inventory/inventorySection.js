import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import Consumable from "./consumable.js";
import Item from "./item.js";

export default class InventorySection {
  constructor() {
    this.section = new Section("Inventar", "inventory");
    // init
    this.initSection();
    this.consuamblesContainer = this.section.contentContainer.querySelector(
      ".inventory__consumables-container"
    );
    this.resetConsumables();
    this.itemsContainer = this.section.contentContainer.querySelector(
      ".inventory__items-container"
    );
    this.itemsLabels =
      this.section.contentContainer.querySelector(".inventory__labels");
    this.resetItems();
    // events
    this.section.contentContainer
      .querySelector(".inventory__consumables-plus-btn")
      .addEventListener("click", () => this.onConsumablesPlusClick());
    this.section.contentContainer
      .querySelector(".inventory__items-plus-btn")
      .addEventListener("click", () => this.onItemsPlusClick());
    this.section.editBtn.addEventListener("click", () => this.onEditBtnClick());
    document.addEventListener("resetItems", () => this.resetItems());
  }

  // ================== events
  onConsumablesPlusClick() {
    hero.consumables.push({ name: "", value: 0 });
    hero.saveHero();
    this.resetConsumables();
  }

  onItemsPlusClick() {
    hero.items.push({ name: "", description: "", bonus: 0 });
    hero.saveHero();
    this.resetItems();
  }

  onEditBtnClick() {
    this.section.contentContainer.classList.toggle("inventory__edit");
  }

  // ================== init
  initSection() {
    this.section.contentContainer.innerHTML = `
      <div>
        <div class="inventory__header">
            <h3>Verbrauchsgegenstände</h3>
            <button class="inventory__consumables-plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="inventory__consumables-container"></div>
      </div>

      <div>
        <div class="inventory__header">
          <h3>Werkzeuge</h3>
          <button class="inventory__items-plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="inventory__labels">
          <label class="item__label">Name</label>
          <label class="item__label">Bonus</label>
          <label class="item__label">Pool</label>
          <label class="item__label">Beschreibung</label>
        </div>
        <div class="inventory__items-container"></div>
      </div>
    `;
  }

  resetConsumables() {
    this.consuamblesContainer.innerHTML = "";
    hero.consumables.forEach((consumable, index) => {
      new Consumable(consumable, index, this.consuamblesContainer);
    });
  }

  resetItems() {
    this.itemsContainer.innerHTML = "";
    hero.items.forEach((item, index) => {
      new Item(item, index, this.itemsContainer);
    });
  }
}
