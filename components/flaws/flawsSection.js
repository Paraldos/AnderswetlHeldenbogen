import hero from "../../data/hero.js";
import Section from "../section/section.js";
import FlawsModal from "./flawsModal.js";
import SingleFlaw from "./singleFlaw.js";

export default class FlawsSection {
  constructor() {
    // init
    this.section = new Section("Schwächen", "flaws", true);
    this.container = document.querySelector(".flaws__content");
    this.flaws = this.addFlaws();
    this.updateVisibility();
    // events
    this.section.plusBtn.addEventListener("click", () => new FlawsModal());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
    document.addEventListener("resetFlaws", () => this.onReset());
  }

  // ============================== init
  addFlaws() {
    if (!hero.flaws.value) return [];
    return hero.flaws.value.map(
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
    const spanVisibility = this.section.editToggle ? "" : "invisible";
    this.section.headerText.innerHTML = `Schwächen <span class="${spanVisibility}">(${hero.flaws.getSum()})</span>`;
    this.updateVisibility();
  }

  // ============================== helper
  updateVisibility() {
    const visibility = !this.section.editToggle && hero.flaws.value.length <= 0;
    this.section.section.classList.toggle("invisible", visibility);
  }
}
