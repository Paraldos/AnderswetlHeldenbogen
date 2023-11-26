import Modal from "../modal/modal.js";
import db from "../db/db.js";

export default class DBTalent {
  constructor(key, modal) {
    this.dbEntry = db.talente[key];
    this.modal = modal;
    this.container = this.modal.content.querySelector(
      `.talente__${this.dbEntry.type}`
    );
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".talent__main-btn");
    this.plusBtn = this.element.querySelector(".talent__plus-btn");
    this.addMainBtnListener();
    /*
    this.addMinusBtnListener();
    */
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
    this.mainBtn.addEventListener("click", () => new TalentModal(this.dbEntry));
  }

  addMinusBtnListener() {
    this.minusBtn.addEventListener("click", () => {
      db.heroTalente.splice(this.talentIndex, 1);
      document.dispatchEvent(new Event("resetTalents"));
    });
  }

  toggleEditBtn(btnsVisible) {
    btnsVisible
      ? this.minusBtn.classList.remove("invisible")
      : this.minusBtn.classList.add("invisible");
  }
}

class TalentModal {
  constructor(dbEntry) {
    this.dbEntry = dbEntry;
    this.addModal();
  }

  addModal() {
    let modal = new Modal();
    modal.content.innerHTML = `
    <h2>${this.dbEntry.name}</h2>`;
    this.addComment(modal);
    this.addTalentDescription(modal);
  }

  addTalentDescription(modal) {
    let newElement = document.createElement("p");
    newElement.innerText = this.dbEntry.description;
    modal.content.appendChild(newElement);
  }

  addComment(modal) {
    console.log();
  }
}
