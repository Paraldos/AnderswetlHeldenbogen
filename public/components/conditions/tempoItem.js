import database from "../../data/database.js";
import flaws from "../../data/flaws.js";
import DescriptionModal from "../../templates/descriptionModal.js";

export default class Tempo {
  constructor(section) {
    this.section = section;
    this.container = section.content;
    this.item = this.createElement();
    document.addEventListener("updateConditions", () => this.updateMainBtn());
  }

  createElement() {
    let element = document.createElement("li");
    element.classList.add("states__list-item");
    element.innerHTML = `<button class="states__main-btn">Tempo: ${this.getValue()}</button>`;
    element.addEventListener(
      "click",
      () => new DescriptionModal(database.conditions.tempo)
    );
    this.container.appendChild(element);
    return element;
  }

  updateMainBtn() {
    let btn = document.querySelector(".states__main-btn");
    btn.innerText = `Tempo: ${this.getValue()}`;
  }

  getValue() {
    let value = database.hero.conditions.tempo;
    if (flaws.findFlaw("lahm")) value -= 2;
    return value;
  }
}
