import db from "../db/db.js";
import Modal from "../modal/modal.js";

export default class VolkElement {
  constructor(section) {
    this.section = section;
    this.dbEntry = db.grundlagen["volk"];
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".volk-element__main-btn");
    this.addBtnEvent();
    this.addUpdateMainBtn();
  }

  createElement() {
    let element = document.createElement("div");
    element.classList.add("volk-element", "grundlagen__element");
    element.innerHTML = `
    <label>${this.dbEntry.name}:</label>
    <button class="volk-element__main-btn" disabled>${
      this.dbEntry.value ? this.dbEntry.value : "..."
    }</button>`;
    this.section.contentContainer.appendChild(element);
    return element;
  }

  addBtnEvent() {
    this.mainBtn.addEventListener(
      "click",
      () => new VolkElementModal(this.dbEntry)
    );
  }

  addUpdateMainBtn() {
    document.addEventListener("updateMainBtn", () => {
      this.mainBtn.innerText = `${
        this.dbEntry.value ? db.voelker[this.dbEntry.value].name : "..."
      }`;
    });
  }

  toggleEditBtn(on) {
    this.mainBtn.disabled = !on;
  }
}

class VolkElementModal {
  constructor(dbEntry) {
    this.dbEntry = dbEntry;
    this.addModal();
  }

  addModal() {
    let modal = new Modal();
    modal.content.innerHTML = `
    <h1>Wähle ein Volk</h1>
    <select class="modal__select">
      <option value="">...</option>
      ${this.createSelectOptions()}
    </select>
    <div class="modal__description"></div>
    `;
    this.updateModalDescription(modal);
    this.addSelectEvent(modal);
  }

  createSelectOptions() {
    let options = "";
    for (let key in db.voelker) {
      options += `
      <option 
        value="${key}"
        ${this.dbEntry.value === key ? "selected" : ""}>
        ${db.voelker[key].name}
      </option>`;
    }
    return options;
  }

  updateModalDescription(modal) {
    let txt = this.dbEntry.value
      ? db.voelker[this.dbEntry.value].description
      : "";
    let description = modal.content.querySelector(".modal__description");
    description.innerText = txt;
  }

  addSelectEvent(modal) {
    let select = modal.content.querySelector(".modal__select");
    select.addEventListener("change", (e) => {
      let value = e.target.value;
      this.dbEntry.value = value;
      this.updateModalDescription(modal);
      document.dispatchEvent(new Event("updateMainBtn"));
    });
  }
}
