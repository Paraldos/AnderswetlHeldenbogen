import database from "../../data/database.js";
import DescriptionModal from "../descriptionModal/descriptionModal.js";
import talentsController from "../../javascript/talentsController.js";
import ControllElement from "../controllElement/controllElement.js";

export default class ComplexConditionItem extends ControllElement {
  constructor(id, section) {
    super("condition");
    this.id = id;
    this.section = section;
    this.dbEntry = database.conditions[id];
    this.heroEntry = database.hero.conditions[id];
    section.content.appendChild(this.wrapper);
    this.update();
    document.addEventListener("toggleEdit", () => this.update());
    document.addEventListener("updateConditions", () => this.update());
  }

  // ======================= events
  onMainBtnClick() {
    new DescriptionModal(this.dbEntry);
  }

  onMinusBtnClick() {
    this.section.editToggle ? this.onMinusMax() : this.onMinusCurrent();
    database.saveHero();
    this.update();
  }

  onMinusMax() {
    if (this.heroEntry.max <= this.dbEntry.min) return;
    this.heroEntry.max--;
    this.heroEntry.current--;
    if (this.heroEntry.current < 0) this.heroEntry.current = 0;
  }

  onMinusCurrent() {
    if (this.heroEntry.current <= 0) return;
    this.heroEntry.current--;
  }

  onPlusBtnClick() {
    this.section.editToggle ? this.onPlusMax() : this.onPlusCurrent();
    database.saveHero();
    this.update();
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

  // ======================= update
  update() {
    this.mainBtn.innerText = this.getMainBtnTxt();
    document.dispatchEvent(new CustomEvent("updateConditionsHeader"));
    this.minusBtn.classList.toggle(
      "symbol-btn--alternative",
      !this.section.editToggle
    );
    this.plusBtn.classList.toggle(
      "symbol-btn--alternative",
      !this.section.editToggle
    );
  }

  // ======================= helper
  getMainBtnTxt() {
    let abbreviation = this.dbEntry.abbreviation;
    let maxValue = this.getConditionMaxValue();
    return this.section.editToggle
      ? `Max ${abbreviation}: ${maxValue}`
      : `${abbreviation}: ${this.heroEntry.current} von ${maxValue}`;
  }

  getConditionMaxValue() {
    let max = this.heroEntry.max;
    if (this.id == "lp" && talentsController.findTalent("huene")) {
      max += 2;
    }
    return max;
  }
}
