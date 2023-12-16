import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Modal from "../modal/modal.js";

export default class Attribut {
  constructor(key) {
    this.key = key;
    this.dbEntry = db.attributs[key];
    this.container = document.querySelector(".attributs__content");
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".attribut__main-btn");
    this.plusBtn = this.element.querySelector(".attribut__plus-btn");
    this.minusBtn = this.element.querySelector(".attribut__minus-btn");

    this.updateElement();
    this.addMainBtnListener();
    this.addPlusBtnListener();
    this.addMinusListener();
    document.addEventListener("resetAttributs", () => this.updateElement());
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
    let value = hero.attributs[this.key].value;
    if (hero.veranlagungsController.getVeranlagung() === this.key) {
      value += 1;
    }
    this.mainBtn.innerHTML = `${this.dbEntry.name}: ${value}`;
    document.dispatchEvent(new Event("updateAttributsHeader"));
  }

  addMainBtnListener() {
    this.mainBtn.addEventListener(
      "click",
      () => new AttributModal(this.dbEntry)
    );
  }

  addPlusBtnListener() {
    this.plusBtn.addEventListener("click", () => {
      if (hero.attributs[this.key].value < 5) {
        hero.attributs[this.key].value += 1;
        hero.saveHero();
        this.updateElement();
      }
    });
  }

  addMinusListener() {
    this.minusBtn.addEventListener("click", () => {
      if (hero.attributs[this.key].value > 1) {
        hero.attributs[this.key].value -= 1;
        hero.saveHero();
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
