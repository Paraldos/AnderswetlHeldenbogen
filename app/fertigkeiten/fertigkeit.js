import Modal from "../modal/modal.js";
import db from "../db/db.js";

export default class Fertigkeit {
  constructor(key) {
    this.dbEntry = db.fertigkeiten[key];
    this.element = this.createElement();
    this.text = this.element.querySelector(".fertigkeit__text");
    this.btns = this.element.querySelectorAll(".fertigkeit__btn");
    this.plusBtn = this.element.querySelector(".fertigkeit__plus");
    this.minusBtn = this.element.querySelector(".fertigkeit__minus");
    this.updateElement();
    this.addTextListener();
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
      <button class="fertigkeit__text">???</button>
      <button class="fertigkeit__btn fertigkeit__minus invisible">
        <i class="fa-solid fa-minus"></i>
      </button>
      <button class="fertigkeit__btn fertigkeit__plus invisible">
        <i class="fa-solid fa-plus"></i>
      </button>`;
    container.appendChild(newElement);
    return newElement;
  }

  updateElement() {
    this.text.innerHTML = `${this.dbEntry.name}: ${this.dbEntry.value}`;
    document.dispatchEvent(new Event("updateFertigkeitenHeader"));
  }

  addTextListener() {
    this.text.addEventListener("click", () => {
      let modal = new Modal();
      modal.content.innerHTML = `
      <h1>${this.dbEntry.name}</h1>
      <p>${this.dbEntry.description}</p>
      `;
    });
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
    this.btns.forEach((btn) => {
      btnsVisible
        ? btn.classList.remove("invisible")
        : btn.classList.add("invisible");
    });
  }
}
