import Modal from "../../templates/modal.js";

export default class AttributModal {
  constructor(dbEntry) {
    this.modal = new Modal();
    this.modal.content.innerHTML = `
        <h2>${dbEntry.name}</h2>
        <p>${dbEntry.description}</p>`;
  }
}
