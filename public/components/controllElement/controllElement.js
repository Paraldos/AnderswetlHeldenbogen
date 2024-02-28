import MinusBtn from "../symbolBtn/minusBtn.js";
import PlusBtn from "../symbolBtn/plusBtn.js";

export default class ControllElement {
  constructor(classPrefix) {
    this.classPrefix = classPrefix;
    this.wrapper = this.createWrapper();
    this.mainBtn = this.wrapper.querySelector(`.${this.classPrefix}__main-btn`);
    this.minusBtn = this.createMinusBtn();
    this.plusBtn = this.createPlusBtn();
    this.mainBtn.addEventListener("click", () => this.onMainBtnClick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
  }

  createWrapper() {
    let wrapper = document.createElement("div");
    wrapper.classList.add(`${this.classPrefix}__wrapper`);
    wrapper.classList.add(`controll-element__wrapper`);
    wrapper.innerHTML = `<button class="${this.classPrefix}__main-btn">Placeholder</button>`;
    return wrapper;
  }

  createMinusBtn() {
    let btn = new MinusBtn().btn;
    btn.classList.add(`${this.classPrefix}__minus-btn`);
    this.wrapper.appendChild(btn);
    return btn;
  }

  createPlusBtn() {
    let btn = new PlusBtn().btn;
    btn.classList.add(`${this.classPrefix}__plus-btn`);
    this.wrapper.appendChild(btn);
    return btn;
  }

  onMainBtnClick() {}
  onMinusBtnClick() {}
  onPlusBtnClick() {}
}
