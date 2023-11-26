import db from "../db/db.js";
import HeroTalentModal from "./heroTalenteModal.js";

export default class HeroTalent {
  constructor(key, index, btnVisiblity) {
    this.talentIndex = index;
    this.dbEntry = db.talente[key];
    this.initialBtnVisibility = btnVisiblity;
    this.container = document.querySelector(`.talente__${this.dbEntry.type}`);
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".talent__main-btn");
    this.minusBtn = this.element.querySelector(".talent__minus-btn");
    this.addMainBtnListener();
    this.addMinusBtnListener();
  }

  createElement() {
    let newElement = document.createElement("div");
    newElement.classList.add("talent");
    newElement.innerHTML = `
      <button class="talent__main-btn">
        ${this.dbEntry.name}
      </button>
      <button class="talent__minus-btn 
      ${this.initialBtnVisibility ? "" : "invisible"}
      symbol-btn">
        <i class="fa-solid fa-minus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  addMainBtnListener() {
    this.mainBtn.addEventListener(
      "click",
      () => new HeroTalentModal(this.dbEntry)
    );
  }

  addMinusBtnListener() {
    this.minusBtn.addEventListener("click", () => {
      db.heroTalente.splice(this.talentIndex, 1);
      document.dispatchEvent(new Event("resetTalents"));
    });
  }

  toggleEditBtn(btnsVisible) {
    btnsVisible
      ? this.minusBtn.classList.remove("invisible")
      : this.minusBtn.classList.add("invisible");
  }
}
