import Modal from "./modal.js";

export default class DescriptionModal {
  constructor(dbEntry) {
    this.dbEntry = dbEntry;
    this.modal = new Modal();
    this.createHeader();
    this.createDescription();
  }

  createHeader() {
    this.modal.content.innerHTML = `<h2>${this.dbEntry.name} ${
      this.dbEntry.abbreviation ? `(${this.dbEntry.abbreviation})` : ""
    }</h2>`;
  }

  createDescription() {
    let newElement = document.createElement("p");
    newElement.innerText = this.dbEntry.description;
    this.modal.content.appendChild(newElement);
  }
}
