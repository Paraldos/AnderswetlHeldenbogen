import db from "../../data/db.js";
import hero from "../../data/hero.js";

export default class Consumable {
  constructor(consumable, index, container) {
    this.consumable = consumable;
    this.index = index;
    this.container = container;
    this.element = this.initElement();

    this.value = this.element.querySelector(".inventory__consumable-value");

    this.name = this.element.querySelector(".inventory__consumable-name");
    this.name.addEventListener("change", () => this.onNameChange());

    this.plsBtn = this.element.querySelector(".inventory__consumable-plus-btn");
    this.plsBtn.addEventListener("click", () => this.onPlsBtnClick());

    this.minusBtn = this.element.querySelector(
      ".inventory__consumable-minus-btn"
    );
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
  }

  // ================== init
  initElement() {
    let element = Object.assign(document.createElement("div"), {
      className: "inventory__consumable",
      innerHTML: `
          <input class="inventory__consumable-name" type="text" value="${this.consumable.name}" />
          <p class="inventory__consumable-value">${this.consumable.value}</p>
          <button class="inventory__consumable-minus-btn symbol-btn"><i class="fa-solid fa-minus"></i></button>
          <button class="inventory__consumable-plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>`,
    });
    this.container.appendChild(element);
    return element;
  }

  // ================== events
  onNameChange() {
    this.consumable.name = this.name.value;
    hero.saveHero();
  }

  onPlsBtnClick() {
    this.consumable.value++;
    this.value.innerHTML = this.consumable.value;
    hero.saveHero();
  }

  onMinusBtnClick() {
    this.consumable.value--;
    this.value.innerHTML = this.consumable.value;
    if (this.consumable.value < 0) {
      hero.consumables.splice(this.index, 1);
      this.element.remove();
    }
    hero.saveHero();
  }
}
