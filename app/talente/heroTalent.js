import db from "../db/db.js";
import hero from "../hero/hero.js";
import HeroTalentModal from "./heroTalenteModal.js";

export default class HeroTalent {
  constructor(id, index, btnVisiblity) {
    this.index = index;
    this.dbEntry = db.talente[id];
    this.container = document.querySelector(`.talente__${this.dbEntry.type}`);
    this.element = this.createElement(btnVisiblity);
    this.mainBtn = this.element.querySelector(".talent__main-btn");
    this.minusBtn = this.element.querySelector(".talent__minus-btn");
    this.addMainBtnListener();
    this.addMinusBtnListener();
  }

  createElement(btnVisiblity) {
    let newElement = document.createElement("div");
    newElement.classList.add("talent");
    let name = this.dbEntry.name;
    let level =
      this.dbEntry.max_level > 1 ? `(${hero.talente[this.index].level})` : "";
    newElement.innerHTML = `
      <button class="talent__main-btn">${name} ${level}</button>
      <button class="talent__minus-btn 
      ${btnVisiblity ? "" : "invisible"}
      symbol-btn">
        <i class="fa-solid fa-minus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  addMainBtnListener() {
    this.mainBtn.addEventListener(
      "click",
      () => new HeroTalentModal(this.dbEntry, this.index)
    );
  }

  addMinusBtnListener() {
    this.minusBtn.addEventListener("click", () => {
      hero.talente.splice(this.index, 1);
      hero.saveHero();
      document.dispatchEvent(new Event("resetTalents"));
    });
  }

  toggleEditBtn(btnsVisible) {
    btnsVisible
      ? this.minusBtn.classList.remove("invisible")
      : this.minusBtn.classList.add("invisible");
  }
}
