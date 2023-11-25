import Modal from "../modal/modal.js";
import db from "../db/db.js";

export default class Attribut {
  constructor(key) {
    this.dbEntry = db.attribute[key];
    this.container = document.querySelector(".attribute__content");
    this.element = this.createElement();
    this.mainValue = this.element.querySelector(".attribut__main-value");
    this.btns = this.element.querySelectorAll(".attribut__btn");
    this.plusBtn = this.element.querySelector(".attribut__plus");
    this.minusBtn = this.element.querySelector(".attribut__minus");

    this.updateElement();
    this.addMainListener();
    this.addPlusListener();
    this.addMinusListener();
  }

  createElement() {
    const newElement = document.createElement("div");
    newElement.classList.add("attribut");
    newElement.innerHTML = `
      <button class="attribut__main-value">???</button>
      <button class="attribut__btn attribut__minus invisible">
        <i class="fa-solid fa-minus"></i>
      </button>
      <button class="attribut__btn attribut__plus invisible">
        <i class="fa-solid fa-plus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  updateElement() {
    this.mainValue.innerHTML = `${this.dbEntry.name}: ${this.dbEntry.value}`;
  }

  addMainListener() {
    this.mainValue.addEventListener("click", () => {
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
      if (this.dbEntry.value > 1) {
        this.dbEntry.value -= 1;
        this.updateElement();
      }
    });
  }

  /* Helper */
  toggleButtonVisibility(btnsVisible) {
    this.btns.forEach((btn) => {
      btnsVisible
        ? btn.classList.remove("invisible")
        : btn.classList.add("invisible");
    });
  }

  transformeNameIntoId(string) {
    let value = string.toLowerCase();
    value = value.replace(/ä/g, "ae");
    value = value.replace(/ö/g, "oe");
    value = value.replace(/ü/g, "ue");
    return value;
  }
}
