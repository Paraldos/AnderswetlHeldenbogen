import db from "../../data/db.js";
import hero from "../../data/hero.js";
import VolkModal from "./volkModal.js";

export default class EthnicityElement {
  constructor(container) {
    this.container = container;
    this.dbEntry = db.grundlagen.volk;
    this.element = this.createElement();
    this.ethnicityBtn = this.element.querySelector(".basics__ethnicity-btn");
    this.updateEthnicityBtn();
    this.ethnicityBtn.addEventListener("click", () => new VolkModal());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
    document.addEventListener("updateEthnecity", () =>
      this.updateEthnicityBtn()
    );
  }

  createElement() {
    let element = Object.assign(document.createElement("div"), {
      classList: "basics__ethnicity-element",
      innerHTML: `
        <label>${this.dbEntry.name}:</label>
        <button class="basics__ethnicity-btn" disabled>placeholder</button>`,
    });
    this.container.appendChild(element);
    return element;
  }

  updateEthnicityBtn() {
    this.ethnicityBtn.innerText = hero.grundlagen.volk
      ? db.voelker[hero.grundlagen.volk].name
      : "...";
  }

  onToggleEdit() {
    this.ethnicityBtn.disabled = !this.ethnicityBtn.disabled;
  }
}
