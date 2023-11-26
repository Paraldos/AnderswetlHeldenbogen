import Modal from "../modal/modal.js";
import db from "../db/db.js";

export default class Attribut {
  constructor(key) {
    this.dbEntry = db.attribute[key];
    this.container = document.querySelector(".attribute__content");
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".attribut__main-btn");
    this.plusBtn = this.element.querySelector(".attribut__plus-btn");
    this.minusBtn = this.element.querySelector(".attribut__minus-btn");

    this.updateElement();
    this.addMainBtnListener();
    this.addPlusListener();
    this.addMinusListener();
  }

  createElement() {
    const newElement = document.createElement("div");
    newElement.classList.add("attribut");
    newElement.innerHTML = `
      <button class="attribut__main-btn">???</button>
      <button class="attribut__minus-btn invisible symbol-btn">
        <i class="fa-solid fa-minus"></i>
      </button>
      <button class="attribut__plus-btn invisible symbol-btn">
        <i class="fa-solid fa-plus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  updateElement() {
    this.mainBtn.innerHTML = `${this.dbEntry.name}: ${this.dbEntry.value}`;
    document.dispatchEvent(new Event("updateAttributeHeader"));
  }

  addMainBtnListener() {
    this.mainBtn.addEventListener(
      "click",
      () => new AttributModal(this.dbEntry)
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
      if (this.dbEntry.value > 1) {
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

class AttributModal {
  constructor(dbEntry) {
    this.dbEntry = dbEntry;
    this.addModal();
  }

  addModal() {
    let modal = new Modal();
    modal.content.innerHTML = `
    <h2>${this.dbEntry.name}</h2>`;
    this.addTalentDescription(modal);
  }

  addTalentDescription(modal) {
    let newElement = document.createElement("p");
    newElement.innerText = this.dbEntry.description;
    modal.content.appendChild(newElement);
  }
}
