import hero from "../../data/hero.js";
import db from "../../data/db.js";
import TalentModal from "./talentModal.js";

export default class SingleTalent {
  constructor(id, index, btnVisiblity) {
    this.id = id;
    this.index = index;
    this.talent = hero.talents.value[this.index];
    this.dbEntry = db.talents[id];
    this.container = document.querySelector(`.talents__${this.dbEntry.type}`);
    this.element = this.createElement();

    this.mainBtn = this.element.querySelector(".talent__main-btn");
    this.minusBtn = this.element.querySelector(".talent__minus-btn");
    this.plusBtn = this.element.querySelector(".talent__plus-btn");
    this.btns = this.element.querySelectorAll(".symbol-btn");

    this.mainBtn.addEventListener("click", () => this.onMainBtnclick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());

    this.toggleEditBtn(btnVisiblity);
  }

  createElement() {
    const txt = `
      ${this.dbEntry.name}
      ${this.talent.comment ? "*" : ""}
      ${this.dbEntry.max_level > 1 ? `(${this.talent.level})` : ""}
      ${
        this.dbEntry.name == "Veranlagung" &&
        hero.veranlagungsController.getVeranlagungName()
          ? ` (${hero.veranlagungsController.getVeranlagungName()})`
          : ""
      }`;
    let newElement = document.createElement("div");
    newElement.classList.add("talent");
    newElement.innerHTML = `
        <button class="talent__main-btn">${txt}</button>
        <button class="talent__minus-btn symbol-btn">
            <i class="fa-solid fa-minus"></i>
        </button>
        <button class="talent__plus-btn symbol-btn">
            <i class="fa-solid fa-plus"></i>
        </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  onMainBtnclick() {
    new TalentModal(this.dbEntry, this.index);
  }

  onMinusBtnClick() {
    hero.talents.decreaseTalent(this.index);
  }

  onPlusBtnClick() {
    hero.talents.increaseTalent(this.index);
  }

  updateBtns() {
    this.plusBtn.classList.toggle("invisible", this.dbEntry.max_level <= 1);
    this.plusBtn.disabled = this.dbEntry.max_level <= this.talent.level;
    this.minusBtn.disabled = this.talent.innate;
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
