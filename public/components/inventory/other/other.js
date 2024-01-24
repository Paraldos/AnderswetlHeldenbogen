import hero from "../../../data/hero.js";

export default class Other {
  constructor(container) {
    this.container = container;
    this.editToggle = false;
    // init
    this.header = this.initHeader();
    this.body = this.initBody();
    this.updateVisibility();
    // events
    this.body.addEventListener("input", () => this.onBodyInput());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  // ============================ events
  onBodyInput() {
    hero.otherInventory = this.body.value;
    hero.saveHero();
  }

  onToggleEdit() {
    this.editToggle = !this.editToggle;
    this.body.disabled = !this.editToggle;
    this.updateVisibility();
  }

  // ============================ init
  initHeader() {
    let element = document.createElement("div");
    element.className = "inventory__header";
    element.innerHTML = `<h3>Sonstiges</h3>`;
    this.container.appendChild(element);
    return element;
  }

  initBody() {
    let element = document.createElement("textarea");
    element.className = "other__body";
    element.disabled = !this.editToggle;
    element.value = hero.otherInventory;
    this.container.appendChild(element);
    return element;
  }

  updateVisibility() {
    const isInvisible = hero.otherInventory === "" && !this.editToggle;
    this.body.classList.toggle("invisible", isInvisible);
    this.header.classList.toggle("invisible", isInvisible);
  }
}
