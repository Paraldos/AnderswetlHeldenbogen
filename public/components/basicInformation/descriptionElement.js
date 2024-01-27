import Database from "../../data/database.js";

export default class DescriptionElement {
  constructor(section) {
    this.section = section;
    this.element = this.createElement();
    this.textArea = this.element.querySelector(".basics__description-text");
    this.textArea.addEventListener("input", () => this.onTxtChange());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  createElement() {
    let element = Object.assign(document.createElement("div"), {
      classList: "basics__description",
      innerHTML: `
        <label class="basics__label">${Database.hero.basicInformation.beschreibung.name}:</label>
        <textarea class="basics__description-text" disabled>${Database.hero.basicInformation.beschreibung.value}</textarea>`,
    });
    this.section.contentContainer.appendChild(element);
    return element;
  }

  onTxtChange() {
    Database.hero.basicInformation.beschreibung.value = this.textArea.value;
    Database.saveHero();
  }

  onToggleEdit() {
    this.textArea.disabled = !this.textArea.disabled;
  }
}
