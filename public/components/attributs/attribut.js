import database from "../../data/database.js";
import DescriptionModal from "../descriptionModal/descriptionModal.js";

export default class Attribut {
  constructor(key, container) {
    this.key = key;
    this.container = container;
    this.dbEntry = database.attributs[key];
    this.element = this.createElement();
    // document.addEventListener("resetAttributs", () => this.updateElement());
  }

  createElement() {
    const element = document.createElement("div");
    element.classList.add("attribut");
    element.append(
      this.createMainBtn(),
      this.createMinusBtn(),
      this.createPlusBtn()
    );
    this.container.appendChild(element);
    return element;
  }

  createButton(classes, innerHTML, clickHandler, toggleEdit = false) {
    const btn = document.createElement("button");
    btn.classList.add(...classes);
    btn.innerHTML = innerHTML;
    btn.addEventListener("click", clickHandler);
    if (toggleEdit) {
      document.addEventListener("toggleEdit", () => this.onToggleEdit(btn));
    }
    return btn;
  }

  createMainBtn() {
    return this.createButton(["attribut__main-btn"], this.getMainBtnTxt(), () =>
      this.onMainBtnClick()
    );
  }

  createMinusBtn() {
    return this.createButton(
      ["attribut__minus-btn", "symbol-btn", "disabled"],
      `<i class="fa-solid fa-minus"></i>`,
      () => this.onMinusBtnClick(),
      true
    );
  }

  createPlusBtn() {
    return this.createButton(
      ["attribut__plus-btn", "symbol-btn", "disabled"],
      `<i class="fa-solid fa-plus"></i>`,
      () => this.onPlusBtnClick(),
      true
    );
  }

  // events
  onMainBtnClick() {
    new DescriptionModal(this.dbEntry);
  }

  onMinusBtnClick() {
    if (this.heroValue > 1) {
      this.heroValue -= 1;
      this.updateElement();
      database.saveHero();
    }
  }

  onPlusBtnClick() {
    if (this.heroValue < 5) {
      this.heroValue += 1;
      this.updateElement();
      database.saveHero();
    }
  }

  onToggleEdit(btn) {
    btn.classList.toggle("disabled");
  }

  // Helper
  get heroValue() {
    return database.hero.attributs[this.key].value;
  }

  set heroValue(value) {
    database.hero.attributs[this.key].value = value;
  }

  getMainBtnTxt() {
    return `${this.dbEntry.name}: ${this.heroValue}`;
  }

  updateElement() {
    const mainBtn = this.element.querySelector(".attribut__main-btn");
    mainBtn.innerHTML = this.getMainBtnTxt();
    document.dispatchEvent(new Event("updateAttributsHeader"));
  }
}
