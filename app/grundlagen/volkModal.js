import db from "../db/db.js";
import hero from "../hero/hero.js";
import Modal from "../modal/modal.js";

export default class VolkModal {
  constructor() {
    this.dbEntry = db.voelker[hero.grundlagen.volk];
    this.modal = this.addModal();
    this.updateModalDescription(this.modal);
    this.addSelectEvent(this.modal);
  }

  addModal() {
    let modal = new Modal();
    modal.content.innerHTML = `
        <h1>Wähle ein Volk</h1>
        <select class="modal__select">
          <option value="">...</option>
          ${this.createSelectOptions()}
        </select>
        <div class="modal__description"></div>`;
    return modal;
  }

  createSelectOptions() {
    let options = "";
    for (let key in db.voelker) {
      let option = document.createElement("option");
      option.value = key;
      if (hero.grundlagen.volk === key) option.setAttribute("selected", true);
      option.innerText = db.voelker[key].name;
      options += option.outerHTML;
    }
    return options;
  }

  updateModalDescription(modal) {
    let txt = hero.grundlagen.volk ? this.dbEntry.description : "";
    let description = modal.content.querySelector(".modal__description");
    description.innerText = txt;
  }

  addSelectEvent(modal) {
    let select = modal.content.querySelector(".modal__select");
    select.addEventListener("change", (event) => {
      hero.grundlagen.volk = event.target.value;
      this.dbEntry = db.voelker[hero.grundlagen.volk];
      hero.updateVolksTalente();
      hero.saveHero();
      this.updateModalDescription(modal);
      document.dispatchEvent(new Event("updateMainBtn"));
      document.dispatchEvent(new Event("resetTalents"));
    });
  }
}
