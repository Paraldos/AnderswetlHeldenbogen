import db from "../db/db.js";
import hero from "../hero/hero.js";
import HeroTalentModal from "./heroTalentModal.js";

export default class HeroTalent {
  constructor(id, index, btnVisiblity) {
    this.id = id;
    this.index = index;
    this.dbEntry = db.talente[id];
    this.container = document.querySelector(`.talente__${this.dbEntry.type}`);
    this.element = this.createElement(btnVisiblity);
    this.mainBtn = this.element.querySelector(".talent__main-btn");
    this.minusBtn = this.element.querySelector(".talent__minus-btn");
    this.plusBtn = this.element.querySelector(".talent__plus-btn");
    this.btns = this.element.querySelectorAll(".symbol-btn");
    this.addMainBtnListener();
    this.addMinusBtnListener();
    this.addPlusBtnListener();
    this.updateBtns();
  }

  createElement(btnVisiblity) {
    let name = this.dbEntry.name;
    let comment = hero.talente[this.index].comment ? "*" : "";
    let level =
      this.dbEntry.max_level > 1 ? `(${hero.talente[this.index].level})` : "";

    let newElement = document.createElement("div");
    newElement.classList.add("talent");
    newElement.innerHTML = `
      <button class="talent__main-btn">${name}${comment} ${level}</button>
      <button class="talent__minus-btn 
      ${btnVisiblity ? "" : "invisible"}
      symbol-btn">
        <i class="fa-solid fa-minus"></i>
      </button>
      <button class="talent__plus-btn 
      ${btnVisiblity ? "" : "invisible"}
      symbol-btn">
        <i class="fa-solid fa-plus"></i>
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
      hero.decreaseTalent(this.index);
    });
  }

  addPlusBtnListener() {
    this.plusBtn.addEventListener("click", () => {
      hero.increaseTalent(this.index);
    });
  }

  updateBtns() {
    // plus
    this.plusBtn.removeAttribute("disabled");
    if (this.dbEntry.max_level <= 1) {
      this.plusBtn.classList.add("invisible");
    }
    if (hero.talente[this.index].level >= this.dbEntry.max_level) {
      this.plusBtn.setAttribute("disabled", true);
    }
    // minus
    this.minusBtn.removeAttribute("disabled");
    if (hero.talente[this.index].volksTalent) {
      this.minusBtn.setAttribute("disabled", true);
    }
  }

  toggleEditBtn(btnsVisible) {
    if (btnsVisible) {
      this.minusBtn.classList.remove("invisible");
      this.plusBtn.classList.remove("invisible");
      this.updateBtns();
    } else {
      this.minusBtn.classList.add("invisible");
      this.plusBtn.classList.add("invisible");
    }
  }
}
