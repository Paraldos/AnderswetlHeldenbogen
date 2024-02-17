import database from "../../data/database.js";
import flaws from "../../data/flaws.js";
import DescriptionModal from "../../templates/descriptionModal.js";

export default class TempoItem {
  constructor(section) {
    this.section = section;
    this.container = section.content;
    this.btn = this.createBtn();
    document.addEventListener("updateConditions", () => this.update());
  }

  createBtn() {
    let btn = document.createElement("button");
    btn.innerHTML = `Tempo: ${this.getValue()}`;
    btn.addEventListener(
      "click",
      () => new DescriptionModal(database.conditions.tempo)
    );
    this.container.appendChild(btn);
    return btn;
  }

  update() {
    this.btn.innerText = `Tempo: ${this.getValue()}`;
  }

  getValue() {
    let value = database.hero.conditions.tempo;
    if (flaws.findFlaw("lahm")) value -= 2;
    return value;
  }
}
