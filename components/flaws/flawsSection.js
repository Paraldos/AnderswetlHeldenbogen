import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import FlawModal from "./flawModal.js";
import DbFlawsModal from "./dbFlawsModal.js";

export default class FlawsSection {
  constructor() {
    this.section = new Section("Schwächen", "flaws", true);
    this.container = document.querySelector(".flaws__content");
    this.flaws = this.addFlaws();
    this.section.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    this.section.editBtn.addEventListener("click", () => this.onEditBtnClick());
    document.addEventListener("resetFlaws", () => this.onReset());
  }

  addFlaws() {
    let arr = [];
    if (!hero.flaws.value) return arr;
    hero.flaws.value.forEach((el, index) => {
      arr.push(
        new SingleFlaw(
          el.id,
          index,
          this.section.editBtn.classList.contains("on")
        )
      );
    });
    return arr;
  }

  onPlusBtnClick() {
    new DbFlawsModal();
  }

  onEditBtnClick() {
    const btnIsOn = this.section.toggleEditBtn();
    this.flaws.forEach((el) => el.toggleEditBtn(btnIsOn));
    this.updateSectionHeader();
  }

  onReset() {
    this.container.innerHTML = "";
    this.flaws = this.addFlaws();
    this.updateSectionHeader();
  }

  updateSectionHeader() {
    if (this.section.editBtn.classList.contains("on")) {
      this.section.updateHeader(`Schwächen (${this.getSchwaechenSum()})`);
    } else {
      this.section.updateHeader("Schwächen");
    }
  }

  getSchwaechenSum() {
    return hero.flaws.value.length;
  }
}

class SingleFlaw {
  constructor(id, index, btnsVisiblity) {
    this.id = id;
    this.index = index;
    this.container = document.querySelector(".flaws__content");
    this.dbEntry = db.schwaechen[id];
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".flaw__main-btn");
    this.minusBtn = this.element.querySelector(".flaw__minus-btn");
    this.mainBtn.addEventListener("click", () => this.onMainBtnClick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    this.updateBtns();
    this.toggleEditBtn(btnsVisiblity);
  }

  createElement() {
    let newElement = document.createElement("div");
    newElement.classList.add("flaw");
    newElement.innerHTML = `
      <button class="flaw__main-btn">${this.dbEntry.name}</button>
      <button class="flaw__minus-btn symbol-btn">
        <i class="fa-solid fa-minus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  updateBtns() {
    hero.flaws.value[this.index].innate
      ? this.minusBtn.setAttribute("disabled", true)
      : this.minusBtn.removeAttribute("disabled");
  }

  onMainBtnClick() {
    new FlawModal(this.dbEntry, this.index);
  }

  onMinusBtnClick() {
    hero.flaws.removeFlaw(this.index);
  }

  toggleEditBtn(btnsVisible) {
    if (btnsVisible) {
      this.minusBtn.classList.remove("invisible");
    } else {
      this.minusBtn.classList.add("invisible");
    }
    this.updateBtns();
  }
}
