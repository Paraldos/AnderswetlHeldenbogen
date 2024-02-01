import database from "../../data/database.js";
import Section from "../../templates/section.js";
import flaws from "../../data/flaws.js";
import ListOfFlaws from "./ListOfFlaws.js";
import FlawSectionItem from "./flawSectionItem.js";

export default class FlawsSection {
  constructor() {
    this.section = new Section("Schwächen", "flaws", true);
    this.onReset();
    this.section.plusBtn.addEventListener("click", () => new ListOfFlaws());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
    document.addEventListener("resetFlaws", () => this.onReset());
  }

  addFlawSectionItem() {
    if (!database.hero.flaws) return [];
    return database.hero.flaws.map(
      (el, index) => new FlawSectionItem(el.id, index, this.section)
    );
  }

  onToggleEdit() {
    const spanVisibility = this.section.editToggle ? "" : "disabled";
    this.section.header.innerHTML = `Schwächen <span class="${spanVisibility}">(${flaws.getSum()})</span>`;
  }

  onReset() {
    this.section.content.innerHTML = "";
    this.flaws = this.addFlawSectionItem();
    this.onToggleEdit();
  }
}
