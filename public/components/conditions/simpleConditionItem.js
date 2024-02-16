import database from "../../data/database.js";
import DescriptionModal from "../../templates/descriptionModal.js";
import PlusBtn from "../../templates/plusBtn.js";
import MinusBtn from "../../templates/minusBtn.js";

export default class SimpleConditionItem {
  constructor(id, section) {
    this.id = id;
    this.section = section;
    this.container = section.content;
    this.dbEntry = database.conditions[id];
    this.element = this.createElement();
    this.mainBtn = this.createMainBtn();
    this.minusBtn = this.createMinusBtn();
    this.plusBtn = this.createPlusBtn();
    document.addEventListener("toggleEdit", () => {
      this.updateMainBtn();
      this.updateBtns();
    });
    document.addEventListener("updateConditions", () => {
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
    let value = database.hero.conditions[this.id];
    return this.dbEntry.abbreviation
      ? `${this.dbEntry.abbreviation}: ${value}`
      : `${this.dbEntry.name}: ${value}`;
  }

  // ================= minus btn
  createMinusBtn() {
    let btn = new MinusBtn(["disabled"], this.element).btn;
    btn.addEventListener("click", () => this.onMinusBtnClick());
    return btn;
  }

  onMinusBtnClick() {
    if (database.hero.conditions[this.id] <= 0) return;
    if (this.id == "stufe") {
      database.hero.conditions.ep += 5;
    }
    database.hero.conditions[this.id]--;
    document.dispatchEvent(new Event("updateConditions"));
    database.saveHero();
  }

  // ================= plus btn
  createPlusBtn() {
    let btn = new PlusBtn(["disabled"], this.element).btn;
    btn.addEventListener("click", () => this.onPlusBtnClick());
    return btn;
  }

  onPlusBtnClick() {
    if (this.id == "stufe") {
      database.hero.conditions.ep -= 5;
    }
    database.hero.conditions[this.id]++;
    document.dispatchEvent(new Event("updateConditions"));
    database.saveHero();
  }

  // ================= helper
  updateMainBtn() {
    this.mainBtn.innerText = this.getMainBtnTxt();
  }

  updateBtns() {
    if (this.id == "stufe") {
      this.plusBtn.disabled = database.hero.conditions.ep < 5;
    }
    this.plusBtn.classList.toggle("disabled", !this.section.editToggle);
    this.minusBtn.classList.toggle("disabled", !this.section.editToggle);
  }
}
