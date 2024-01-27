import Database from "../../data/database.js";

export default class SimpleElement {
  constructor(container, key) {
    this.container = container;
    this.key = key;
    this.dbEntry = Database.hero.basicInformation[key];
    this.element = this.createElement();
    this.nameInput = this.element.querySelector(".basics__simple-input");
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
    this.nameInput.addEventListener("input", () => this.onInputEvent());
  }

  createElement() {
    let element = Object.assign(document.createElement("div"), {
      classList: "basics__simple-element",
      innerHTML: `
        <label class="basics__label">${this.dbEntry.name}:</label>
        <input 
          type="text" 
          class="basics__simple-input" 
          value="${this.dbEntry.value}" 
          disabled>`,
    });
    this.container.appendChild(element);
    return element;
  }

  onInputEvent() {
    this.nameInput.addEventListener("input", () => {
      Database.hero.basicInformation[this.key].value = this.nameInput.value;
      Database.saveHero();
    });
  }

  onToggleEdit() {
    this.nameInput.disabled = !this.nameInput.disabled;
  }
}
