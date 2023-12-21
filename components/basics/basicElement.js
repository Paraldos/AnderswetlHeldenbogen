import db from "../../data/db.js";
import hero from "../../data/hero.js";

export default class BasicElement {
  constructor(container, key) {
    this.container = container;
    this.key = key;
    this.dbEntry = db.grundlagen[key];
    this.element = this.createElement();
    this.nameInput = this.element.querySelector(".basic-element__input");
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
    this.nameInput.addEventListener("input", () => this.onInputEvent());
  }

  createElement() {
    let element = Object.assign(document.createElement("div"), {
      classList: "basic-element grundlagen__element",
      innerHTML: `
        <label>${this.dbEntry.name}:</label>
        <input 
          type="text" 
          class="basic-element__input" 
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
