import db from "../db/db.js";

export default class BasicElement {
  constructor(section, key) {
    this.section = section;
    this.dbEntry = db.grundlagen[key];
    this.element = this.createElement();
    this.nameInput = this.element.querySelector(".basic-element__input");
    this.addInputEvent();
  }

  createElement() {
    let element = document.createElement("div");
    element.classList.add("basic-element", "grundlagen__element");
    element.innerHTML = `
    <label>${this.dbEntry.name}:</label>
    <input type="text" class="basic-element__input" value="${this.dbEntry.value}" disabled>`;
    this.section.contentContainer.appendChild(element);
    return element;
  }

  addInputEvent() {
    this.nameInput.addEventListener("input", () => {
      this.dbEntry.value = this.nameInput.value;
    });
  }

  toggleEditBtn(on) {
    this.nameInput.disabled = !on;
  }
}
