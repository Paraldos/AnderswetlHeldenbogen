import hero from "../../data/hero.js";
import Consumable from "./consumable.js";

export default class Consumables {
  constructor(sectionContainer) {
    this.sectionContainer = sectionContainer;
    this.header = this.initHeader();
    this.body = this.initBody();
    this.plusBtn = this.header.querySelector(".consumables__plus-btn");
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    this.resetConsumables();
  }

  initHeader() {
    const header = document.createElement("div");
    header.className = "consumables__header";
    header.innerHTML = `
      <h3>Verbrauchsgegenstände</h3>
      <button class="consumables__plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>`;
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

  onPlusBtnClick() {
    hero.consumables.push({ name: "", value: 0 });
    hero.saveHero();
    this.reset();
  }

  resetConsumables() {
    this.body.innerHTML = "";
    hero.consumables.forEach((consumable, index) => {
      new Consumable(consumable, index, this.body);
    });
  }
}
