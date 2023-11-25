import db from "../db/db.js";
import Modal from "../modal/modal.js";

export default class VolkElement {
  constructor(section) {
    this.section = section;
    this.dbEntry = db.grundlagen["volk"];
    this.element = this.createElement();
    this.btn = this.element.querySelector(".volk-element__btn");
    this.addBtnEvent();
  }

  createElement() {
    let element = document.createElement("div");
    element.classList.add("volk-element", "grundlagen__element");
    element.innerHTML = `
    <label>${this.dbEntry.name}:</label>
    <button class="volk-element__btn">${
      this.dbEntry.value ? this.dbEntry.value : "Wähle..."
    }</button>`;
    this.section.contentContainer.appendChild(element);
    return element;
  }

  updateBtnText() {
    this.btn.innerText = `${
      this.dbEntry.value ? db.voelker[this.dbEntry.value].name : "Wähle..."
    }`;
  }

  addBtnEvent() {
    this.btn.addEventListener("click", () => {
      let modal = new Modal();
      modal.content.innerHTML = `
      <h1>Wähle ein Volk</h1>
      <select class="volk-element__select">
        <option value="">Wähle...</option>
        ${this.createSelectOptions()}
      </select>
      <div class="volk-element__description"></div>
      `;
      this.updateModalDescription(modal);
      this.addSelectEvent(modal);
    });
  }

  updateModalDescription(modal) {
    let txt = this.dbEntry.value
      ? db.voelker[this.dbEntry.value].description
      : "";
    let description = modal.content.querySelector(".volk-element__description");
    description.innerText = txt;
  }

  addSelectEvent(modal) {
    let select = modal.content.querySelector(".volk-element__select");
    select.addEventListener("change", (e) => {
      let value = e.target.value;
      this.dbEntry.value = value;
      this.updateModalDescription(modal);
      this.updateBtnText();
    });
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

  toggleEditBtn(on) {
    this.btn.disabled = on;
  }
}
