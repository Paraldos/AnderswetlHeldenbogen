import database from "../../data/database.js";
import DescriptionModal from "../../templates/descriptionModal.js";
import talents from "../../data/talents.js";
import flaws from "../../data/flaws.js";

export default class ComplexCondition {
  constructor(id, section) {
    this.id = id;
    this.seciton = section;
    this.container = section.content;
    this.dbEntry = database.conditions[id];
    this.heroEntry = database.hero.conditions[id];
    this.editToggle = false;
    this.element = this.createElement();
  }

  // ========= create element
  createElement() {
    let element = document.createElement("div");
    element.classList.add("condition__list-item");
    element.append(
      this.createMainBtn(),
      this.createMinusBtn(),
      this.createPlusBtn()
    );
    this.container.appendChild(element);
    return element;
  }

  // ========= main btn
  createMainBtn() {
    let btn = document.createElement("button");
    btn.classList.add("condition__main-btn");
    btn.innerText = this.getMainBtnTxt();
    btn.addEventListener("click", () => new DescriptionModal(this.dbEntry));
    document.addEventListener("toggleEdit", () => this.updateMainBtn());
    return btn;
  }

  updateMainBtn() {
    let mainBtn = this.element.querySelector(`.condition__main-btn`);
    mainBtn.innerText = this.getMainBtnTxt();
  }

  getMainBtnTxt() {
    if (this.seciton.editToggle) {
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
    let btn = document.createElement("button");
    btn.classList.add("condition__minus-btn", "condition__btn--alternative");
    btn.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    btn.addEventListener("click", () => {
      this.seciton.editToggle ? this.onMinusMax() : this.onMinusCurrent();
      this.updateMainBtn();
      document.dispatchEvent(new CustomEvent("updateConditionsHeader"));
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
    let btn = document.createElement("button");
    btn.classList.add("condition__plus-btn", "condition__btn--alternative");
    btn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    btn.addEventListener("click", () => {
      this.seciton.editToggle ? this.onPlusMax() : this.onPlusCurrent();
      this.updateMainBtn();
      document.dispatchEvent(new CustomEvent("updateConditionsHeader"));
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
}
