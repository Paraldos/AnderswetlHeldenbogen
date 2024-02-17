import MinusBtn from "./minusBtn.js";
import PlusBtn from "./plusBtn.js";

export default class DefaultControllElement {
  constructor(classPrefix) {
    this.classPrefix = classPrefix;
    this.wrapper = this.createWrapper();
    this.mainBtn = this.createMainBtn();
    this.minusBtn = this.createMinusBtn();
    this.plusBtn = this.createPlusBtn();
    this.mainBtn.addEventListener("click", () => this.onMainBtnClick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
  }

  createWrapper() {
    let wrapper = document.createElement("div");
    wrapper.classList.add(`${this.classPrefix}__wrapper`);
    return wrapper;
  }

  createMainBtn() {
    let btn = document.createElement("button");
    btn.classList.add(`${this.classPrefix}__main-btn`);
    btn.innerText = "Placeholder";
    this.wrapper.appendChild(btn);
    return btn;
  }

  createMinusBtn() {
    let btn = new MinusBtn().btn;
    this.wrapper.appendChild(btn);
    return btn;
  }

  createPlusBtn() {
    let btn = new PlusBtn().btn;
    this.wrapper.appendChild(btn);
    return btn;
  }

  onMainBtnClick() {}
  onMinusBtnClick() {}
  onPlusBtnClick() {}
}
