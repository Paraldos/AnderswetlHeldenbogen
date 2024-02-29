import database from "../../data/database.js";
import skillsController from "../../javascript/skillsController.js";
import DescriptionModal from "../descriptionModal/descriptionModal.js";
import ControllElement from "../controllElement/controllElement.js";

export default class SkillsSectionItem extends ControllElement {
  constructor(key, section) {
    super("skills");
    this.key = key;
    this.section = section;
    this.dbEntry = skillsController.getDBEntry(key);
    this.container = document.querySelector(`.skills__${this.dbEntry.type}`);
    this.container.appendChild(this.wrapper);
    this.update();
    document.addEventListener("toggleEdit", () => this.update());
  }

  onMainBtnClick() {
    new DescriptionModal(this.dbEntry);
  }

  onMinusBtnClick() {
    skillsController.reduce(this.key);
    this.update();
  }

  onPlusBtnClick() {
    skillsController.increase(this.key);
    this.update();
  }

  update() {
    const name = this.dbEntry.name;
    const value = skillsController.getValue(this.key);
    this.mainBtn.innerHTML = `${name}: ${value}`;
    this.minusBtn.classList.toggle("disabled", !this.section.editToggle);
    this.plusBtn.classList.toggle("disabled", !this.section.editToggle);
  }
}
