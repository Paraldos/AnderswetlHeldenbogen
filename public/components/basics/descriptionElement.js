import db from "../../data/db.js";
import hero from "../../data/hero.js";

export default class DescriptionElement {
  constructor(section) {
    this.section = section;
    this.element = this.createElement();
    this.txt = this.element.querySelector(".basics__description-text");
    this.txt.addEventListener("input", () => this.onTxtChange());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  createElement() {
    let element = Object.assign(document.createElement("div"), {
      classList: "basics__description",
      innerHTML: `
        <label class="basics__label">${db.grundlagen.beschreibung.name}:</label>
        <textarea class="basics__description-text" disabled>${hero.grundlagen.beschreibung}</textarea>`,
    });
    this.section.contentContainer.appendChild(element);
    return element;
  }

  onTxtChange() {
    hero.grundlagen.beschreibung = this.txt.value;
    hero.saveHero();
  }

  onToggleEdit() {
    this.txt.disabled = !this.txt.disabled;
  }
}
