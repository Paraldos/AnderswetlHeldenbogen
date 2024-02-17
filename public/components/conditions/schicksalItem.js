import database from "../../data/database.js";
import DescriptionModal from "../../templates/descriptionModal.js";
import talents from "../../data/talents.js";
import flaws from "../../data/flaws.js";
import DefaultControllElement from "../defaultControllElement/defaultControllElement.js";

export default class SchicksalItem extends DefaultControllElement {
  constructor(section) {
    super("condition");
    this.section = section;
    section.content.appendChild(this.wrapper);
    this.updateMainBtn();
    // events
    document.addEventListener("updateConditions", () => {
      this.updateMainBtn();
      this.updateSymbolBtns();
    });
    document.addEventListener("toggleEdit", () => this.updateSymbolBtns());
  }

  // ======================= events
  onMainBtnClick() {
    new DescriptionModal(database.conditions.sp);
  }

  onMinusBtnclick() {
    if (this.getCurrent() > 0) {
      database.hero.conditions.sp.current--;
      database.saveHero();
      document.dispatchEvent(new CustomEvent("updateConditions"));
    }
  }

  onPlusBtnclick() {
    if (this.getCurrent() < this.getMax()) {
      database.hero.conditions.sp.current++;
      database.saveHero();
      document.dispatchEvent(new CustomEvent("updateConditions"));
    }
  }

  // ======================= update
  updateMainBtn() {
    this.mainBtn.innerText = this.getMainBtnTxt();
  }

  updateSymbolBtns() {
    this.minusBtn.classList.toggle("disabled", this.section.editToggle);
    this.plusBtn.classList.toggle("disabled", this.section.editToggle);
  }

  // ======================= helper
  getMainBtnTxt() {
    return `SP: ${this.getCurrent()} von ${this.getMax()}`;
  }

  getCurrent() {
    return database.hero.conditions.sp.current;
  }

  getMax() {
    let value = database.hero.conditions.sp.max;
    if (talents.findTalent("glueck")) value++;
    if (flaws.findFlaw("pech")) value--;
    return value;
  }
}
