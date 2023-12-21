import hero from "../../data/hero.js";
import Section from "../section/section.js";
import ComplexListItem from "./complexListItem.js";
import SimpleListItem from "./simpleListItem.js";
import Tempo from "./tempoItem.js";

export default class StatesSection {
  constructor() {
    this.section = new Section("Merkmale", "states");
    this.container = this.section.contentContainer;
    // init
    new ComplexListItem("ap", this.container);
    new ComplexListItem("lp", this.container);
    new ComplexListItem("sp", this.container);
    new SimpleListItem("ep", this.container);
    new SimpleListItem("stufe", this.container);
    new Tempo(this.container);
    // events
    this.editElement = this.container.querySelectorAll(".states__edit-element");
    document.addEventListener("updateStatesHeader", () => {
      this.updateSectionHeader();
    });
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
