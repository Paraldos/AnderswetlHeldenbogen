import database from "../../data/database.js";
import talents from "../../data/talents.js";
import HeroTalent from "./heroTalent.js";

export default class TalentsSectionItem {
  constructor(id, index, btnVisiblity) {
    this.index = index;
    this.btnVisiblity = btnVisiblity;
    this.dbEntry = database.talents[id];
    this.heroEntry = database.hero.talents[index];
    this.container = document.querySelector(`.talents__${this.dbEntry.type}`);
    this.initSectionTalent();
  }

  initSectionTalent() {
    const sectionTalent = document.createElement("div");
    sectionTalent.className = "talent";
    this.createMainBtn(sectionTalent);
    this.createMinusBtn(sectionTalent);
    this.createPlusBtn(sectionTalent);
    this.container.appendChild(sectionTalent);
  }

  createMainBtn(sectionTalent) {
    const el = document.createElement("button");
    el.className = "talent__main-btn";
    el.insertAdjacentHTML("beforeend", this.dbEntry.name);
    if (this.heroEntry.comment) {
      el.insertAdjacentHTML("beforeend", "*");
    }
    if (this.dbEntry.max_level > 1) {
      el.insertAdjacentHTML("beforeend", ` (${this.heroEntry.level})`);
    }
    el.addEventListener("click", () => this.onMainBtnclick());
    sectionTalent.appendChild(el);
  }

  onMainBtnclick() {
    new HeroTalent(this.dbEntry, this.index);
  }

  createMinusBtn(sectionTalent) {
    const btn = document.createElement("button");
    btn.className = "talent__minus-btn symbol-btn";
    this.btnVisiblity ? "" : btn.classList.add("disabled");
    btn.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    btn.addEventListener("click", () => this.onMinusBtnClick());
    document.addEventListener("toggleEdit", () => this.onToggleEdit(btn));
    sectionTalent.appendChild(btn);
  }

  onMinusBtnClick() {
    talents.minusTalent(this.index);
    document.dispatchEvent(new Event("resetTalentHeader"));
  }

  createPlusBtn(sectionTalent) {
    const btn = document.createElement("button");
    btn.className = "talent__plus-btn symbol-btn";
    btn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    this.btnVisiblity ? "" : btn.classList.add("disabled");
    this.updatePlusBtnVisibility(btn);
    btn.addEventListener("click", () => this.onPlusBtnClick());
    document.addEventListener("toggleEdit", () => {
      this.onToggleEdit(btn);
      this.updatePlusBtnVisibility(btn);
    });
    sectionTalent.appendChild(btn);
  }

  updatePlusBtnVisibility(btn) {
    if (this.heroEntry.level >= this.dbEntry.max_level) {
      btn.classList.add("disabled");
    }
  }

  onPlusBtnClick() {
    talents.plusTalent(this.index);
    document.dispatchEvent(new Event("resetTalentHeader"));
  }

  onToggleEdit(btn) {
    btn.classList.toggle("disabled");
  }
}
