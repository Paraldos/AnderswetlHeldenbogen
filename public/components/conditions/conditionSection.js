import database from "../../data/database.js";
import Section from "../../templates/section.js";
import ComplexConditionItem from "./ComplexConditionItem.js";
import SimpleConditionItem from "./simpleConditionItem.js";
import Tempo from "./tempoItem.js";

export default class ConditionSection {
  constructor() {
    this.section = new Section("Merkmale", "condition");
    new ComplexConditionItem("ap", this.section);
    new ComplexConditionItem("lp", this.section);
    // new ComplexCondition("sp", this.section);
    new SimpleConditionItem("ep", this.section);
    new SimpleConditionItem("stufe", this.section);
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
