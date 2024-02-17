import database from "../../data/database.js";
import DescriptionModal from "../descriptionModal/descriptionModal.js";
import flaws from "../../data/flaws.js";
import ControllElement from "../controllElement/controllElement.js";

export default class ListItem extends ControllElement {
  constructor(id, modal) {
    super("flaw");
    this.id = id;
    this.modal = modal;
    this.dbEntry = database.flaws[id];
    this.minusBtn.remove();
    this.update();
    this.modal.content.appendChild(this.wrapper);
  }

  onMainBtnClick() {
    new DescriptionModal(this.dbEntry);
  }

  onPlusBtnClick() {
    flaws.addFlaw(this.id);
    document.dispatchEvent(new Event("updateConditions"));
  }

  update() {
    this.mainBtn.innerHTML = this.dbEntry.name;
  }
}
