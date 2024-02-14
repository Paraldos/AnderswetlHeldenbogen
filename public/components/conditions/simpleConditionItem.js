import database from "../../data/database.js";
import DescriptionModal from "../../templates/descriptionModal.js";

export default class SimpleConditionItem {
  constructor(id, section) {
    this.id = id;
    this.section = section;
    this.container = section.content;
    this.dbEntry = database.conditions[id];
    this.heroEntry = database.hero.conditions[id];
    this.element = this.createElement();
    this.mainBtn = this.createMainBtn();
    this.plusBtn = this.createPlusBtn();
  }

  // ================= element
  createElement() {
    this.element = document.createElement("li");
    this.element.classList.add("condition__list-item");
    this.container.appendChild(this.element);
    return this.element;
  }

  // ================= main btn
  createMainBtn() {
    let btn = document.createElement("button");
    btn.classList.add("condition__main-btn");
    btn.innerText = this.dbEntry.abbreviation
      ? `${this.dbEntry.abbreviation}: ${this.heroEntry}`
      : `${this.dbEntry.name}: ${this.heroEntry}`;
    btn.addEventListener("click", () => new DescriptionModal(this.dbEntry));
    this.element.appendChild(btn);
    return btn;
  }

  // ================= plus btn
  createPlusBtn() {
    let btn = document.createElement("button");
    btn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    btn.classList.add(
      "condition__plus-btn",
      "condition__edit-element",
      "symbol-btn",
      "disabled"
    );
    btn.addEventListener("click", () => this.onPlusBtnClick());
    this.element.appendChild(btn);
    return btn;
  }

  // ================= minus btn
  createMinusBtn() {
    let btn = document.createElement("button");
    btn.classList.add(
      "symbol-btn",
      "condition__minus-btn",
      "condition__edit-element",
      "symbol-btn",
      "disabled"
    );
    btn.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    return btn;
  }

  onToggleEdit() {
    this.plusBtn.classList.toggle("invisible");
    this.minusBtn.classList.toggle("invisible");
  }

  // ===================================================================== init
  initItem() {
    let element = Object.assign(document.createElement("li"), {
      className: "condition__list-item",
      innerHTML: `
        <button class="condition__main-btn">???</button>
        <button class="symbol-btn condition__minus-btn condition__edit-element symbol-btn disabled"><i class="fa-solid fa-minus"></i></button>
        <button class="symbol-btn condition__plus-btn condition__edit-element symbol-btn disabled"><i class="fa-solid fa-plus"></i></button>`,
    });
    this.container.appendChild(element);
    return element;
  }

  // ===================================================================== update
  onResetCondition() {
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
      this.plusBtn.disabled = this.heroEntry < 5;
    }
    this.minusBtn.disabled = this.heroEntry <= database.conditions[this.id].min;
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
}
