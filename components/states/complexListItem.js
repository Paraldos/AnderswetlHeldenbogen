import db from "../../data/db.js";
import hero from "../../data/hero.js";
import StateModal from "./stateModal.js";

export default class ComplexListItem {
  constructor(id, container) {
    this.id = id;
    this.dbEntry = db.states[id];
    this.container = container;
    this.editToggle = false;
    // init
    this.item = this.initItem();
    this.mainBtn = this.item.querySelector(".states__main-btn");
    this.plusBtn = this.item.querySelector(".states__plus-btn");
    this.minusBtn = this.item.querySelector(".states__minus-btn");
    this.updateMainBtn();
    // events
    this.mainBtn.addEventListener("click", () => new StateModal(this.id));
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    document.addEventListener("resetStates", () => this.updateMainBtn());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  // ===================================================================== init
  initItem() {
    let element = Object.assign(document.createElement("li"), {
      className: "states__list-item",
      innerHTML: `
        <button class="states__main-btn">placeholder</button>
        <button class="symbol-btn states__minus-btn states__btn--alternative"><i class="fa-solid fa-minus"></i></button>
        <button class="symbol-btn states__plus-btn states__btn--alternative"><i class="fa-solid fa-plus"></i></button>`,
    });
    this.container.appendChild(element);
    return element;
  }

  // ===================================================================== update
  updateMainBtn() {
    let txt = "";
    if (this.editToggle && this.id !== "sp") {
      txt = `Max ${this.dbEntry.abbreviation}: `;
      txt += this.getMax();
    } else {
      txt = this.dbEntry.abbreviation;
      txt += `: ${hero.states[this.id].current} von ${this.getMax()}`;
    }
    this.mainBtn.innerText = txt;
  }

  // ===================================================================== listener
  onToggleEdit() {
    this.editToggle = !this.editToggle;
    this.plusBtn.classList.toggle("states__btn--alternative");
    this.minusBtn.classList.toggle("states__btn--alternative");
    if (this.id == "sp") {
      this.plusBtn.classList.toggle("invisible");
      this.minusBtn.classList.toggle("invisible");
    }
    this.updateMainBtn();
  }

  onPlusBtnClick() {
    this.editToggle ? this.onPlusMax() : this.onPlusCurrent();
    document.dispatchEvent(new Event("updateStatesHeader"));
    this.updateMainBtn();
  }

  onMinusBtnClick() {
    this.editToggle ? this.onMinusMax() : this.onMinusCurrent();
    document.dispatchEvent(new Event("updateStatesHeader"));
    this.updateMainBtn();
  }

  onPlusMax() {
    hero.states[this.id].max++;
    hero.states[this.id].current++;
    hero.saveHero();
  }

  onPlusCurrent() {
    if (hero.states[this.id].current >= this.getMax()) return;
    hero.states[this.id].current++;
    hero.saveHero();
  }

  onMinusMax() {
    if (hero.states[this.id].max <= db.states[this.id].min) return;
    hero.states[this.id].max--;
    hero.states[this.id].current--;
    if (hero.states[this.id].current < 0) hero.states[this.id].current = 0;
    hero.saveHero();
  }

  onMinusCurrent() {
    if (hero.states[this.id].current <= 0) return;
    hero.states[this.id].current--;
    hero.saveHero();
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
