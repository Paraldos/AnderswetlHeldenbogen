import database from "../../data/database.js";
import talentsController from "../../javascript/talentsController.js";
import DescriptionModal from "../descriptionModal/descriptionModal.js";
import ControllElement from "../controllElement/controllElement.js";

export default class ListOfTalentsItem extends ControllElement {
  constructor(key, modalContent) {
    super("talent");
    this.key = key;
    this.dbEntry = database.talents[key];
    this.modalContent = modalContent;
    this.talentContainer = this.modalContent.querySelector(
      `.talents-modal__${this.dbEntry.type}`
    );
    this.minusBtn.classList.add("disabled");
    this.update();
    this.talentContainer.appendChild(this.wrapper);
  }

  update() {
    this.mainBtn.innerHTML =
      this.dbEntry.max_level > 1
        ? `${this.dbEntry.name} (1 bis ${this.dbEntry.max_level})`
        : `${this.dbEntry.name}`;
  }

  onMainBtnClick() {
    new DescriptionModal(this.dbEntry);
  }

  onPlusBtnClick() {
    talentsController.addTalent(this.key);
    document.dispatchEvent(new Event("updateConditions"));
  }
}
