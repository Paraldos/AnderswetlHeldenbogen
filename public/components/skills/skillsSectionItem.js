import database from "../../data/database.js";
import DescriptionModal from "../descriptionModal/descriptionModal.js";
import ControllElement from "../controllElement/controllElement.js";

export default class SkillsSectionItem extends ControllElement {
  constructor(key, section) {
    super("skills");
    this.key = key;
    this.section = section;
    this.dbEntry = database.skills[key];
    this.container = document.querySelector(`.skills__${this.dbEntry.type}`);
    this.container.appendChild(this.wrapper);
    this.update();
    document.addEventListener("toggleEdit", () => this.update());
  }

  // events
  onMainBtnClick() {
    new DescriptionModal(this.dbEntry);
  }

  onMinusBtnClick() {
    if (this.heroValue > 0) {
      this.heroValue -= 1;
      this.update();
      database.saveHero();
    }
  }

  onPlusBtnClick() {
    if (this.heroValue < 5) {
      this.heroValue += 1;
      this.update();
      database.saveHero();
    }
  }

  // helper
  get heroValue() {
    return database.hero.skills[this.key].value;
  }

  set heroValue(value) {
    database.hero.skills[this.key].value = value;
  }

  getMainBtnTxt() {
    return `${this.dbEntry.name}: ${this.heroValue}`;
  }

  update() {
    this.mainBtn.innerHTML = this.getMainBtnTxt();
    document.dispatchEvent(new Event("updateSkillsHeader"));
    this.minusBtn.classList.toggle("disabled", !this.section.editToggle);
    this.plusBtn.classList.toggle("disabled", !this.section.editToggle);
  }
}
