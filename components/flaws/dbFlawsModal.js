import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Modal from "../modal/modal.js";
import FlawModal from "./flawModal.js";

export default class DbFlawsModal {
  constructor() {
    this.modal = new Modal();
    this.modal.content.classList.add("flaws-modal");
    this.initModalContent();
    this.addResetListener();
  }

  initModalContent() {
    this.modal.content.innerHTML = `<h2>Schwächen</h2>`;
    this.addFlaws();
  }

  addFlaws() {
    for (let id in db.schwaechen) {
      if (hero.flaws.getFlaw(id)) continue;
      else new SingleFlaw(id, this.modal);
    }
  }

  addResetListener() {
    document.addEventListener("resetSchwaechen", () => {
      this.initModalContent();
    });
  }
}

class SingleFlaw {
  constructor(id, modal) {
    this.id = id;
    this.modal = modal;
    this.dbEntry = db.schwaechen[id];
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".flaws-modal__main-btn");
    this.plusBtn = this.element.querySelector(".flaws-modal__plus-btn");
    this.mainBtn.addEventListener("click", () => this.onMainBtnClick());
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
  }

  createElement() {
    let newElement = document.createElement("div");
    newElement.classList.add("flaws-modal__schwaeche");
    newElement.innerHTML = `
      <button class="flaws-modal__main-btn">
        ${this.dbEntry.name}
      </button>
      <button class="flaws-modal__plus-btn symbol-btn">
        <i class="fa-solid fa-plus"></i>
      </button>`;
    this.modal.content.appendChild(newElement);
    return newElement;
  }

  onMainBtnClick() {
    new FlawModal(this.dbEntry);
  }

  onPlusBtnClick() {
    hero.flaws.addFlaw(this.id);
  }

  toggleEditBtn(btnsVisible) {
    btnsVisible
      ? this.minusBtn.classList.remove("invisible")
      : this.minusBtn.classList.add("invisible");
  }
}
