import database from "../../data/database.js";
import Modal from "../modal/modal.js";
import flawsController from "../../javascript/flawsController.js";
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
      if (flawsController.findFlaw(id)) continue;
      else new ListOfFlawsItem(id, this.modal);
    }
  }

  addResetListener() {
    document.addEventListener("resetFlaws", () => {
      this.initModalContent();
    });
  }
}
