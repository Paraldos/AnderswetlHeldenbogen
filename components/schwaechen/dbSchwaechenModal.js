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
    this.addResetListener();
  }

  resetModalContent() {
    this.modalContent.innerHTML = `<h2>Schwächen</h2>`;
    this.schwaechen = this.fillSchwaechenArray();
  }

  fillSchwaechenArray() {
    let arr = [];
    for (let id in db.schwaechen) {
      let heroHasSchwaeche = hero.schwaechen.find((el) => el.id === id);
      if (heroHasSchwaeche) continue;

      let schwaeche = new DbSchwaeche(id, this.modalContent);
      arr.push(schwaeche);
    }
    return arr;
  }

  addResetListener() {
    document.addEventListener("resetSchwaechen", () => {
      this.resetModalContent();
    });
  }
}
