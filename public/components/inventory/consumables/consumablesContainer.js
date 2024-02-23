import database from "../../../data/database.js";
import SingleConsumable from "./singleConsumable.js";

export default class ConsumablesContainer {
  constructor(sectionContainer) {
    this.sectionContainer = sectionContainer;
    this.editToggle = false;
    // init
    this.header = this.initHeader();
    this.body = this.initBody();
    this.plusBtn = this.header.querySelector(".consumables__plus-btn");
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    this.resetConsumables();
    this.changeVisibility();
    // events
    document.addEventListener("resetConsumables", () =>
      this.resetConsumables()
    );
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  // ================== init
  initHeader() {
    const header = document.createElement("div");
    header.className = "inventory__header";
    header.innerHTML = `
      <h3>Verbrauchsgegenstände</h3>
      <button class="consumables__plus-btn symbol-btn invisible"><i class="fa-solid fa-plus"></i></button>`;
    this.sectionContainer.appendChild(header);
    return header;
  }

  initBody() {
    const body = document.createElement("div");
    body.className = "consumables__body";
    body.innerHTML = ``;
    this.sectionContainer.appendChild(body);
    return body;
  }

  // ================== events
  onToggleEdit() {
    this.editToggle = !this.editToggle;
    this.plusBtn.classList.toggle("invisible", !this.editToggle);
    this.changeVisibility();
  }

  onPlusBtnClick() {
    hero.consumables.push({ name: "", value: 0 });
    hero.saveHero();
    this.resetConsumables();
  }

  resetConsumables() {
    this.body.innerHTML = "";
    hero.consumables.forEach((consumable, index) => {
      new SingleConsumable(consumable, index, this.body, this.editToggle);
    });
  }

  // ================== helper
  changeVisibility() {
    if (hero.consumables.length <= 0) {
      this.header.classList.toggle("invisible", !this.editToggle);
      this.body.classList.toggle("invisible", !this.editToggle);
    }
  }
}
