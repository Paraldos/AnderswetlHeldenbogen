import db from "../../data/db.js";
import hero from "../../data/hero.js";
import FlawModal from "./flawModal.js";

export default class SingleFlaw {
  constructor(id, index, btnsVisiblity) {
    this.id = id;
    this.index = index;
    this.btnsVisiblity = btnsVisiblity;
    this.container = document.querySelector(".flaws__content");
    this.dbEntry = db.flaws[id];
    this.flaw = hero.flaws.value[this.index];
    // init
    this.element = this.initElement(btnsVisiblity);
    this.mainBtn = this.element.querySelector(".flaw__main-btn");
    this.minusBtn = this.element.querySelector(".flaw__minus-btn");
    this.updateBtns();
    this.onToggleEdit();
    // events
    this.mainBtn.addEventListener("click", () => this.onMainBtnClick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  // ============================== init
  initElement() {
    const txt = `${this.dbEntry.name}${this.flaw.comment ? "*" : ""}`;
    const visibility = this.btnsVisiblity ? "invisible" : "";
    let newElement = document.createElement("div");
    newElement.classList.add("flaw");
    newElement.innerHTML = `
      <button class="flaw__main-btn">${txt}</button>
      <button class="flaw__minus-btn symbol-btn ${visibility}">
        <i class="fa-solid fa-minus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  // ============================== helper
  updateBtns() {
    this.flaw.innate
      ? this.minusBtn.setAttribute("disabled", true)
      : this.minusBtn.removeAttribute("disabled");
  }

  // ============================== events
  onMainBtnClick() {
    new FlawModal(this.dbEntry, this.index);
  }

  onMinusBtnClick() {
    hero.flaws.removeFlaw(this.index);
  }

  onToggleEdit() {
    this.minusBtn.classList.toggle("invisible");
  }
}
