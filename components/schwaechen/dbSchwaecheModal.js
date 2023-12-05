import Modal from "../modal/modal.js";

export default class DbSchwaecheModal {
  constructor(dbEntry) {
    this.dbEntry = dbEntry;
    this.addModal();
  }

  addModal() {
    let modal = new Modal();
    modal.content.innerHTML = `
      <h2>${this.dbEntry.name}</h2>`;
    this.addDescription(modal);
  }

  addDescription(modal) {
    let newElement = document.createElement("p");
    newElement.innerText = this.dbEntry.description;
    modal.content.appendChild(newElement);
  }
}
