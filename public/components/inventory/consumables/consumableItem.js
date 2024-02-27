import ConsumablesController from "../../../javascript/consumablesController.js";

export default class ConsumableItem {
  constructor(consumable, index, container, section) {
    this.consumable = consumable;
    this.index = index;
    this.container = container;
    this.section = section;

    this.element = this.initElement();
    this.value = this.element.querySelector(".inventory__item-value");
    this.name = this.element.querySelector(".inventory__item-name");
    this.xBtn = this.element.querySelector(".inventory__item-x-btn");
    this.plsBtn = this.element.querySelector(".inventory__item-plus-btn");
    this.minusBtn = this.element.querySelector(".inventory__item-minus-btn");
    this.update();
    this.onToggleEdit();

    this.name.addEventListener("change", () => this.onNameChange());
    this.xBtn.addEventListener("click", () => this.onXBtnClick());
    this.plsBtn.addEventListener("click", () => this.onPlsBtnClick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
    document.addEventListener("updateConsumables", () => this.update());
  }

  initElement() {
    const element = document.createElement("div");
    element.classList.add("inventory__item");
    element.innerHTML = `
        <p class="inventory__item-value">placeholder</p>
        <input class="inventory__item-name" type="text" value="${this.consumable.name}" />
        <button class="inventory__item-x-btn symbol-btn"><i class="fa-solid fa-x"></i></button>
        <button class="inventory__item-minus-btn symbol-btn symbol-btn--alternative"><i class="fa-solid fa-minus"></i></button>
        <button class="inventory__item-plus-btn symbol-btn symbol-btn--alternative"><i class="fa-solid fa-plus"></i></button>`;
    this.container.appendChild(element);
    return element;
  }

  onNameChange() {
    ConsumablesController.changeName(this.index, this.name.value);
  }

  onXBtnClick() {
    ConsumablesController.remove(this.index);
  }

  onPlsBtnClick() {
    ConsumablesController.increase(this.index);
  }

  onMinusBtnClick() {
    ConsumablesController.reduce(this.index);
  }

  update() {
    this.value.innerHTML = `${this.consumable.value} x`;

    this.xBtn.classList.toggle("disabled", !this.section.editToggle);
    this.minusBtn.classList.toggle("disabled", this.section.editToggle);
    this.plsBtn.classList.toggle("disabled", this.section.editToggle);

    this.minusBtn.disabled =
      this.consumable.value <= 0 && !this.section.editToggle;
  }

  onToggleEdit() {
    this.name.disabled = this.section.editToggle ? false : true;
    this.update();
  }
}
