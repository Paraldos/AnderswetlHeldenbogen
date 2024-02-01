import database from "../../data/database.js";
import Modal from "../../templates/modal.js";
import FlawModal from "./flawModal.js";
import flaws from "../../data/flaws.js";

export default class ListOfFlaws {
  constructor() {
    this.modal = new Modal();
    this.modal.content.classList.add("flaws-modal");
    this.initModalContent();
    this.addResetListener();
  }

  initModalContent() {
    this.modal.content.innerHTML = `<h2>Schwächen</h2>`;
    this.addFlaws();
  }

  addFlaws() {
    for (let id in database.flaws) {
      if (flaws.findFlaw(id)) continue;
      else new ListItem(id, this.modal);
    }
  }

  addResetListener() {
    document.addEventListener("resetFlaws", () => {
      this.initModalContent();
    });
  }
}

class ListItem {
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
