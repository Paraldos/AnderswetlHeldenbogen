import db from "../../data/db.js";
import hero from "../../data/hero.js";

export default class Consumable {
  constructor(consumable, index, container) {
    this.consumable = consumable;
    this.index = index;
    this.container = container;
    this.element = this.initElement();

    this.value = this.element.querySelector(".consumable__value");

    this.name = this.element.querySelector(".consumable__name");
    this.name.addEventListener("change", () => this.onNameChange());

    this.plsBtn = this.element.querySelector(".consumable__plus-btn");
    this.plsBtn.addEventListener("click", () => this.onPlsBtnClick());

    this.minusBtn = this.element.querySelector(".consumable__minus-btn");
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
  }

  // ================== init
  initElement() {
    let element = Object.assign(document.createElement("div"), {
      className: "consumable",
      innerHTML: `
          <input class="consumable__name" type="text" value="${this.consumable.name}" />
          <p class="consumable__value">${this.consumable.value}</p>
          <button class="consumable__minus-btn symbol-btn"><i class="fa-solid fa-minus"></i></button>
          <button class="consumable__plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>`,
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
