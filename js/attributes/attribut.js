export default class Attribut {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.id = this.transformeNameIntoId(name);

    this.container = document.querySelector(".attribute__content");
    this.attribut = this.createAttribute();
    this.btns = this.attribut.querySelectorAll(`.attribut__btn`);
    this.plusBtn = this.attribut.querySelector(".attribut__plus");
    this.minusBtn = this.attribut.querySelector(".attribut__minus");

    this.addBtnEventListener();
  }

  addBtnEventListener() {
    this.plusBtn.addEventListener("click", () => {
      console.log("plus");
    });
    this.minusBtn.addEventListener("click", () => {
      console.log("minus");
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
    const htmlElement = document.createElement("li");
    htmlElement.classList.add("attribut");
    htmlElement.innerHTML = `
      <p>${this.name}: ${this.value}</p>
      <button class="attribut__btn attribut__minus">
        <i class="fa-solid fa-minus"></i>
      </button>
      <button class="attribut__btn attribut__plus">
        <i class="fa-solid fa-plus"></i>
      </button>`;
    this.container.appendChild(htmlElement);
    return htmlElement;
  }

  transformeNameIntoId(string) {
    let value = string.toLowerCase();
    value = value.replace(/ä/g, "ae");
    value = value.replace(/ö/g, "oe");
    value = value.replace(/ü/g, "ue");
    return value;
  }
}
