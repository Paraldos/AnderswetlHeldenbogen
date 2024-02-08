import hero from "../../data/hero.js";
import Section from "../../templates/section.js";
import ComplexCondition from "./comlexCondition.js";
import SimpleState from "./simpleState.js";
import Tempo from "./tempoItem.js";

export default class ConditionSection {
  constructor() {
    this.section = new Section("Merkmale", "states");
    this.container = this.section.contentContainer;
    // init
    new ComplexCondition("ap", this.container);
    new ComplexCondition("lp", this.container);
    new ComplexCondition("sp", this.container);
    new SimpleState("ep", this.container);
    new SimpleState("stufe", this.container);
    new Tempo(this.container);
    // events
    this.editElement = this.container.querySelectorAll(".states__edit-element");
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
