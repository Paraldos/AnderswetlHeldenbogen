import hero from "../../data/hero.js";
import Consumable from "./consumable.js";

export default class Consumables {
  constructor(container) {
    this.mainContainer = container;
    this.consumables = this.init();
    this.consContainer = this.consumables.querySelector(
      ".inventory__consumables-container"
    );
    this.plusBtn = this.consumables.querySelector(
      ".inventory__consumables-plus-btn"
    );
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    this.resetConsumables();
  }

  init() {
    const consumables = Object.assign(document.createElement("div"), {
      innerHTML: `
          <div class="inventory__header">
            <h3>Verbrauchsgegenstände</h3>
            <button class="inventory__consumables-plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>
          </div>
          <div class="inventory__consumables-container"></div>`,
    });
    this.mainContainer.appendChild(consumables);
    return consumables;
  }

  onPlusBtnClick() {
    hero.consumables.push({ name: "", value: 0 });
    hero.saveHero();
    this.reset();
  }

  resetConsumables() {
    this.consContainer.innerHTML = "";
    hero.consumables.forEach((consumable, index) => {
      new Consumable(consumable, index, this.consContainer);
    });
  }
}
