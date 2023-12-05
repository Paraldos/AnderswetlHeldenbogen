import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Modal from "../modal/modal.js";
import DbSchwaeche from "./dbSchwaeche.js";

export default class DbSchwaechenModal {
  constructor() {
    this.modal = new Modal();
    this.modalContent = this.modal.content;
    this.modalContent.classList.add("schwaechen-modal");
    this.resetModalContent();
  }

  addResetListener() {
    document.addEventListener("resetSchwaechen", () => this.resetModal());
  }

  resetModalContent() {
    this.modalContent.innerHTML = `<h2>Schwächen</h2>`;
    this.talente = this.fillTalenteArray();
  }

  fillTalenteArray() {
    for (let id in db.schwaechen) {
      let schwaeche = new DbSchwaeche(id, this.modalContent);
    }
  }
}
