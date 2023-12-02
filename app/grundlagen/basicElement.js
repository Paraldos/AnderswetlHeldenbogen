import db from "../db/db.js";
import hero from "../hero/hero.js";

export default class BasicElement {
  constructor(section, key) {
    this.section = section;
    this.dbEntry = db.grundlagen[key];
    this.heroEntry = hero.grundlagen[key];
    this.element = this.createElement();
    this.nameInput = this.element.querySelector(".basic-element__input");
    this.addInputEvent();
  }

  createElement() {
    let element = document.createElement("div");
    element.classList.add("basic-element", "grundlagen__element");
    element.innerHTML = `
    <label>${this.dbEntry.name}:</label>
    <input type="text" class="basic-element__input" value="${this.heroEntry}" disabled>`;
    this.section.contentContainer.appendChild(element);
    return element;
  }

  addInputEvent() {
    this.nameInput.addEventListener("input", () => {
      this.heroEntry = this.nameInput.value;
    });
  }

  toggleEditBtn(on) {
    this.nameInput.disabled = !on;
  }
}
