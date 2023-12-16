import db from "../../data/db.js";
import hero from "../../data/hero.js";
import StateModal from "./stateModal.js";

export default class ComplexListItem {
  constructor(id, list) {
    this.id = id;
    this.list = list;
    this.dbEntry = db.states[id];

    this.item = this.initItem();
    this.list.appendChild(this.item);
    this.currentMainBtn = this.item.querySelector(".states__current-main-btn");
    this.maxMainBtn = this.item.querySelector(".states__max-main-btn");
    this.updateMainBtnText();

    this.currentMainBtn.addEventListener(
      "click",
      () => new StateModal(this.id)
    );
    if (this.id !== "sp") {
      this.maxMainBtn.addEventListener("click", () => new StateModal(this.id));
    }

    this.item
      .querySelector(".states__current-plus-btn")
      .addEventListener("click", () => this.onCurrentPlusBtnClick());
    this.item
      .querySelector(".states__current-minus-btn")
      .addEventListener("click", () => this.onCurrentMinusBtnClick());

    if (this.id !== "sp") {
      this.item
        .querySelector(".states__max-plus-btn")
        .addEventListener("click", () => this.onMaxPlusBtnClick());
      this.item
        .querySelector(".states__max-minus-btn")
        .addEventListener("click", () => this.onMaxMinusBtnclick());
    }

    document.addEventListener("resetStates", () => {
      this.updateValues();
      this.updateMainBtnText();
    });
  }

  // ===================================================================== init
  initItem() {
    return Object.assign(document.createElement("li"), {
      className: "states__list-item",
      innerHTML: `
        ${this.getCurrentBtns()}
        ${this.getMaxBtns()}`,
    });
  }

  getCurrentBtns() {
    return `
      <button class="states__current-main-btn ${
        this.id === "sp" ? "" : "states__edit-element"
      }">???</button>
      <button class="symbol-btn states__current-minus-btn states__edit-element"><i class="fa-solid fa-minus"></i></button>
      <button class="symbol-btn states__current-plus-btn states__edit-element"><i class="fa-solid fa-plus"></i></button>`;
  }

  getMaxBtns() {
    return this.id === "sp"
      ? ""
      : `
      <button class="states__max-main-btn states__edit-element invisible">???</button>
      <button class="symbol-btn states__max-minus-btn states__edit-element invisible"><i class="fa-solid fa-minus"></i></button>
      <button class="symbol-btn states__max-plus-btn states__edit-element invisible"><i class="fa-solid fa-plus"></i></button>`;
  }

  // ===================================================================== update
  updateMainBtnText() {
    let currentTxt = this.dbEntry.abbreviation;
    currentTxt += `: ${hero.states[this.id].current} von ${this.getMax()}`;
    this.currentMainBtn.innerText = currentTxt;

    if (this.id == "sp") return;
    let maxTxt = `Max ${this.dbEntry.abbreviation}: `;
    maxTxt += this.getMax();
    this.maxMainBtn.innerText = maxTxt;
  }

  updateValues() {
    if (hero.states[this.id].current > this.getMax()) {
      hero.states[this.id].current = this.getMax();
      hero.saveHero();
    }
  }

  // ===================================================================== listener
  onCurrentPlusBtnClick() {
    if (hero.states[this.id].current >= this.getMax()) return;
    hero.states[this.id].current++;
    hero.saveHero();
    this.updateMainBtnText();
  }

  onCurrentMinusBtnClick() {
    if (hero.states[this.id].current <= 0) return;
    hero.states[this.id].current--;
    hero.saveHero();
    this.updateMainBtnText();
  }

  onMaxPlusBtnClick() {
    hero.states[this.id].max++;
    hero.states[this.id].current++;
    hero.saveHero();
    this.updateMainBtnText();
  }

  onMaxMinusBtnclick() {
    if (hero.states[this.id].max <= db.states[this.id].min) return;
    hero.states[this.id].max--;
    hero.states[this.id].current--;
    if (hero.states[this.id].current < 0) hero.states[this.id].current = 0;
    hero.saveHero();
    this.updateMainBtnText();
  }

  // ===================================================================== Helper
  getMax() {
    let max = hero.states[this.id].max;
    if (this.id == "sp") {
      if (hero.talents.findTalent("glueck")) max++;
      if (hero.flaws.findFlaw("pech")) max--;
    }
    if (this.id == "lp") {
      if (hero.talents.findTalent("huene")) max += 2;
    }
    return max;
  }
}
