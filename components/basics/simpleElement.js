import db from "../../data/db.js";
import hero from "../../data/hero.js";

export default class SimpleElement {
  constructor(container, key) {
    this.container = container;
    this.key = key;
    this.dbEntry = db.grundlagen[key];
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
          value="${hero.grundlagen[this.key]}" 
          disabled>`,
    });
    this.container.appendChild(element);
    return element;
  }

  onInputEvent() {
    this.nameInput.addEventListener("input", () => {
      hero.grundlagen[this.key] = this.nameInput.value;
      hero.saveHero();
    });
  }

  onToggleEdit() {
    this.nameInput.disabled = !this.nameInput.disabled;
  }
}
