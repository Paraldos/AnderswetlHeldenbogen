import database from "../../../data/database.js";
import ToolsItem from "./toolsItem.js";

export default class Tools {
  constructor(section) {
    this.section = section;
    this.editToggle = false;
    // init
    this.tools = this.createTools();
    this.headerBtn = this.tools.querySelector(".inventory__plus-btn");
    this.header = this.tools.querySelector(".inventory__header");
    this.labels = this.tools.querySelector(".inventory__labels");
    this.container = this.tools.querySelector(".inventory__container");
    this.headerBtn.addEventListener("click", () => this.onHeaderBtnclick());
    // events
    document.addEventListener("resetItems", () => this.resetItems());
    document.addEventListener("toggleEdit", () => this.update());
    this.resetItems();
  }

  createTools() {
    let element = document.createElement("div");
    element.className = "inventory__tools";
    element.innerHTML = `
        <div class="inventory__sub-header">
          <h3>Werkzeuge</h3>
          <button class="inventory__plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>
        </div>
        <ul class="inventory__labels">
          <li>Name</li>
          <li>Bonus</li>
          <li>Pool</li>
          <li>Beschreibung</li>
        </ul>
        <div class="inventory__container"></div>`;
    this.section.content.appendChild(element);
    return element;
  }

  // ================== events
  onHeaderBtnclick() {
    database.addTool();
  }

  resetItems() {
    this.container.innerHTML = "";
    this.update();
    if (!database.hero.items) return;
    database.hero.items.forEach(
      (item, index) => new ToolsItem(item, index, this.section, this.container)
    );
  }

  update() {
    const heroHasItems = database.hero.items && database.hero.items.length > 0;
    const editToggle = this.section.editToggle;
    this.tools.classList.toggle("disabled", !heroHasItems && !editToggle);
    this.headerBtn.classList.toggle("disabled", !editToggle);
    this.labels.classList.toggle("disabled", !heroHasItems);
  }
}
