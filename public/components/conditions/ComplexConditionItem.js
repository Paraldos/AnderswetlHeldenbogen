import database from "../../data/database.js";
import DescriptionModal from "../../templates/descriptionModal.js";
import talents from "../../data/talents.js";
import flaws from "../../data/flaws.js";
import PlusBtn from "../../templates/plusBtn.js";
import MinusBtn from "../../templates/minusBtn.js";

export default class ComplexConditionItem {
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
      this.updateBtnClasses();
    });
    document.addEventListener("updateConditions", () => {
      this.updateMainBtn();
      this.updateBtnClasses();
    });
  }

  // ========= create element
  createElement() {
    let element = document.createElement("div");
    element.classList.add("condition__list-item");
    this.container.appendChild(element);
    return element;
  }

  // ========= main btn
  createMainBtn() {
    let btn = document.createElement("button");
    btn.classList.add("condition__main-btn");
    btn.innerText = this.getMainBtnTxt();
    btn.addEventListener("click", () => new DescriptionModal(this.dbEntry));
    this.element.appendChild(btn);
    return btn;
  }

  getMainBtnTxt() {
    if (this.section.editToggle) {
      return `Max ${this.dbEntry.abbreviation}: ${this.getConditionMaxValue()}`;
    } else {
      return `${this.dbEntry.abbreviation}: ${
        this.heroEntry.current
      } von ${this.getConditionMaxValue()}`;
    }
  }

  getConditionMaxValue() {
    let max = this.heroEntry.max;
    if (this.id == "sp") {
      if (talents.findTalent("glueck")) max++;
      if (flaws.findFlaw("pech")) max--;
    }
    if (this.id == "lp") {
      if (talents.findTalent("huene")) max += 2;
    }
    return max;
  }
  // ========= minus btn
  createMinusBtn() {
    let btn = new MinusBtn([], this.element).btn;
    if (!this.section.editToggle) {
      btn.classList.add("condition__btn--alternative");
    }
    btn.addEventListener("click", () => {
      this.section.editToggle ? this.onMinusMax() : this.onMinusCurrent();
      this.updateMainBtn();
    });
    return btn;
  }

  onMinusMax() {
    if (this.heroEntry.max <= this.dbEntry.min) return;
    this.heroEntry.max--;
    this.heroEntry.current--;
    if (this.heroEntry.current < 0) this.heroEntry.current = 0;
    database.saveHero();
  }

  onMinusCurrent() {
    if (this.heroEntry.current <= 0) return;
    this.heroEntry.current--;
    database.saveHero();
  }

  // ========= plus btn
  createPlusBtn() {
    let btn = new PlusBtn([], this.element).btn;
    if (!this.section.editToggle) {
      btn.classList.add("condition__btn--alternative");
    }
    btn.addEventListener("click", () => {
      this.section.editToggle ? this.onPlusMax() : this.onPlusCurrent();
      this.updateMainBtn();
    });
    return btn;
  }

  onPlusMax() {
    this.heroEntry.max++;
    this.heroEntry.current++;
    database.saveHero();
  }

  onPlusCurrent() {
    if (this.heroEntry.current >= this.getConditionMaxValue()) return;
    this.heroEntry.current++;
    database.saveHero();
  }

  // ========= helper
  updateMainBtn() {
    let mainBtn = this.element.querySelector(`.condition__main-btn`);
    mainBtn.innerText = this.getMainBtnTxt();
    document.dispatchEvent(new CustomEvent("updateConditionsHeader"));
  }

  updateBtnClasses() {
    this.minusBtn.classList.toggle(
      "condition__btn--alternative",
      !this.section.editToggle
    );
    this.plusBtn.classList.toggle(
      "condition__btn--alternative",
      !this.section.editToggle
    );
  }
}
