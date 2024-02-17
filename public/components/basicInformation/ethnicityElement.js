import Database from "../../data/database.js";
import EthnicityModal from "./ethnicityModal.js";

export default class EthnicityElement {
  constructor(sectionContent) {
    this.sectionContent = sectionContent;
    this.heroEthnicity = Database.hero.basicInformation.volk;
    this.element = this.createElement();
    this.ethnicityBtn = this.element.querySelector(".basics__ethnicity-btn");
    this.updateEthnicityBtn();
    this.ethnicityBtn.addEventListener("click", () => new EthnicityModal());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
    document.addEventListener("updateEthnecity", () =>
      this.updateEthnicityBtn()
    );
  }

  createElement() {
    let element = Object.assign(document.createElement("div"), {
      classList: "basics__ethnicity-element",
      innerHTML: `
        <label class="basics__label">${this.heroEthnicity.name}:</label>
        <button class="basics__ethnicity-btn" disabled>placeholder</button>`,
    });
    this.sectionContent.appendChild(element);
    return element;
  }

  updateEthnicityBtn() {
    this.ethnicityBtn.innerText = this.heroEthnicity.value
      ? Database.voelker[this.heroEthnicity.value].name
      : "...";
  }

  onToggleEdit() {
    this.ethnicityBtn.disabled = !this.ethnicityBtn.disabled;
  }
}
