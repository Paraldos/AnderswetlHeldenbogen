import abilitiesController from "../../javascript/abilitiesController.js";
import DescriptionModal from "../descriptionModal/descriptionModal.js";
import ControllElement from "../controllElement/controllElement.js";

export default class AbilitiesSectionItem extends ControllElement {
  constructor(key, section, abilityType) {
    super(abilityType);
    this.key = key;
    this.section = section;
    this.abilityType = abilityType;
    this.dbEntry = abilitiesController.getDBEntry(key);
    this.addElement();
    this.update();
    document.addEventListener("resetAbilities", () => this.update());
    document.addEventListener("toggleEdit", () => this.update());
  }

  addElement() {
    if (this.abilityType === "skills") {
      this.container = document.querySelector(`.skills__${this.dbEntry.type}`);
      this.container.appendChild(this.wrapper);
    } else {
      this.section.content.appendChild(this.wrapper);
    }
  }

  onMainBtnClick() {
    new DescriptionModal(this.dbEntry);
  }

  onMinusBtnClick() {
    abilitiesController.reduce(this.key);
    this.update();
  }

  onPlusBtnClick() {
    abilitiesController.increase(this.key);
    this.update();
  }

  getMainBtnTxt() {
    return `${this.dbEntry.name}: ${abilitiesController.getDisplayValue(
      this.key
    )}`;
  }

  update() {
    this.mainBtn.innerHTML = this.getMainBtnTxt();
    this.minusBtn.classList.toggle("disabled", !this.section.editToggle);
    this.plusBtn.classList.toggle("disabled", !this.section.editToggle);
  }
}
