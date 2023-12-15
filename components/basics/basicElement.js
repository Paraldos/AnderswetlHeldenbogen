import db from "../../data/db.js";
import hero from "../../data/hero.js";

// TEst
export default class BasicElement {
  constructor(section, key) {
    this.section = section;
    this.key = key;
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
      <input type="text" class="basic-element__input" value="${
        hero.grundlagen[this.key]
      }" disabled>`;
    this.section.contentContainer.appendChild(element);
    return element;
  }

  addInputEvent() {
    this.nameInput.addEventListener("input", () => {
      hero.grundlagen[this.key] = this.nameInput.value;
      hero.saveHero();
    });
  }

  toggleEditBtn(on) {
    this.nameInput.disabled = !on;
  }
}
