import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import Consumable from "./consumable.js";
import Item from "./item.js";

export default class InventorySection {
  constructor() {
    // basics
    this.section = new Section("Inventar", "inventory");
    this.container = this.section.contentContainer
    // ================== init
    // init consumables
    this.initConsumables()
    this.consContainer = this.container.querySelector(".inventory__consumables-container");
    this.consPlusBtn = this.container.querySelector(".inventory__consumables-plus-btn")
    this.resetConsumables();
    // init items
    this.initInventory()
    this.itemsContainer = this.container.querySelector(".inventory__items-container");
    this.itemsLabels = this.container.querySelector(".inventory__labels");
    this.itemPlusBtn = this.container.querySelector(".inventory__items-plus-btn")
    this.resetItems();
    // init money
    new Money()
    // ================== events
    this.consPlusBtn.addEventListener("click", () => this.onConsumablesPlusClick());
    this.itemPlusBtn.addEventListener("click", () => this.onItemsPlusClick());
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
    this.container.classList.toggle("inventory__edit");
    this.consPlusBtn.classList.toggle("invisible")
    this.itemPlusBtn.classList.toggle("invisible")
  }

  // ================== init
  initConsumables() {
    let element = Object.assign(document.createElement("div"), {
      classList: "",
      innerHTML: `
        <div class="inventory__header">
          <h3>Verbrauchsgegenstände</h3>
          <button class="inventory__consumables-plus-btn symbol-btn invisible"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="inventory__consumables-container"></div>`
    })
    this.container.appendChild(element)
  }

  initInventory() {
    let element = Object.assign(document.createElement("div"), {
      classList: "",
      innerHTML: `
        <div class="inventory__header">
          <h3>Werkzeuge</h3>
          <button class="inventory__items-plus-btn symbol-btn invisible"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="inventory__labels">
          <label>Name</label>
          <label>Bonus</label>
          <label>Pool</label>
          <label>Beschreibung</label>
        </div>
        <div class="inventory__items-container"></div>`
    })
    this.container.appendChild(element)
  }

  // ================== helper
  updateLabelVisibility() {
    this.itemsLabels.classList.toggle("invisible", hero.items.length <= 0)
  }

  resetConsumables() {
    this.consContainer.innerHTML = "";
    hero.consumables.forEach((consumable, index) => {
      new Consumable(consumable, index, this.consContainer);
    });
  }

  resetItems() {
    this.updateLabelVisibility()
    this.itemsContainer.innerHTML = "";
    hero.items.forEach((item, index) => {
      new Item(item, index, this.itemsContainer);
    });
  }
}

class Money {
  constructor(container) {
  }
}