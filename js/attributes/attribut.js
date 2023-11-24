export default class Attribut {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.id = this.transformeNameIntoId(name);

    this.container = document.querySelector(".attribute__content");
    this.attribut = this.createAttribute();
    this.main = this.attribut.querySelector(".attribut__main");
    this.btns = this.attribut.querySelectorAll(".attribut__btn");
    this.plusBtn = this.attribut.querySelector(".attribut__plus");
    this.minusBtn = this.attribut.querySelector(".attribut__minus");

    this.updateHtml();
    this.addPlusBtnEventListener();
    this.addMinusBtnEventListener();
  }

  updateHtml() {
    this.main.innerHTML = `${this.name}: ${this.value}`;
  }

  addPlusBtnEventListener() {
    this.plusBtn.addEventListener("click", () => {
      if (this.value < 5) {
        this.value += 1;
        this.updateHtml();
      }
    });
  }

  addMinusBtnEventListener() {
    this.minusBtn.addEventListener("click", () => {
      if (this.value > 1) {
        this.value -= 1;
        this.updateHtml();
      }
    });
  }

  toggleButtonVisibility(btnsVisible) {
    this.btns.forEach((btn) => {
      btnsVisible
        ? btn.classList.remove("invisible")
        : btn.classList.add("invisible");
    });
  }

  createAttribute() {
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

  transformeNameIntoId(string) {
    let value = string.toLowerCase();
    value = value.replace(/ä/g, "ae");
    value = value.replace(/ö/g, "oe");
    value = value.replace(/ü/g, "ue");
    return value;
  }
}
