import hero from "../../../data/hero.js";

export default class SingleConsumable {
  constructor(consumable, index, container, edditToggle) {
    this.consumable = consumable;
    this.index = index;
    this.container = container;
    this.edditToggle = edditToggle;
    // init
    this.element = this.initElement();
    this.value = this.element.querySelector(".consumables__item-value");
    this.name = this.element.querySelector(".consumables__item-name");
    this.plsBtn = this.element.querySelector(".consumables__item-plus-btn");
    this.minusBtn = this.element.querySelector(".consumables__item-minus-btn");
    this.updateValue();
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
        <p class="consumables__item-value">placeholder</p>
        <input class="consumables__item-name" type="text" value="${this.consumable.name}" />
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
    hero.saveHero();
    this.updateValue();
  }

  onMinusBtnClick() {
    this.consumable.value--;
    this.value.innerHTML = this.consumable.value;
    if (this.consumable.value < 0) {
      hero.consumables.splice(this.index, 1);
      document.dispatchEvent(new Event("resetConsumables"));
    }
    this.updateValue();
    hero.saveHero();
  }

  // ================== helper
  updateValue() {
    this.value.innerHTML = `${this.consumable.value} x`;
  }
}
