import database from "../../data/database.js";
import StateModal from "./stateModal.js";

export default class SimpleCondition {
  constructor(id, container) {
    this.id = id;
    this.container = container;
    this.dbEntry = db.states[id];
    // init
    this.item = this.initItem();
    this.mainBtn = this.item.querySelector(".states__main-btn");
    this.plusBtn = this.item.querySelector(".states__plus-btn");
    this.minusBtn = this.item.querySelector(".states__minus-btn");
    this.updateMainBtn();
    this.updateBtns();
    // events
    this.mainBtn.addEventListener("click", () => new StateModal(this.id));
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    document.addEventListener("resetStates", () => this.onResetStates());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  onToggleEdit() {
    this.plusBtn.classList.toggle("invisible");
    this.minusBtn.classList.toggle("invisible");
  }

  // ===================================================================== init
  initItem() {
    let element = Object.assign(document.createElement("li"), {
      className: "states__list-item",
      innerHTML: `
        <button class="states__main-btn">???</button>
        <button class="symbol-btn states__minus-btn states__edit-element invisible"><i class="fa-solid fa-minus"></i></button>
        <button class="symbol-btn states__plus-btn states__edit-element invisible"><i class="fa-solid fa-plus"></i></button>`,
    });
    this.container.appendChild(element);
    return element;
  }

  // ===================================================================== update
  onResetStates() {
    this.updateMainBtn();
    this.updateBtns();
  }

  updateMainBtn() {
    let txt = this.dbEntry.abbreviation
      ? this.dbEntry.abbreviation
      : this.dbEntry.name;
    txt += `: ${this.getValue()}`;
    this.mainBtn.innerText = txt;
  }

  updateBtns() {
    if (this.id == "stufe") {
      this.plusBtn.disabled = hero.states.ep < 5;
    }
    this.minusBtn.disabled = hero.states[this.id] <= db.states[this.id].min;
  }

  // ===================================================================== listener
  onPlusBtnClick() {
    if (this.id == "stufe") {
      hero.states.ep -= 5;
    }
    hero.states[this.id]++;
    document.dispatchEvent(new Event("resetStates"));
    hero.saveHero();
  }

  onMinusBtnClick() {
    if (hero.states[this.id] > 0) {
      if (this.id == "stufe") {
        hero.states.ep += 5;
      }
      hero.states[this.id]--;
      document.dispatchEvent(new Event("resetStates"));
      hero.saveHero();
    }
  }

  // ===================================================================== helper
  getValue() {
    let value = hero.states[this.id];
    return value;
  }
}
