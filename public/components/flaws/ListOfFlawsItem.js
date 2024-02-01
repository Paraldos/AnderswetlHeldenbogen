import database from "../../data/database.js";
import FlawModal from "./heroFlawDescription.js";

export default class ListItem {
  constructor(id, modal) {
    this.id = id;
    this.modal = modal;
    this.dbEntry = database.flaws[id];
    this.itemContainer = this.createItemContainer();
    this.createMainBtn();
    this.createPlusBtn();
  }

  createItemContainer() {
    let el = document.createElement("div");
    el.classList.add("flaws-modal__schwaeche");
    this.modal.content.appendChild(el);
    return el;
  }

  createMainBtn() {
    let el = document.createElement("button");
    el.classList.add("flaws-modal__main-btn");
    el.innerHTML = this.dbEntry.name;
    el.addEventListener("click", () => this.onMainBtnClick());
    this.itemContainer.appendChild(el);
    return el;
  }

  onMainBtnClick() {
    new FlawModal(this.dbEntry);
  }

  createPlusBtn() {
    let el = document.createElement("button");
    el.classList.add("flaws-modal__plus-btn", "symbol-btn");
    el.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    el.addEventListener("click", () => this.onPlusBtnClick());
    this.itemContainer.appendChild(el);
    return el;
  }

  onPlusBtnClick() {
    flaws.addFlaw(this.id);
  }
}
