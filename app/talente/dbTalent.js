import db from "../db/db.js";
import DBTalentModal from "./dbTalentModal.js";

export default class DBTalent {
  constructor(key, modal) {
    this.key = key;
    this.dbEntry = db.talente[key];
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
    this.plusBtn.addEventListener("click", () => {
      db.heroTalente.push({ key: this.key });
      document.dispatchEvent(new Event("resetTalents"));
    });
  }

  toggleEditBtn(btnsVisible) {
    btnsVisible
      ? this.minusBtn.classList.remove("invisible")
      : this.minusBtn.classList.add("invisible");
  }
}