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
    this.minusBtn = this.createMinusBtn();
    this.plusBtn = this.createPlusBtn();
    document.addEventListener("toggleEdit", () => {
      this.updateMainBtn();
      this.updateBtns();
    });
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
    btn.innerText = this.getMainBtnTxt();
    btn.addEventListener("click", () => new DescriptionModal(this.dbEntry));
    this.element.appendChild(btn);
    return btn;
  }

  getMainBtnTxt() {
    return this.dbEntry.abbreviation
      ? `${this.dbEntry.abbreviation}: ${this.heroEntry}`
      : `${this.dbEntry.name}: ${this.heroEntry}`;
  }

  // ================= minus btn
  createMinusBtn() {
    let btn = document.createElement("button");
    btn.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    btn.classList.add(
      "condition__minus-btn",
      "condition__edit-element",
      "symbol-btn"
    );
    this.element.appendChild(btn);
    return btn;
  }

  onToggleEdit() {
    this.plusBtn.classList.toggle("invisible");
    this.minusBtn.classList.toggle("invisible");
  }

  // ================= plus btn
  createPlusBtn() {
    let btn = document.createElement("button");
    btn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    btn.classList.add(
      "condition__plus-btn",
      "condition__edit-element",
      "symbol-btn"
    );
    btn.addEventListener("click", () => this.onPlusBtnClick());
    this.element.appendChild(btn);
    return btn;
  }

  onPlusBtnClick() {
    if (this.id == "stufe") {
      hero.states.ep -= 5;
    }
    hero.states[this.id]++;
    document.dispatchEvent(new Event("resetStates"));
    hero.saveHero();
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
  updateMainBtn() {
    this.this.mainBtn.innerText = this.getMainBtnTxt();
  }

  updateBtns() {
    if (this.id == "stufe") {
      this.plusBtn.disabled = this.heroEntry < 5;
    }
    this.minusBtn.disabled = this.heroEntry <= database.conditions[this.id].min;
  }

  // ===================================================================== listener

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
