import db from "../db/db.js";

export default class Beschreibungelement {
  constructor(section) {
    this.section = section;
    this.dbEntry = db.grundlagen.beschreibung;
    this.element = this.createElement();
    this.txt = this.element.querySelector(".beschreibung-element__text");
    this.addTextEvent();
  }

  createElement() {
    let element = document.createElement("div");
    element.classList.add("beschreibung-element", "grundlagen__element");
    element.innerHTML = `
    <label>${this.dbEntry.name}:</label>
    <textarea class="beschreibung-element__text">${this.dbEntry.value}</textarea>`;
    this.section.contentContainer.appendChild(element);
    return element;
  }

  addTextEvent() {
    this.txt.addEventListener("input", () => {
      this.dbEntry.value = this.txt.value;
    });
  }
}
