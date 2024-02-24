import database from "../../../data/database.js";

export default class ConsumableItem {
  constructor(consumable, index, container, edditToggle) {
    this.consumable = consumable;
    this.index = index;
    this.container = container;
    this.edditToggle = edditToggle;

    this.element = this.initElement();
    this.value = this.element.querySelector(".inventory__item-value");
    this.name = this.element.querySelector(".inventory__item-name");
    this.plsBtn = this.element.querySelector(".inventory__item-plus-btn");
    this.minusBtn = this.element.querySelector(".inventory__item-minus-btn");
    this.updateValue();

    this.name.addEventListener("change", () => this.onNameChange());
    this.plsBtn.addEventListener("click", () => this.onPlsBtnClick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
  }

  initElement() {
    const element = document.createElement("div");
    element.classList.add("inventory__item");
    element.innerHTML = `
        <p class="inventory__item-value">placeholder</p>
        <input class="inventory__item-name" type="text" value="${this.consumable.name}" />
        <button class="inventory__item-minus-btn symbol-btn"><i class="fa-solid fa-minus"></i></button>
        <button class="inventory__item-plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>`;
    this.container.appendChild(element);
    return element;
  }

  onNameChange() {
    this.consumable.name = this.name.value;
    database.saveHero();
  }

  onPlsBtnClick() {
    this.consumable.value++;
    database.saveHero();
    this.updateValue();
  }

  onMinusBtnClick() {
    this.consumable.value--;
    this.value.innerHTML = this.consumable.value;
    if (this.consumable.value < 0) {
      database.hero.consumables.splice(this.index, 1);
      document.dispatchEvent(new Event("resetConsumables"));
    }
    this.updateValue();
    database.saveHero();
  }

  updateValue() {
    this.value.innerHTML = `${this.consumable.value} x`;
  }
}
