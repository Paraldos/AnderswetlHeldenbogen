import database from "../../data/database.js";
import Modal from "../../templates/modal.js";

export default class HeroFlaw {
  constructor(dbEntry, index = -1) {
    this.dbEntry = dbEntry;
    this.index = index;
    this.initModal();
  }

  initModal() {
    this.modal = new Modal();
    this.modal.content.innerHTML = `<h2>${this.dbEntry.name}</h2>`;
    this.addComment();
    this.addDescription();
  }

  addComment() {
    if (this.index === -1) return;
    let comment = document.createElement("textarea");
    comment.classList.add("modal__textfield");
    comment.value = database.hero.flaws[this.index].comment;
    this.modal.content.appendChild(comment);
    comment.addEventListener("input", () => this.handleInput(comment));
  }

  addDescription() {
    let newElement = document.createElement("p");
    newElement.innerText = this.dbEntry.description;
    this.modal.content.appendChild(newElement);
  }

  handleInput(comment) {
    database.hero.flaws[this.index].comment = comment.value;
    database.saveHero();
    document.dispatchEvent(new Event("resetFlaws"));
  }
}
