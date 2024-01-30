import database from "../../data/database.js";
import Section from "../../templates/section.js";
// import FlawsModal from "./flawsModal.js";
// import SingleFlaw from "./singleFlaw.js";

export default class FlawsSection {
  constructor() {
    // init
    this.section = new Section("Schwächen", "flaws", true);
    this.container = document.querySelector(".flaws__content");
    this.flaws = this.addFlaws();
    // events
    this.section.plusBtn.addEventListener("click", () => new FlawsModal());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
    document.addEventListener("resetFlaws", () => this.onReset());
  }

  // ============================== init
  addFlaws() {
    if (!database.hero.flaws) return [];
    return database.hero.flaws.map(
      (el, index) => new SingleFlaw(el.id, index, this.section.editToggle)
    );
  }

  // ============================== events
  onReset() {
    this.container.innerHTML = "";
    this.flaws = this.addFlaws();
    this.onToggleEdit();
  }

  onToggleEdit() {
    const spanVisibility = this.section.editToggle ? "" : "disabled";
    this.section.headerText.innerHTML = `Schwächen <span class="${spanVisibility}">(${hero.flaws.getSum()})</span>`;
    this.updateVisibility();
  }
}
