import database from "../../data/database.js";
import Section from "../section/section.js";
import ComplexConditionItem from "./ComplexConditionItem.js";
import SimpleConditionItem from "./simpleConditionItem.js";
import SchicksalItem from "./schicksalItem.js";
import TempoItem from "./tempoItem.js";

export default class ConditionSection extends Section {
  constructor() {
    super("Merkmale", "condition");
    new ComplexConditionItem("ap", this);
    new ComplexConditionItem("lp", this);
    new SchicksalItem(this);
    new SimpleConditionItem("ep", this);
    new SimpleConditionItem("stufe", this);
    new TempoItem(this);
    document.addEventListener("updateConditionsHeader", () => {
      this.update();
    });
  }

  onToggleEdit() {
    super.onToggleEdit();
    this.update();
  }

  update() {
    const visible = this.editToggle ? "" : "disabled";
    this.header.innerHTML = `Merkmale <span class="${visible}">(${this.getConditionsSum()})</span>`;
  }

  getConditionsSum() {
    let sum = -14;
    sum += database.hero.conditions.ap.max;
    sum += database.hero.conditions.lp.max;
    return sum;
  }
}
