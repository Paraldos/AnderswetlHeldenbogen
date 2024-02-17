import database from "../../data/database.js";
import DescriptionModal from "../../templates/descriptionModal.js";
import talents from "../../data/talents.js";
import DefaultControllElement from "../defaultControllElement/defaultControllElement.js";

export default class ComplexConditionItem extends DefaultControllElement {
  constructor(id, section) {
    super("condition");
    this.id = id;
    this.section = section;
    this.dbEntry = database.conditions[id];
    this.heroEntry = database.hero.conditions[id];
    section.content.appendChild(this.wrapper);
    this.updateMainBtn();
    document.addEventListener("toggleEdit", () => {
      this.updateMainBtn();
      this.updateBtnClasses();
    });
    document.addEventListener("updateConditions", () => {
      this.updateMainBtn();
      this.updateBtnClasses();
    });
  }

  // ======================= events
  onMainBtnClick() {
    new DescriptionModal(this.dbEntry);
  }

  onMinusBtnclick() {
    this.section.editToggle ? this.onMinusMax() : this.onMinusCurrent();
    database.saveHero();
    this.updateMainBtn();
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

  onPlusBtnclick() {
    this.section.editToggle ? this.onPlusMax() : this.onPlusCurrent();
    database.saveHero();
    this.updateMainBtn();
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
  updateMainBtn() {
    this.mainBtn.innerText = this.getMainBtnTxt();
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
    if (this.id == "lp" && talents.findTalent("huene")) {
      max += 2;
    }
    return max;
  }
}
