import Modal from "../modal/modal.js";
import db from "../db/db.js";
import TalenteTypeContainer from "./TalenteTypeContainer.js";
import DBTalent from "./dbTalent.js";

export default class AddTalenteModal {
  constructor() {
    this.modal = this.addModal();
    this.modalContentn = this.modal.content;
    this.typeContainer = [
      new TalenteTypeContainer("Allgemein", this.modalContentn),
      new TalenteTypeContainer("Kampf", this.modalContentn),
      new TalenteTypeContainer("Manöver", this.modalContentn),
      new TalenteTypeContainer("Übernatürlich", this.modalContentn),
      new TalenteTypeContainer("Zauber", this.modalContentn),
    ];
    this.talente = [];
    this.addTalente();
    this.addMainBtnEvent();
    this.addPlusBtnEvent();
  }

  addModal() {
    let modal = new Modal();
    modal.content.innerHTML = `<h2>Talente</h2>`;
    return modal;
  }

  addTalente() {
    let arr = [];
    for (let key in db.talente) {
      new DBTalent(key, this.modal);
      /*
      let container = this.modalContentn.querySelector(
        `.talente__${db.talente[key].type}`
      );
      let newElement = document.createElement("div");
      newElement.classList.add("talent");
      newElement.innerHTML = `
          <button>${db.talente[key].name}</button>
          <button class="attribut__plus-btn symbol-btn">
            <i class="fa-solid fa-plus"></i>
          </button>`;
      container.appendChild(newElement);
      arr.push(newElement);
      */
    }
    return arr;
  }

  addMainBtnEvent() {}

  addPlusBtnEvent() {}
}
