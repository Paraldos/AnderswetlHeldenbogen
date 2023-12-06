import db from "../../data/db.js";
import hero from "../../data/hero.js";
import DbSchwaecheModal from "./dbSchwaecheModal.js";

export default class DbSchwaeche {
  constructor(id, modalContent) {
    this.id = id;
    this.modalContent = modalContent;
    this.dbEntry = db.schwaechen[id];
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".schwaechen-modal__main-btn");
    this.plusBtn = this.element.querySelector(".schwaechen-modal__plus-btn");
    this.addMainBtnListener();
    this.addPlusBtnListener();
  }

  createElement() {
    let newElement = document.createElement("div");
    newElement.classList.add("schwaechen-modal__schwaeche");
    newElement.innerHTML = `
      <button class="schwaechen-modal__main-btn">
        ${this.dbEntry.name}
      </button>
      <button class="schwaechen-modal__plus-btn symbol-btn">
        <i class="fa-solid fa-plus"></i>
      </button>`;
    this.modalContent.appendChild(newElement);
    return newElement;
  }

  addMainBtnListener() {
    this.mainBtn.addEventListener("click", () => {
      new DbSchwaecheModal(this.dbEntry);
    });
  }

  addPlusBtnListener() {
    this.plusBtn.addEventListener("click", () => {
      hero.schwaechenController.addSchwaeche(this.id);
    });
  }

  toggleEditBtn(btnsVisible) {
    btnsVisible
      ? this.minusBtn.classList.remove("invisible")
      : this.minusBtn.classList.add("invisible");
  }
}
