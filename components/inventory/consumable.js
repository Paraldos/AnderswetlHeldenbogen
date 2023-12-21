import hero from "../../data/hero.js";

export default class Consumable {
  constructor(consumable, index, container) {
    this.consumable = consumable;
    this.index = index;
    this.container = container;
    // init
    this.element = this.initElement();
    this.value = this.element.querySelector(".consumables__item-value");
    this.name = this.element.querySelector(".consumables__item-name");
    this.plsBtn = this.element.querySelector(".consumables__item-plus-btn");
    this.minusBtn = this.element.querySelector(".consumables__item-minus-btn");
    // events
    this.name.addEventListener("change", () => this.onNameChange());
    this.plsBtn.addEventListener("click", () => this.onPlsBtnClick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
  }

  // ================== init
  initElement() {
    let element = Object.assign(document.createElement("div"), {
      className: "consumables__item",
      innerHTML: `
          <input class="consumables__item-name" type="text" value="${this.consumable.name}" />
          <p class="consumables__item-value">${this.consumable.value}</p>
          <button class="consumables__item-minus-btn symbol-btn"><i class="fa-solid fa-minus"></i></button>
          <button class="consumables__item-plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>`,
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
