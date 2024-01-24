import hero from "../../../data/hero.js";

export default class Item {
  constructor(item, index, container, editToggle) {
    this.item = item;
    this.index = index;
    this.container = container;
    this.editToggle = !editToggle;
    // init
    this.element = this.initElement();
    this.name = this.element.querySelector(".items__item-name");
    this.bonus = this.element.querySelector(".items__item-bonus");
    this.pool = this.element.querySelector(".items__item-pool");
    this.description = this.element.querySelector(".items__item-description");
    this.deleteBtn = this.element.querySelector(".items__item-delete-btn");
    this.onToggleEdit();
    // events
    this.name.addEventListener("change", () => this.onNameChange());
    this.bonus.addEventListener("change", () => this.onBonusChange());
    this.pool.addEventListener("change", () => this.onPoolChange());
    this.description.addEventListener("change", () =>
      this.onDescriptionChange()
    );
    this.deleteBtn.addEventListener("click", () => this.onDeleteBtnClick());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  onToggleEdit() {
    this.editToggle = !this.editToggle;
    this.name.disabled = !this.editToggle;
    this.bonus.disabled = !this.editToggle;
    this.pool.disabled = !this.editToggle;
    this.description.disabled = !this.editToggle;
    this.element.classList.toggle("items__item--edit", this.editToggle);
    this.deleteBtn.classList.toggle("invisible", !this.editToggle);
  }

  // ================== init
  initElement() {
    let visibility = this.editToggle ? "" : "invisible";
    let item = Object.assign(document.createElement("div"), {
      className: "items__item",
      innerHTML: `
        <input class="items__item-name" type="text" value="${this.item.name}" />
        <input class="items__item-bonus" type="text" value="${this.item.bonus}" />
        <input class="items__item-pool" type="text" value="${this.item.pool}" />
        <input class="items__item-description" type="text" value="${this.item.description}" />
        <button class="items__item-delete-btn ${visibility}"><i class="fa-solid fa-x"></i></button>`,
    });
    this.container.appendChild(item);
    return item;
  }

  // ================== events
  onNameChange() {
    this.item.name = this.name.value;
    hero.saveHero();
  }

  onBonusChange() {
    this.item.bonus = this.bonus.value;
    hero.saveHero();
  }

  onPoolChange() {
    this.item.pool = this.pool.value;
    hero.saveHero();
  }

  onDescriptionChange() {
    this.item.description = this.description.value;
    hero.saveHero();
  }

  onDeleteBtnClick() {
    hero.items.splice(this.index, 1);
    hero.saveHero();
    document.dispatchEvent(new Event("resetItems"));
  }
}
