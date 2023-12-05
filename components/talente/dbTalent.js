import db from "../../data/db.js";
import talentController from "../../data/talentController.js";
import DBTalentModal from "./dbTalentModal.js";

export default class DBTalent {
  constructor(id, modal) {
    this.id = id;
    this.dbEntry = db.talente[id];
    this.modal = modal;
    this.container = this.modal.content.querySelector(
      `.talente__${this.dbEntry.type}`
    );
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".talent__main-btn");
    this.plusBtn = this.element.querySelector(".talent__plus-btn");
    this.addMainBtnListener();
    this.addPlusBtnListener();
  }

  createElement() {
    let newElement = document.createElement("div");
    newElement.classList.add("talent");
    newElement.innerHTML = `
      <button class="talent__main-btn">
        ${this.dbEntry.name}
      </button>
      <button class="talent__plus-btn symbol-btn">
        <i class="fa-solid fa-plus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  addMainBtnListener() {
    this.mainBtn.addEventListener(
      "click",
      () => new DBTalentModal(this.dbEntry)
    );
  }

  addPlusBtnListener() {
    this.plusBtn.addEventListener("click", () =>
      talentController.addTalent(this.id)
    );
  }

  toggleEditBtn(btnsVisible) {
    btnsVisible
      ? this.minusBtn.classList.remove("invisible")
      : this.minusBtn.classList.add("invisible");
  }
}
