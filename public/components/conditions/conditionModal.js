import database from "../../data/database.js";
import Modal from "../../templates/modal.js";

export default class ConditionModal {
  constructor(id) {
    this.id = id;
    this.dbEntry = db.states[id];
    this.modal = this.initModal();
  }

  initModal() {
    this.modal = new Modal();
    this.modal.content.innerHTML = `<h2>${this.dbEntry.name} ${
      this.dbEntry.abbreviation ? `(${this.dbEntry.abbreviation})` : ""
    }</h2>`;
    this.addDescription();
  }

  addDescription() {
    let newElement = document.createElement("p");
    newElement.innerText = this.dbEntry.description;
    this.modal.content.appendChild(newElement);
  }
}
