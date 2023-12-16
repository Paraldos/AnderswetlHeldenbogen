import db from "../../data/db.js";
import hero from "../../data/hero.js";
import VolkModal from "./volkModal.js";

export default class VolkElement {
  constructor(section) {
    this.section = section;
    this.dbEntry = db.grundlagen.volk;
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".volk-element__main-btn");
    this.updateMainBtn();
    this.addEventListeners();
  }

  createElement() {
    let element = document.createElement("div");
    element.classList.add("volk-element", "grundlagen__element");
    element.innerHTML = `
      <label>${this.dbEntry.name}:</label>
      <button class="volk-element__main-btn" disabled>???</button>`;
    this.section.contentContainer.appendChild(element);
    return element;
  }

  addEventListeners() {
    this.mainBtn.addEventListener("click", () => new VolkModal());
    document.addEventListener("updateVolk", () => this.updateMainBtn());
  }

  updateMainBtn() {
    this.mainBtn.innerText = hero.grundlagen.volk
      ? db.voelker[hero.grundlagen.volk].name
      : "...";
  }

  toggleEditBtn(on) {
    this.mainBtn.disabled = !on;
  }
}
