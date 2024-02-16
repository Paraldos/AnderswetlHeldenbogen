import database from "../../data/database.js";
import DescriptionModal from "../../templates/descriptionModal.js";
import talents from "../../data/talents.js";
import flaws from "../../data/flaws.js";
import PlusBtn from "../../templates/plusBtn.js";
import MinusBtn from "../../templates/minusBtn.js";

export default class SchicksalItem {
  constructor(section) {
    this.section = section;
    this.container = section.content;
    this.wrapper = this.createWrapper();
    this.mainBtn = this.createMainBtn();
    document.addEventListener("updateConditions", () => this.updateMainBtn());
  }

  createWrapper() {
    let wrapper = document.createElement("li");
    wrapper.classList.add("states__list-item");
    wrapper.addEventListener(
      "click",
      () => new DescriptionModal(database.conditions.sp)
    );
    this.container.appendChild(wrapper);
    return wrapper;
  }

  createMainBtn() {
    let btn = document.createElement("button");
    btn.classList.add("condition__main-btn");
    btn.innerText = this.getMainBtnTxt();
    btn.addEventListener("click", () => new DescriptionModal(this.dbEntry));
    this.wrapper.appendChild(btn);
    return btn;
  }

  updateMainBtn() {
    this.mainBtn.innerText = this.getMainBtnTxt();
  }

  getMainBtnTxt() {
    return `SP: ${this.getCurrent()} von ${this.getMax()}`;
  }

  getCurrent() {
    return database.hero.conditions.sp.current;
  }

  getMax() {
    let value = database.hero.conditions.sp.max;
    if (talents.findTalent("glueck")) value++;
    if (flaws.findFlaw("pech")) value--;
    return value;
  }
}
