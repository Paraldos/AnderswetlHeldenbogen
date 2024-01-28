import database from "../../data/database.js";
import talents from "../../data/talents.js";
import TalentModal from "./talentModal.js";

export default class SectionTalent {
  constructor(id, index, btnVisiblity) {
    this.index = index;
    this.btnVisiblity = btnVisiblity;
    this.talent = database.hero.talents[this.index];
    this.dbEntry = database.talents[id];
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
    const btn = document.createElement("button");
    btn.className = "talent__main-btn";
    btn.innerHTML = `
      ${this.dbEntry.name}
      ${this.talent.comment ? "*" : ""}
      ${this.dbEntry.max_level > 1 ? `(${this.talent.level})` : ""}`;
    // ${
    //   this.dbEntry.name == "Veranlagung" &&
    //   hero.veranlagung.getVeranlagungName()
    //     ? ` (${hero.veranlagung.getVeranlagungName()})`
    //     : ""
    // };
    btn.addEventListener("click", () => this.onMainBtnclick());
    sectionTalent.appendChild(btn);
  }

  onMainBtnclick() {
    new TalentModal(this.dbEntry, this.index);
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
    this.updatePlusBtnVisibility(btn);
    btn.addEventListener("click", () => this.onPlusBtnClick());
    document.addEventListener("toggleEdit", () => {
      this.onToggleEdit(btn);
      this.updatePlusBtnVisibility(btn);
    });
    sectionTalent.appendChild(btn);
  }

  updatePlusBtnVisibility(btn) {
    if (this.talent.level >= this.dbEntry.max_level) {
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
