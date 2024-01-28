import Modal from "../../templates/modal/modal.js";

export default class SkillModal {
  constructor(dbEntry) {
    this.modal = new Modal();
    this.modal.content.innerHTML = `
      <h2>${dbEntry.name}</h2>
      <p>${dbEntry.description}</p>`;
  }
}