import database from "../../data/database.js";
import SkillModal from "./skillModal.js";

export default class Skill {
  constructor(key) {
    this.key = key;
    this.dbEntry = database.skills[key];
    this.element = this.createElement();
  }

  createElement() {
    const container = document.querySelector(`.skills__${this.dbEntry.type}`);
    const element = document.createElement("div");
    element.classList.add("skill");
    element.append(
      this.createMainBtn(),
      this.createMinusBtn(),
      this.createPlusBtn()
    );
    container.appendChild(element);
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
    return this.createButton(["skill__main-btn"], this.getMainBtnTxt(), () =>
      this.onMainBtnClick()
    );
  }

  createMinusBtn() {
    return this.createButton(
      ["skill__minus-btn", "symbol-btn", "disabled"],
      `<i class="fa-solid fa-minus"></i>`,
      () => this.onMinusBtnClick(),
      true
    );
  }

  createPlusBtn() {
    return this.createButton(
      ["skill__plus-btn", "symbol-btn", "disabled"],
      `<i class="fa-solid fa-plus"></i>`,
      () => this.onPlusBtnClick(),
      true
    );
  }

  // events
  onMainBtnClick() {
    new SkillModal(this.dbEntry);
  }

  onMinusBtnClick() {
    if (this.heroValue > 0) {
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

  // helper
  get heroValue() {
    return database.hero.skills[this.key].value;
  }

  set heroValue(value) {
    database.hero.skills[this.key].value = value;
  }

  getMainBtnTxt() {
    return `${this.dbEntry.name}: ${this.heroValue}`;
  }

  updateElement() {
    const mainBtn = this.element.querySelector(".skill__main-btn");
    mainBtn.innerHTML = this.getMainBtnTxt();
    document.dispatchEvent(new Event("updateSkillsHeader"));
  }
}
