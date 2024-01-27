import database from "../../data/database.js";

export default class SimpleElement {
  constructor(container, key) {
    this.container = container;
    this.key = key;
    this.dbEntry = database.hero.basicInformation[key];
    this.createElement();
  }

  createElement() {
    const div = document.createElement("div");
    div.classList.add("basics__simple-element");
    div.appendChild(this.createLabel());
    div.appendChild(this.createInput());
    this.container.appendChild(div);
  }

  createLabel() {
    const label = document.createElement("label");
    label.classList.add("basics__label");
    label.innerText = this.dbEntry.name;
    return label;
  }

  createInput() {
    const input = document.createElement("input");
    input.value = this.dbEntry.value;
    input.disabled = true;
    document.addEventListener("toggleEdit", () => this.onToggleEdit(input));
    input.addEventListener("input", () => this.onInputEvent(input));
    return input;
  }

  onToggleEdit(input) {
    input.disabled = !input.disabled;
  }

  onInputEvent(input) {
    database.hero.basicInformation[this.key].value = input.value;
    database.saveHero();
  }
}
