import Modal from "../modal/modal.js";

export default class Attribut {
  constructor(dbElement) {
    this.name = dbElement.name;
    this.value = 1;
    this.id = this.transformeNameIntoId(dbElement.name);
    this.description = dbElement.description;

    this.container = document.querySelector(".attribute__content");
    this.attribut = this.createHtml();
    this.main = this.attribut.querySelector(".attribut__main");
    this.btns = this.attribut.querySelectorAll(".attribut__btn");
    this.plusBtn = this.attribut.querySelector(".attribut__plus");
    this.minusBtn = this.attribut.querySelector(".attribut__minus");

    this.updateHtml();
    this.addMainListener();
    this.addPlusListener();
    this.addMinusListener();
  }

  createHtml() {
    const newElement = document.createElement("li");
    newElement.classList.add("attribut");
    newElement.innerHTML = `
      <button class="attribut__main">???</button>
      <button class="attribut__btn attribut__minus invisible">
        <i class="fa-solid fa-minus"></i>
      </button>
      <button class="attribut__btn attribut__plus invisible">
        <i class="fa-solid fa-plus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  updateHtml() {
    this.main.innerHTML = `${this.name}: ${this.value}`;
  }

  addMainListener() {
    this.main.addEventListener("click", () => {
      let modal = new Modal();
      modal.content.innerHTML = `
      <h1>${this.name}</h1>
      <p>${this.description}</p>
      `;
    });
  }

  addPlusListener() {
    this.plusBtn.addEventListener("click", () => {
      if (this.value < 5) {
        this.value += 1;
        this.updateHtml();
      }
    });
  }

  addMinusListener() {
    this.minusBtn.addEventListener("click", () => {
      if (this.value > 1) {
        this.value -= 1;
        this.updateHtml();
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
