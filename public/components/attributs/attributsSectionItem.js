import database from "../../data/database.js";
import DescriptionModal from "../descriptionModal/descriptionModal.js";
import veranlagung from "../../data/veranlagung.js";
import ControllElement from "../defaultControllElement/defaultControllElement.js";

export default class AttributsSectionItem extends ControllElement {
  constructor(key, section) {
    super("attribut");
    this.key = key;
    this.section = section;
    this.dbEntry = database.attributs[key];
    section.content.appendChild(this.wrapper);
    this.update();
    document.addEventListener("resetAttributs", () => this.update());
    document.addEventListener("toggleEdit", () => this.update());
  }

  // events
  onMainBtnClick() {
    new DescriptionModal(this.dbEntry);
  }

  onMinusBtnClick() {
    if (this.heroValue > 1) {
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

  onToggleEdit(btn) {
    btn.classList.toggle("disabled");
  }

  // Helper
  get heroValue() {
    let value = database.hero.attributs[this.key].value;
    if (veranlagung.getSelectedAttribut() == this.key) {
      value += 1;
    }
    return value;
  }

  set heroValue(value) {
    database.hero.attributs[this.key].value = value;
  }

  getMainBtnTxt() {
    return `${this.dbEntry.name}: ${this.heroValue}`;
  }

  update() {
    this.mainBtn.innerHTML = this.getMainBtnTxt();
    this.minusBtn.classList.toggle("disabled", !this.section.editToggle);
    this.plusBtn.classList.toggle("disabled", !this.section.editToggle);
    document.dispatchEvent(new Event("updateAttributsHeader"));
  }
}
