import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import FlawModal from "./flawModal.js";
import FlawsModal from "./flawsModal.js";

export default class FlawsSection {
  constructor() {
    this.section = new Section("Schwächen", "flaws", true);
    this.editToggle = false;
    this.container = document.querySelector(".flaws__content");
    this.flaws = this.addFlaws();
    this.section.plusBtn.addEventListener("click", () => new FlawsModal());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
    document.addEventListener("resetFlaws", () => this.onReset());
  }

  addFlaws() {
    if (!hero.flaws.value) return [];
    return hero.flaws.value.map(
      (el, index) => new SingleFlaw(el.id, index, this.editToggle)
    );
  }

  onToggleEdit() {
    this.editToggle = !this.editToggle;
    this.flaws.forEach((el) => el.toggleEditBtn(this.editToggle));
    this.updateSectionHeader();
  }

  onReset() {
    this.container.innerHTML = "";
    this.flaws = this.addFlaws();
    this.updateSectionHeader();
  }

  updateSectionHeader() {
    const visible = this.editToggle ? "" : "invisible";
    this.section.headerText.innerHTML = `Schwächen <span class="${visible}">(${this.getFlawsSum()})</span>`;
  }

  getFlawsSum() {
    return hero.flaws.value.length;
  }
}

class SingleFlaw {
  constructor(id, index, btnsVisiblity) {
    this.id = id;
    this.index = index;
    this.container = document.querySelector(".flaws__content");
    this.dbEntry = db.flaws[id];
    this.flaw = hero.flaws.value[this.index];
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".flaw__main-btn");
    this.minusBtn = this.element.querySelector(".flaw__minus-btn");
    this.mainBtn.addEventListener("click", () => this.onMainBtnClick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    this.updateBtns();
    this.toggleEditBtn(btnsVisiblity);
  }

  createElement() {
    const txt = `${this.dbEntry.name}${this.flaw.comment ? "*" : ""}`;
    let newElement = document.createElement("div");
    newElement.classList.add("flaw");
    newElement.innerHTML = `
      <button class="flaw__main-btn">${txt}</button>
      <button class="flaw__minus-btn symbol-btn">
        <i class="fa-solid fa-minus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  updateBtns() {
    this.flaw.innate
      ? this.minusBtn.setAttribute("disabled", true)
      : this.minusBtn.removeAttribute("disabled");
  }

  onMainBtnClick() {
    new FlawModal(this.dbEntry, this.index);
  }

  onMinusBtnClick() {
    hero.flaws.removeFlaw(this.index);
  }

  toggleEditBtn(btnsVisible) {
    if (btnsVisible) {
      this.minusBtn.classList.remove("invisible");
    } else {
      this.minusBtn.classList.add("invisible");
    }
    this.updateBtns();
  }
}
