import database from "../../data/database.js";
import talents from "../../data/talents.js";
import TalentModal from "./talentModal.js";

export default class ModalTalent {
  constructor(key, modalContent) {
    this.key = key;
    this.dbEntry = database.talents[key];
    this.modalContent = modalContent;
    this.talentContainer = this.modalContent.querySelector(
      `.talents-modal__${this.dbEntry.type}`
    );
    this.initTalent();
  }

  initTalent() {
    const element = document.createElement("div");
    element.className = "talent";
    this.createMainBtn(element);
    this.createPlusBtn(element);
    this.talentContainer.appendChild(element);
  }

  createMainBtn(container) {
    let element = document.createElement("button");
    element.className = "talent__main-btn";
    this.dbEntry.max_level > 1
      ? (element.innerHTML = `${this.dbEntry.name} (1 bis ${this.dbEntry.max_level})`)
      : (element.innerHTML = `${this.dbEntry.name}`);
    element.addEventListener("click", () => this.onClickMainBtn());
    container.appendChild(element);
  }

  onClickMainBtn() {
    new TalentModal(this.dbEntry);
  }

  createPlusBtn(container) {
    let element = document.createElement("button");
    element.className = "talent__plus-btn symbol-btn";
    element.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    element.addEventListener("click", () => this.onClickPlusBtn());
    container.appendChild(element);
  }

  onClickPlusBtn() {
    talents.addTalent(this.key);
  }
}
