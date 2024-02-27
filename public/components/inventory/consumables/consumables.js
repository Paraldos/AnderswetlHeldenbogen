import ConsumablesController from "../../../javascript/consumablesController.js";
import ConsumableItem from "./consumableItem.js";

export default class Consumables {
  constructor(section) {
    this.section = section;
    this.consumables = this.createConsumables();
    this.header = this.consumables.querySelector(".inventory__sub-header");
    this.plusBtn = this.consumables.querySelector(".inventory__plus-btn");
    this.container = this.consumables.querySelector(".inventory__container");
    this.reset();
    this.update();
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    document.addEventListener("resetConsumables", () => this.reset());
    document.addEventListener("toggleEdit", () => this.update());
  }

  createConsumables() {
    const consumables = document.createElement("div");
    consumables.classList.add("inventory__consumables");
    consumables.classList.add("inventory__sub-section");
    consumables.innerHTML = `
        <div class="inventory__sub-header">
          <h3>Verbrauchsgegenstände</h3>
          <button class="inventory__plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>
        </div>
        <div class="inventory__container"></div>
      `;
    this.section.content.appendChild(consumables);
    return consumables;
  }

  onPlusBtnClick() {
    ConsumablesController.add();
  }

  reset() {
    this.container.innerHTML = "";
    ConsumablesController.getHeroList().forEach((consumable, index) => {
      new ConsumableItem(consumable, index, this.container, this.section);
    });
    this.update();
  }

  update() {
    const heroHasItems = ConsumablesController.getHeroList().length > 0;
    const editToggle = this.section.editToggle;
    this.consumables.classList.toggle("disabled", !heroHasItems && !editToggle);
    this.plusBtn.classList.toggle("disabled", !this.section.editToggle);
  }
}
