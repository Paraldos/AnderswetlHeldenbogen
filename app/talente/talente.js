import Modal from "../modal/modal.js";
import Section from "../section/section.js";
import db from "../db/db.js";
import Talent from "./talent.js";
import TalenteTypeContainer from "./TalenteTypeContainer.js";

export default class Talente {
  constructor() {
    this.section = new Section("Talente", true);
    this.container = document.querySelector(".talente__content");
    this.typeContainer = [
      new TalenteTypeContainer("Allgemein", this.container),
      new TalenteTypeContainer("Kampf", this.container),
      new TalenteTypeContainer("Manöver", this.container),
      new TalenteTypeContainer("Übernatürlich", this.container),
      new TalenteTypeContainer("Zauber", this.container),
    ];
    this.talente = this.fillTalenteArray();
    this.addEditBtnListener();
    this.addPlusBtnListener();
    this.addResetListener();
    this.updateContainerVisbility();
  }

  updateContainerVisbility() {
    this.typeContainer.forEach((el) => el.updateVisbility());
  }

  fillTalenteArray() {
    let arr = [];
    this.talente = db.heroTalente.forEach((el, index) => {
      arr.push(
        new Talent(el.key, index, this.section.editBtn.classList.contains("on"))
      );
    });
    return arr;
  }

  addResetListener() {
    document.addEventListener("resetTalents", () => {
      this.typeContainer.forEach((el) => el.resetContainer());
      this.talente = this.fillTalenteArray();
      this.updateContainerVisbility();
      this.updateSectionHeader();
    });
  }

  addPlusBtnListener() {
    this.section.plusBtn.addEventListener("click", () => new TalenteModal());
  }

  addEditBtnListener() {
    this.section.editBtn.addEventListener("click", () => {
      const btnIsOn = this.section.toggleEditBtn();
      this.updateSectionHeader();
      this.talente.forEach((el) => el.toggleEditBtn(btnIsOn));
    });
  }

  updateSectionHeader() {
    if (this.section.editBtn.classList.contains("on")) {
      this.section.updateHeader(`Talente (${this.getTalentSum()})`);
    } else {
      this.section.updateHeader("Talente");
    }
  }

  getTalentSum() {
    return db.heroTalente.length;
  }
}

class TalenteModal {
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
    this.addTalente();
  }

  addModal() {
    let modal = new Modal();
    modal.content.innerHTML = `<h2>Talente</h2>`;
    return modal;
  }

  addTalente() {
    for (let key in db.talente) {
      let container = this.modalContentn.querySelector(
        `.talente__${db.talente[key].type}`
      );
      let newElement = document.createElement("div");
      newElement.innerHTML = `
      <button>${db.talente[key].name}</button>
      `;
      container.appendChild(newElement);
    }
  }
}
