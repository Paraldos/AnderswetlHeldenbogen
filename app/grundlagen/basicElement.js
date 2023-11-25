import db from "../db/db.js";

export default class BasicElement {
  constructor(section, key) {
    this.section = section;
    this.dbEntry = db.grundlagen[key];
    this.element = this.createElement();
    this.nameInput = this.element.querySelector(".grundlagen__input");
    this.addChangeValueEvent();
  }

  createElement() {
    let element = document.createElement("div");
    element.classList.add(
      "grundlagen__basic-element",
      `grundlagen__${db.nameToId(this.dbEntry.name)}`
    );
    element.innerHTML = `
    <form>
      <label>${this.dbEntry.name}:</label>
      <input type="text" class="grundlagen__input" value="${this.dbEntry.value}">
    </form>
    `;
    this.section.contentContainer.appendChild(element);
    return element;
  }

  addChangeValueEvent() {
    this.nameInput.addEventListener("input", () => {
      this.dbEntry.value = this.nameInput.value;
    });
  }
}
