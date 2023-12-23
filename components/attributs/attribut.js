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
    this.mainBtn.addEventListener(
      "click",
      () => new AttributModal(this.dbEntry)
    );
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    document.addEventListener("resetAttributs", () => this.updateElement());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  createElement() {
    const newElement = document.createElement("div");
    newElement.classList.add("attribut");
    newElement.innerHTML = `
      <button class="attribut__main-btn">???</button>
      <button class="attribut__minus-btn symbol-btn invisible">
        <i class="fa-solid fa-minus"></i>
      </button>
      <button class="attribut__plus-btn symbol-btn invisible">
        <i class="fa-solid fa-plus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  updateElement() {
    let value = hero.attributs[this.key].value;
    if (hero.veranlagung.getVeranlagung() === this.key) {
      value += 1;
    }
    this.mainBtn.innerHTML = `${this.dbEntry.name}: ${value}`;
    document.dispatchEvent(new Event("updateAttributsHeader"));
  }

  onPlusBtnClick() {
    if (hero.attributs[this.key].value < 5) {
      hero.attributs[this.key].value += 1;
      hero.saveHero();
      this.updateElement();
    }
  }

  onMinusBtnClick() {
    if (hero.attributs[this.key].value > 1) {
      hero.attributs[this.key].value -= 1;
      hero.saveHero();
      this.updateElement();
    }
  }

  onToggleEdit() {
    this.plusBtn.classList.toggle("invisible");
    this.minusBtn.classList.toggle("invisible");
  }
}

class AttributModal {
  constructor(dbEntry) {
    this.modal = new Modal();
    this.modal.content.innerHTML = `
      <h2>${dbEntry.name}</h2>
      <p>${dbEntry.description}</p>`;
  }
}
