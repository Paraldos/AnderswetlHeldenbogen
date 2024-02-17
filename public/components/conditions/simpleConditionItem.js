import database from "../../data/database.js";
import DescriptionModal from "../../templates/descriptionModal.js";
import DefaultControllElement from "../defaultControllElement/defaultControllElement.js";

export default class SimpleConditionItem extends DefaultControllElement {
  constructor(id, section) {
    super("condition");
    this.id = id;
    this.section = section;
    this.dbEntry = database.conditions[id];
    section.content.appendChild(this.wrapper);
    this.update();
    document.addEventListener("toggleEdit", () => this.update());
    document.addEventListener("updateConditions", () => this.update());
  }

  // ================= events
  onMainBtnClick() {
    new DescriptionModal(this.dbEntry);
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

  onPlusBtnClick() {
    if (this.id == "stufe") {
      database.hero.conditions.ep -= 5;
    }
    database.hero.conditions[this.id]++;
    document.dispatchEvent(new Event("updateConditions"));
    database.saveHero();
  }

  // ================= update
  update() {
    this.mainBtn.innerText = this.getMainBtnTxt();
    if (this.id == "stufe") {
      this.plusBtn.disabled = database.hero.conditions.ep < 5;
    }
    this.plusBtn.classList.toggle("disabled", !this.section.editToggle);
    this.minusBtn.classList.toggle("disabled", !this.section.editToggle);
  }

  // ================= helpers
  getMainBtnTxt() {
    let value = database.hero.conditions[this.id];
    return this.dbEntry.abbreviation
      ? `${this.dbEntry.abbreviation}: ${value}`
      : `${this.dbEntry.name}: ${value}`;
  }
}
