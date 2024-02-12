import database from "../../data/database.js";
import StateModal from "./conditionModal.js";

export default class ComplexCondition {
  constructor(id, container) {
    this.id = id;
    this.dbEntry = database.hero.conditions[id];
    this.container = container;
    this.editToggle = false;
    // init
    this.item = this.initItem();
    this.mainBtn = this.item.querySelector(".condition__main-btn");
    this.plusBtn = this.item.querySelector(".condition__plus-btn");
    this.minusBtn = this.item.querySelector(".condition__minus-btn");
    this.updateBtns();
    // events
    this.mainBtn.addEventListener("click", () => new StateModal(this.id));
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    document.addEventListener("resetCondition", () => this.updateBtns());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  // ===================================================================== init
  initItem() {
    let element = Object.assign(document.createElement("li"), {
      className: "condition__list-item",
      innerHTML: `
        <button class="condition__main-btn">placeholder</button>
        <button class="symbol-btn condition__minus-btn condition__btn--alternative"><i class="fa-solid fa-minus"></i></button>
        <button class="symbol-btn condition__plus-btn condition__btn--alternative"><i class="fa-solid fa-plus"></i></button>`,
    });
    this.container.appendChild(element);
    return element;
  }

  // ===================================================================== update
  updateBtns() {
    this.updateMainBtn();
    this.updatePlusMinusBtns();
  }

  updateMainBtn() {
    let txt = "";
    if (this.editToggle && this.id !== "sp") {
      txt = `Max ${this.dbEntry.abbreviation}: `;
      txt += this.getMax();
    } else {
      txt = this.dbEntry.abbreviation;
      txt += `: ${
        database.hero.conditions[this.id].current
      } von ${this.getMax()}`;
    }
    this.mainBtn.innerText = txt;
  }

  updatePlusMinusBtns() {
    if (this.editToggle) {
      this.minusBtn.disabled =
        database.hero.condition[this.id].max <= this.dbEntry.min;
      this.plusBtn.disabled = false;
    } else {
      this.minusBtn.disabled = database.hero.condition[this.id].current <= 0;
      this.plusBtn.disabled =
        database.hero.condition[this.id].current >= this.getMax();
    }
  }

  // ===================================================================== listener
  onToggleEdit() {
    this.editToggle = !this.editToggle;
    this.plusBtn.classList.toggle("condition__btn--alternative");
    this.minusBtn.classList.toggle("condition__btn--alternative");
    if (this.id == "sp") {
      this.plusBtn.classList.toggle("invisible");
      this.minusBtn.classList.toggle("invisible");
    }
    this.updateBtns();
  }

  onPlusBtnClick() {
    this.editToggle ? this.onPlusMax() : this.onPlusCurrent();
    document.dispatchEvent(new Event("updateConditionHeader"));
    this.updateBtns();
  }

  onMinusBtnClick() {
    this.editToggle ? this.onMinusMax() : this.onMinusCurrent();
    document.dispatchEvent(new Event("updateConditionHeader"));
    this.updateBtns();
  }

  onPlusMax() {
    database.hero.condition[this.id].max++;
    database.hero.condition[this.id].current++;
    hero.saveHero();
  }

  onPlusCurrent() {
    if (database.hero.conditions[this.id].current >= this.getMax()) return;
    database.hero.conditions[this.id].current++;
    hero.saveHero();
  }

  onMinusMax() {
    if (
      database.hero.conditions[this.id].max <= database.conditions[this.id].min
    )
      return;
    database.hero.conditions[this.id].max--;
    database.hero.conditions[this.id].current--;
    if (database.hero.conditions[this.id].current < 0)
      database.hero.conditions[this.id].current = 0;
    hero.saveHero();
  }

  onMinusCurrent() {
    if (database.hero.conditions[this.id].current <= 0) return;
    database.hero.conditions[this.id].current--;
    database.saveHero();
  }

  // ===================================================================== Helper
  getMax() {
    let max = database.conditions[this.id].max;
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
