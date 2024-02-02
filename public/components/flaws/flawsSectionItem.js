import database from "../../data/database.js";
import flaws from "../../data/flaws.js";
import HeroFlaw from "./heroFlaw.js";

export default class FlawSectionItem {
  constructor(id, index, section) {
    this.index = index;
    this.section = section;
    this.dbEntry = database.flaws[id];
    this.flaw = database.hero.flaws[this.index];
    this.item = this.createItem();
    this.createMainBtn();
    this.createMinusBtn();
  }

  createItem() {
    const el = document.createElement("div");
    el.classList.add("flaw");
    this.section.content.appendChild(el);
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
    new HeroFlaw(this.dbEntry, this.index);
  }

  createMinusBtn() {
    const el = document.createElement("button");
    el.classList.add("flaw__minus-btn", "symbol-btn");
    el.disabled = this.flaw.innate ? true : false;
    el.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    el.addEventListener("click", () => this.onMinusBtnClick());
    document.addEventListener("toggleEdit", () => this.onToggleEdit(el));
    this.onToggleEdit(el);
    this.item.appendChild(el);
  }

  onMinusBtnClick() {
    flaws.removeFlaw(this.index);
  }

  onToggleEdit(btn) {
    btn.classList.toggle("disabled", !this.section.editToggle);
  }
}
