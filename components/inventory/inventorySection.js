import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import Consumable from "./consumable.js";

export default class InventorySection {
  constructor() {
    this.section = new Section("Inventar", "inventory");
    this.initSection();
    this.consuamblesContainer = this.section.contentContainer.querySelector(
      ".inventory__consumables-container"
    );
    this.addConsumables();
    this.section.contentContainer
      .querySelector(".inventory__consumables-plus-btn")
      .addEventListener("click", () => {
        hero.consumables.push({ name: "", value: 0 });
        hero.saveHero();
        this.addConsumables();
      });
  }

  // ================== init
  initSection() {
    this.section.contentContainer.innerHTML = `
        <div class="inventory__header">
            <h3>Verbrauchsgegenstände</h3>
            <button class="inventory__consumables-plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="inventory__consumables-container"></div>`;
  }

  addConsumables() {
    this.consuamblesContainer.innerHTML = "";
    hero.consumables.forEach((consumable, index) => {
      new Consumable(consumable, index, this.consuamblesContainer);
    });
  }
}
