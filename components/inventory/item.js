import db from "../../data/db.js";
import hero from "../../data/hero.js";

export default class Item {
  constructor(item, index, container) {
    this.item = item;
    this.index = index;
    this.container = container;
    this.element = this.initElement();
    this.name = this.element.querySelector(".inventory__item-name");
    this.bonus = this.element.querySelector(".inventory__item-bonus");
    this.pool = this.element.querySelector(".inventory__item-pool");
    this.description = this.element.querySelector(
      ".inventory__item-description"
    );
    this.deleteBtn = this.element.querySelector(".inventory__item-delete-btn");
    // events
    this.name.addEventListener("change", () => this.onNameChange());
    this.bonus.addEventListener("change", () => this.onBonusChange());
    this.pool.addEventListener("change", () => this.onPoolChange());
    this.description.addEventListener("change", () =>
      this.onDescriptionChange()
    );
    this.deleteBtn.addEventListener("click", () => this.onDeleteBtnClick());
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

  // ================== init
  initElement() {
    let item = Object.assign(document.createElement("div"), {
      className: "inventory__item",
      innerHTML: `
            <input class="inventory__item-name" type="text" value="${this.item.name}" />
            <input class="inventory__item-bonus" type="text" value="${this.item.bonus}" />
            <input class="inventory__item-pool" type="text" pool="${this.item.bonus}" />
            <input class="inventory__item-description" type="text" value="${this.item.description}" />
            <button class="inventory__item-delete-btn" ><i class="fa-solid fa-x"></i></button>
          `,
    });
    this.container.appendChild(item);
    return item;
  }
}
