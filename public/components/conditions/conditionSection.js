import hero from "../../data/hero.js";
import Section from "../../templates/section.js";
import ComplexCondition from "./comlexCondition.js";
import SimpleCondition from "./simpleCondition.js";
import Tempo from "./tempoItem.js";

export default class ConditionSection {
  constructor() {
    this.section = new Section("Merkmale", "states");
    // init
    // new ComplexCondition("ap", this.section.content);
    // new ComplexCondition("lp", this.section.content);
    // new ComplexCondition("sp", this.section.content);
    // new SimpleCondition("ep", this.section.content);
    // new SimpleCondition("stufe", this.section.content);
    // new Tempo(this.section.content);
    // events
    this.editElement = this.section.content.querySelectorAll(
      ".states__edit-element"
    );
    document.addEventListener("updateStatesHeader", () => {
      this.updateSectionHeader();
    });
    document.addEventListener("toggleEdit", () => this.updateSectionHeader());
  }

  updateSectionHeader() {
    const visible = this.section.editToggle ? "" : "invisible";
    this.section.headerText.innerHTML = `Merkmale <span class="${visible}">(${this.getStatesSum()})</span>`;
  }

  getStatesSum() {
    let sum = -14;
    sum += hero.states.ap.max;
    sum += hero.states.lp.max;
    return sum;
  }
}
