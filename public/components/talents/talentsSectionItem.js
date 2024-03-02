import database from "../../data/database.js";
import HeroTalent from "./heroTalent.js";
import ControllElement from "../controllElement/controllElement.js";

export default class TalentsSectionItem extends ControllElement {
  constructor(id, index, section) {
    super("talents");
    this.index = index;
    this.dbEntry = database.talents[id];
    this.heroEntry = database.hero.talents[index];
    this.section = section;
    this.container = section.content.querySelector(
      `.talents__${this.dbEntry.type}`
    );
    this.update();
    this.container.appendChild(this.wrapper);
    document.addEventListener("toggleEdit", () => this.update());
  }

  // ============== events
  onMainBtnClick() {
    new HeroTalent(this.dbEntry, this.index);
  }

  onMinusBtnClick() {
    talents.minusTalent(this.index);
    document.dispatchEvent(new Event("resetTalentHeader"));
    document.dispatchEvent(new Event("updateConditions"));
  }

  onPlusBtnClick() {
    talents.plusTalent(this.index);
    document.dispatchEvent(new Event("resetTalentHeader"));
    document.dispatchEvent(new Event("updateConditions"));
  }

  // ============== Helper
  update() {
    this.mainBtn.innerHTML = this.getMainBtnText();
    this.minusBtn.classList.toggle("disabled", !this.section.editToggle);
    this.minusBtn.disabled = this.heroEntry.level <= 1 && this.heroEntry.innate;
    if (this.dbEntry.max_level > 1) {
      this.plusBtn.classList.toggle("disabled", !this.section.editToggle);
      this.plusBtn.disabled = this.heroEntry.level >= this.dbEntry.max_level;
    } else {
      this.plusBtn.classList.add("disabled");
    }
  }

  getMainBtnText() {
    let txt = this.dbEntry.name;
    if (this.heroEntry.comment) {
      txt += "*";
    }
    if (this.dbEntry.max_level > 1) {
      txt += ` (${this.heroEntry.level})`;
    }
    return txt;
  }
}
