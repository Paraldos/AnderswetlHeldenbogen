import db from "../../data/db.js";
import hero from "../../data/hero.js";
import StateModal from "./stateModal.js";

export default class SimpleListItem {
  constructor(id, list) {
    this.id = id;
    this.list = list;
    this.dbEntry = db.states[id];

    this.item = this.initItem();
    this.list.appendChild(this.item);
    this.mainBtn = this.item.querySelector(".states__main-btn");
    this.updateMainBtnText();
    this.mainBtn.addEventListener("click", () => new StateModal(this.id));

    if (this.id != "tempo") {
      this.plusBtn = this.item.querySelector(".states__plus-btn");
      this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());

      this.minusBtn = this.item.querySelector(".states__minus-btn");
      this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
      this.updateBtns();
    }

    document.addEventListener("resetStates", () => {
      this.updateMainBtnText();
      this.updateBtns();
    });
  }

  // ===================================================================== init
  initItem() {
    return Object.assign(document.createElement("li"), {
      className: "states__list-item",
      innerHTML: `
        <button class="states__main-btn">???</button>
        ${this.getBtns()}`,
    });
  }

  getBtns() {
    return this.id === "tempo"
      ? ""
      : `
      <button class="symbol-btn states__minus-btn states__edit-element invisible"><i class="fa-solid fa-minus"></i></button>
      <button class="symbol-btn states__plus-btn states__edit-element invisible"><i class="fa-solid fa-plus"></i></button>`;
  }

  // ===================================================================== update
  updateMainBtnText() {
    let txt = this.dbEntry.abbreviation
      ? this.dbEntry.abbreviation
      : this.dbEntry.name;
    txt += `: ${this.getValue()}`;
    this.mainBtn.innerText = txt;
  }

  updateBtns() {
    if (this.id === "tempo") return;
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
      hero.states[this.id]--;
      document.dispatchEvent(new Event("resetStates"));
      hero.saveHero();
    }
  }

  // ===================================================================== helper
  getValue() {
    let value = hero.states[this.id];
    if (this.id == "tempo" && hero.flaws.findFlaw("lahm")) value -= 2;
    return value;
  }
}
