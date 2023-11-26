import Modal from "../modal/modal.js";
import db from "../db/db.js";

export default class Talent {
  constructor(key, index) {
    this.heroEntry = db.heroTalente[index];
    this.dbEntry = db.talente[key];
    this.container = document.querySelector(".talente__content");
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".talent__main-btn");
    this.addMainBtnListener();
  }

  createElement() {
    let newElement = document.createElement("div");
    newElement.classList.add("talent");
    newElement.innerHTML = `
    <button class="talent__main-btn">
      ${this.dbEntry.name}
    </button>
    <button class="talent__minus-btn">
      <i class="fa-solid fa-minus"></i>
    </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  addMainBtnListener() {
    this.mainBtn.addEventListener("click", () => new TalentModal(this.dbEntry));
  }
}

class TalentModal {
  constructor(dbEntry) {
    this.dbEntry = dbEntry;
    this.addModal();
  }

  addModal() {
    let modal = new Modal();
    modal.content.innerHTML = `
    <h2>${this.dbEntry.name}</h2>`;
    this.addComment(modal);
    this.addTalentDescription(modal);
  }

  addTalentDescription(modal) {
    let newElement = document.createElement("p");
    newElement.innerText = this.dbEntry.description;
    modal.content.appendChild(newElement);
  }

  addComment(modal) {
    console.log();
  }
}
