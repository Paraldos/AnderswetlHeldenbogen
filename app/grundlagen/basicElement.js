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
    let name = document.createElement("div");
    name.classList.add(
      "grundlagen__basic-element",
      `grundlagen__${db.nameToId(this.dbEntry.name)}`
    );
    name.innerHTML = `
    <form>
      <label>${this.dbEntry.name}:</label>
      <input type="text" class="grundlagen__input" value="${this.dbEntry.value}">
    </form>
    `;
    this.section.contentContainer.appendChild(name);
    return name;
  }

  addChangeValueEvent() {
    this.nameInput.addEventListener("input", () => {
      this.dbEntry.value = this.nameInput.value;
    });
  }
}
