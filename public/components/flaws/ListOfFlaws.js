import database from "../../data/database.js";
import Modal from "../../templates/modal.js";
import flaws from "../../data/flaws.js";
import ListOfFlawsItem from "./ListOfFlawsItem.js";

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
      else new ListOfFlawsItem(id, this.modal);
    }
  }

  addResetListener() {
    document.addEventListener("resetFlaws", () => {
      this.initModalContent();
    });
  }
}
