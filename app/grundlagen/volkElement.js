import db from "../db/db.js";
import hero from "../hero/hero.js";
import Modal from "../modal/modal.js";

export default class VolkElement {
  constructor(section) {
    this.section = section;
    this.dbEntry = db.grundlagen.volk;
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".volk-element__main-btn");
    this.updateMainBtn();
    this.addEventListeners();
  }

  createElement() {
    let element = document.createElement("div");
    element.classList.add("volk-element", "grundlagen__element");
    element.innerHTML = `
      <label>${this.dbEntry.name}:</label>
      <button class="volk-element__main-btn" disabled>???</button>`;
    this.section.contentContainer.appendChild(element);
    return element;
  }

  addEventListeners() {
    this.mainBtn.addEventListener(
      "click",
      () => new VolkModal(this.dbEntry, hero.grundlagen.volk)
    );
    document.addEventListener("updateMainBtn", () => this.updateMainBtn());
  }

  updateMainBtn() {
    this.mainBtn.innerText = hero.grundlagen.volk
      ? db.voelker[hero.grundlagen.volk].name
      : "...";
  }

  toggleEditBtn(on) {
    this.mainBtn.disabled = !on;
  }
}

class VolkModal {
  constructor(dbEntry) {
    this.dbEntry = dbEntry;
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
    let txt = hero.grundlagen.volk
      ? db.voelker[hero.grundlagen.volk].description
      : "";
    let description = modal.content.querySelector(".modal__description");
    description.innerText = txt;
  }

  addSelectEvent(modal) {
    let select = modal.content.querySelector(".modal__select");
    select.addEventListener("change", (e) => {
      let value = e.target.value;
      hero.grundlagen.volk = value;
      this.updateModalDescription(modal);
      document.dispatchEvent(new Event("updateMainBtn"));
    });
  }
}
