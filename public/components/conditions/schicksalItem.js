import database from "../../data/database.js";
import DescriptionModal from "../descriptionModal/descriptionModal.js";
import talentsController from "../../javascript/talentsController.js";
import flaws from "../../data/flaws.js";
import ControllElement from "../controllElement/controllElement.js";

export default class SchicksalItem extends ControllElement {
  constructor(section) {
    super("condition");
    this.section = section;
    section.content.appendChild(this.wrapper);
    this.minusBtn.classList.add("symbol-btn--alternative");
    this.plusBtn.classList.add("symbol-btn--alternative");
    this.update();
    // events
    document.addEventListener("updateConditions", () => this.update());
    document.addEventListener("toggleEdit", () => this.update());
  }

  // ======================= events
  onMainBtnClick() {
    new DescriptionModal(database.conditions.sp);
  }

  onMinusBtnClick() {
    if (this.getCurrent() > 0) {
      database.hero.conditions.sp.current--;
      database.saveHero();
      document.dispatchEvent(new CustomEvent("updateConditions"));
    }
  }

  onPlusBtnClick() {
    if (this.getCurrent() < this.getMax()) {
      database.hero.conditions.sp.current++;
      database.saveHero();
      document.dispatchEvent(new CustomEvent("updateConditions"));
    }
  }

  // ======================= update
  update() {
    this.mainBtn.innerText = this.getMainBtnTxt();
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
    if (talentsController.getTalent("glueck")) value++;
    if (flaws.findFlaw("pech")) value--;
    return value;
  }
}
