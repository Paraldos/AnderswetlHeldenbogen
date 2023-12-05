import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Modal from "../modal/modal.js";
import TalenteTypeContainer from "./TalenteTypeContainer.js";
import DBTalent from "./dbTalent.js";

export default class DbTalenteModal {
  constructor() {
    this.modal = this.createModal();
    this.modalContentn = this.modal.content;

    this.resetModal();
    this.addResetListener();
  }

  addResetListener() {
    document.addEventListener("resetTalents", () => this.resetModal());
  }

  createModal() {
    let modal = new Modal();
    modal.content.innerHTML = `<h2>Talente</h2>`;
    return modal;
  }

  resetModal() {
    this.modalContentn.innerHTML = `<h2>Talente</h2>`;
    this.typeContainer = [
      new TalenteTypeContainer("Allgemein", this.modalContentn),
      new TalenteTypeContainer("Kampf", this.modalContentn),
      new TalenteTypeContainer("Manöver", this.modalContentn),
      new TalenteTypeContainer("Übernatürlich", this.modalContentn),
      new TalenteTypeContainer("Zauber", this.modalContentn),
    ];
    this.talente = this.fillTalenteArray();
    this.typeContainer.forEach((el) => el.updateVisbility());
  }

  fillTalenteArray() {
    let arr = [];
    for (let key in db.talente) {
      let heroHasTalent = hero.talente.find((el) => el.id === key);

      if (heroHasTalent) continue;
      let talent = new DBTalent(key, this.modal);
      arr.push(talent);
    }
    return arr;
  }
}