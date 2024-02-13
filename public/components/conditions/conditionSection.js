import database from "../../data/database.js";
import Section from "../../templates/section.js";
import ComplexCondition from "./comlexCondition.js";
import SimpleCondition from "./simpleCondition.js";
import Tempo from "./tempoItem.js";

export default class ConditionSection {
  constructor() {
    this.section = new Section("Merkmale", "states");
    new ComplexCondition("ap", this.section);
    new ComplexCondition("lp", this.section);
    // new ComplexCondition("sp", this.section);
    // new SimpleCondition("ep", this.section.content);
    // new SimpleCondition("stufe", this.section.content);
    // new Tempo(this.section.content);
    document.addEventListener("updateConditionsHeader", () => {
      this.updateHeader();
    });
    document.addEventListener("toggleEdit", () => this.updateHeader());
  }

  updateHeader() {
    const visible = this.section.editToggle ? "" : "disabled";
    this.section.header.innerHTML = `Merkmale <span class="${visible}">(${this.getStatesSum()})</span>`;
  }

  getStatesSum() {
    let sum = -14;
    sum += database.hero.conditions.ap.max;
    sum += database.hero.conditions.lp.max;
    return sum;
  }
}
