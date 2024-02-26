import database from "../../../data/database.js";

export default class Other {
  constructor(section) {
    this.section = section;

    this.other = this.createOther();
    this.header = this.other.querySelector(".inventory__header");
    this.text = this.other.querySelector(".inventory__text-area");
    this.update();

    this.text.addEventListener("input", () => this.onTextInput());
    document.addEventListener("toggleEdit", () => this.update());
  }

  createOther() {
    let element = document.createElement("div");
    element.className = "inventory__other";
    element.innerHTML = `
      <div class="inventory__sub-header">
        <h3>Sonstiges</h3>
      </div>
      <textarea class="inventory__text-area" disabled>${database.hero.otherInventory}</textarea>
    `;
    this.section.content.appendChild(element);
    return element;
  }

  onTextInput() {
    database.hero.otherInventory = this.text.value;
    database.saveHero();
  }

  update() {
    this.text.disabled = !this.section.editToggle;
  }
}
