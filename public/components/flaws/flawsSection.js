import database from "../../data/database.js";
import Section from "../../templates/section.js";
import flaws from "../../data/flaws.js";
import ListOfFlaws from "./ListOfFlaws.js";

export default class FlawsSection {
  constructor() {
    this.section = new Section("Schwächen", "flaws", true);
    this.flaws = this.addFlawSectionItem();
    this.section.plusBtn.addEventListener("click", () => new ListOfFlaws());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
    document.addEventListener("resetFlaws", () => this.onReset());
  }

  addFlawSectionItem() {
    if (!database.hero.flaws) return [];
    return database.hero.flaws.map(
      (el, index) => new FlawSectionItem(el.id, index, !this.section.editToggle)
    );
  }

  onToggleEdit() {
    const spanVisibility = this.section.editToggle ? "" : "disabled";
    this.section.header.innerHTML = `Schwächen <span class="${spanVisibility}">(${flaws.getSum()})</span>`;
  }

  onReset() {
    this.section.content.innerHTML = "";
    this.flaws = this.addFlaws();
    this.onToggleEdit();
  }
}

class FlawSectionItem {
  constructor(id, index, btnsVisiblity) {
    this.index = index;
    this.btnsVisiblity = btnsVisiblity;
    this.dbEntry = database.flaws[id];
    this.flaw = database.hero.flaws[this.index];
    this.item = this.createItem();
    this.createMainBtn();
    this.createMinusBtn();
  }

  createItem() {
    const sectionContent = document.querySelector(".flaws__content");
    const el = document.createElement("div");
    el.classList.add("flaw");
    sectionContent.appendChild(el);
    return el;
  }

  createMainBtn() {
    const el = document.createElement("button");
    el.classList.add("flaw__main-btn");
    el.innerHTML = `${this.dbEntry.name}${this.flaw.comment ? "*" : ""}`;
    el.addEventListener("click", () => this.onMainBtnClick());
    this.item.appendChild(el);
  }

  onMainBtnClick() {
    new FlawModal(this.dbEntry, this.index);
  }

  createMinusBtn() {
    const el = document.createElement("button");
    el.classList.add("flaw__minus-btn", "symbol-btn");
    if (this.btnsVisiblity) el.classList.add("disabled");
    el.disabled = this.flaw.innate ? true : false;
    el.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    el.addEventListener("click", () => this.onMinusBtnClick());
    document.addEventListener("toggleEdit", () => this.onToggleEdit(el));
    this.item.appendChild(el);
  }

  onMinusBtnClick() {
    hero.flaws.removeFlaw(this.index);
  }

  onToggleEdit(btn) {
    this.btnsVisiblity = !this.btnsVisiblity;
    btn.classList.toggle("disabled", this.btnsVisiblity);
  }
}
