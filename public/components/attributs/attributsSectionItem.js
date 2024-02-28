import attributsController from "../../javascript/attributesController.js";
import DescriptionModal from "../descriptionModal/descriptionModal.js";
import ControllElement from "../controllElement/controllElement.js";

export default class AttributsSectionItem extends ControllElement {
  constructor(key, section) {
    super("attribut");
    this.key = key;
    this.section = section;
    this.dbEntry = attributsController.getDBEntry(this.key);
    section.content.appendChild(this.wrapper);
    this.update();
    document.addEventListener("resetAttributs", () => this.update());
    document.addEventListener("toggleEdit", () => this.update());
  }

  onMainBtnClick() {
    new DescriptionModal(this.dbEntry);
  }

  onMinusBtnClick() {
    attributsController.reduce(this.key);
  }

  onPlusBtnClick() {
    attributsController.increase(this.key);
  }

  getMainBtnTxt() {
    return `${this.dbEntry.name}: ${attributsController.getValue(this.key)}`;
  }

  update() {
    this.mainBtn.innerHTML = this.getMainBtnTxt();
    this.minusBtn.classList.toggle("disabled", !this.section.editToggle);
    this.plusBtn.classList.toggle("disabled", !this.section.editToggle);
    document.dispatchEvent(new Event("updateAttributsHeader"));
  }
}
