import db from "../db/db.js";
import hero from "../hero/hero.js";

export default class BeschreibungElement {
  constructor(section) {
    this.section = section;
    this.element = this.createElement();
    this.txt = this.element.querySelector(".beschreibung-element__text");
    this.addTextEvent();
  }

  createElement() {
    let element = document.createElement("div");
    element.classList.add("beschreibung-element", "grundlagen__element");
    element.innerHTML = `
      <label>${db.grundlagen.beschreibung.name}:</label>
      <textarea class="beschreibung-element__text" disabled>${hero.grundlagen.beschreibung}</textarea>`;
    this.section.contentContainer.appendChild(element);
    return element;
  }

  addTextEvent() {
    this.txt.addEventListener("input", () => {
      hero.grundlagen.beschreibung = this.txt.value;
    });
  }

  toggleEditBtn(on) {
    this.txt.disabled = !on;
  }
}
