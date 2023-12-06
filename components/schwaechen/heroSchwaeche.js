import db from "../../data/db.js";
import hero from "../../data/hero.js";

export default class HeroSchwaeche {
  constructor(id, index, btnVisiblity, container) {
    this.id = id;
    this.index = index;
    this.btnVisiblity = btnVisiblity;
    this.dbEntry = db.schwaechen[id];
    this.container = container;
    this.element = this.createElement();
  }

  createElement() {
    let txt = this.dbEntry.name;
    let newElement = document.createElement("div");
    newElement.classList.add("schwaeche");
    newElement.innerHTML = `
      <button class="talent__main-btn">${txt}</button>
      <button class="
        talent__minus-btn 
        ${this.btnVisiblity ? "" : "invisible"}
        symbol-btn">
          <i class="fa-solid fa-minus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }
}
