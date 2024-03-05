import database from "../../data/database.js";
import Section from "../section/section.js";
import flawsController from "../../javascript/flawsController.js";
import ListOfFlaws from "./ListOfFlaws.js";
import FlawSectionItem from "./flawsSectionItem.js";

export default class FlawsSection extends Section {
  constructor() {
    super("Schwächen", "flaws", true);
    this.onReset();
    this.updateVisibility();
    this.plusBtn.addEventListener("click", () => new ListOfFlaws());
    document.addEventListener("resetFlaws", () => this.onReset());
  }

  onToggleEdit() {
    super.onToggleEdit();
    this.updateVisibility();
    const spanVisibility = this.editToggle ? "" : "disabled";
    this.header.innerHTML = `Schwächen <span class="${spanVisibility}">(${flaws.getSum()})</span>`;
  }

  addFlawSectionItem() {
    if (!database.hero.flaws) return [];
    return database.hero.flaws.map(
      (el, index) => new FlawSectionItem(el.id, index, this)
    );
  }

  onReset() {
    this.content.innerHTML = "";
    this.flaws = this.addFlawSectionItem();
  }

  updateVisibility() {
    this.section.classList.toggle(
      "disabled",
      this.flaws.length <= 0 && !this.editToggle
    );
  }
}
