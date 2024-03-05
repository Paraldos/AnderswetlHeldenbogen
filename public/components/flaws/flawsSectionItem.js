import database from "../../data/database.js";
import flawsController from "../../javascript/flawsController.js";
import HeroFlaw from "./heroFlaw.js";
import ControllElement from "../controllElement/controllElement.js";

export default class FlawSectionItem extends ControllElement {
  constructor(id, index, section) {
    super("flaw");
    this.index = index;
    this.section = section;
    this.dbEntry = database.flaws[id];
    this.flaw = database.hero.flaws[this.index];
    this.plusBtn.remove();
    this.update();
    this.section.content.appendChild(this.wrapper);
    document.addEventListener("toggleEdit", () => this.update());
  }

  onMainBtnClick() {
    new HeroFlaw(this.dbEntry, this.index);
  }

  onMinusBtnClick() {
    flawsController.removeFlaw(this.index);
    document.dispatchEvent(new Event("updateConditions"));
  }

  update() {
    this.mainBtn.innerHTML = `${this.dbEntry.name}${
      this.flaw.comment ? "*" : ""
    }`;
    this.minusBtn.classList.toggle("disabled", !this.section.editToggle);
    if (this.flaw.innate) {
      this.minusBtn.disabled = true;
    }
  }
}
