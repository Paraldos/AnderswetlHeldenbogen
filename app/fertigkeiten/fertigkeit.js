import Modal from "../modal/modal.js";
import db from "../db/db.js";

export default class Fertigkeit {
  constructor(key) {
    this.dbEntry = db.fertigkeiten[key];
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".fertigkeit__main-btn");
    this.plusBtn = this.element.querySelector(".fertigkeit__plus-btn");
    this.minusBtn = this.element.querySelector(".fertigkeit__minus-btn");
    this.updateElement();
    this.addMainBtnListener();
    this.addPlusListener();
    this.addMinusListener();
  }

  createElement() {
    let container = document.querySelector(
      `.fertigkeiten__${this.dbEntry.category}`
    );
    const newElement = document.createElement("div");
    newElement.classList.add("fertigkeit");
    newElement.innerHTML = `
      <button class="fertigkeit__main-btn">???</button>
      <button class="fertigkeit__minus-btn invisible symbol-btn">
        <i class="fa-solid fa-minus"></i>
      </button>
      <button class="fertigkeit__plus-btn invisible symbol-btn">
        <i class="fa-solid fa-plus"></i>
      </button>`;
    container.appendChild(newElement);
    return newElement;
  }

  updateElement() {
    this.mainBtn.innerHTML = `${this.dbEntry.name}: ${this.dbEntry.value}`;
    document.dispatchEvent(new Event("updateFertigkeitenHeader"));
  }

  addMainBtnListener() {
    this.mainBtn.addEventListener(
      "click",
      () => new FertigkeitModal(this.dbEntry)
    );
  }

  addPlusListener() {
    this.plusBtn.addEventListener("click", () => {
      if (this.dbEntry.value < 5) {
        this.dbEntry.value += 1;
        this.updateElement();
      }
    });
  }

  addMinusListener() {
    this.minusBtn.addEventListener("click", () => {
      if (this.dbEntry.value > 0) {
        this.dbEntry.value -= 1;
        this.updateElement();
      }
    });
  }

  toggleEditBtn(btnsVisible) {
    btnsVisible
      ? this.plusBtn.classList.remove("invisible")
      : this.plusBtn.classList.add("invisible");
    btnsVisible
      ? this.minusBtn.classList.remove("invisible")
      : this.minusBtn.classList.add("invisible");
  }
}

class FertigkeitModal {
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
