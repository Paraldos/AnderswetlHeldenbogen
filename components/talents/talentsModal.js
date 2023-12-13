import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Modal from "../modal/modal.js";
import TalentModal from "./talentModal.js";

export default class TalentsModal {
  constructor() {
    this.modal = this.initModal();
    this.modalContentn = this.modal.content;
    this.resetModal();
    document.addEventListener("resetTalents", () => this.resetModal());
  }

  initModal() {
    let modal = new Modal();
    modal.content.innerHTML = `<h2>Talente</h2>`;
    return modal;
  }

  resetModal() {
    this.types = [
      ["Allgemein", "allgemein"],
      ["Kampf", "kampf"],
      ["Manöver", "manoever"],
      ["Übernatürlich", "uebernatuerlich"],
      ["Zauber", "zauber"],
    ];
    this.typeContainers = this.initTypeContainers();
    this.talents = this.initTalents();
    this.updateContainerVisbility();
  }

  initTypeContainers() {
    this.modalContentn.innerHTML = `<h2>Talente</h2>`;
    return this.types.map(([name, id]) => {
      let newElement = Object.assign(document.createElement("div"), {
        className: `talents-modal__container talents-modal__${id}`,
        innerHTML: `<h3>${name}</h3>`,
      });
      this.modalContentn.appendChild(newElement);
      return newElement;
    });
  }

  initTalents() {
    return Object.keys(db.talents)
      .filter((key) => !hero.talents.value.some((el) => el.id === key))
      .map((key) => new SingleTalent(key, this.modal));
  }

  updateContainerVisbility() {
    this.typeContainers.forEach((el) => {
      el.childElementCount <= 1
        ? el.classList.add("invisible")
        : el.classList.remove("invisible");
    });
  }
}

class SingleTalent {
  constructor(id, modal) {
    this.id = id;
    this.modal = modal;
    this.dbEntry = db.talents[id];
    this.container = this.modal.content.querySelector(
      `.talents-modal__${this.dbEntry.type}`
    );
    this.talent = this.initTalent();
    this.mainBtn = this.talent.querySelector(".talent__main-btn");
    this.plusBtn = this.talent.querySelector(".talent__plus-btn");
    this.mainBtn.addEventListener("click", () => new TalentModal(this.dbEntry));
    this.plusBtn.addEventListener("click", () =>
      hero.talents.addTalent(this.id)
    );
  }

  initTalent() {
    let txt = `${this.dbEntry.name}`;
    if (this.dbEntry.max_level > 1) {
      txt += ` (1 bis ${this.dbEntry.max_level})`;
    }
    let newElement = Object.assign(document.createElement("div"), {
      className: "talent",
      innerHTML: `
        <button class="talent__main-btn">
          ${txt}
        </button>
        <button class="talent__plus-btn symbol-btn">
          <i class="fa-solid fa-plus"></i>
        </button>`,
    });
    this.container.appendChild(newElement);
    return newElement;
  }
}
