import database from "../../data/database.js";
import Database from "../../data/database.js";
import Modal from "../modal/modal.js";

export default class EthnicityModal {
  constructor() {
    this.modal = new Modal();
    this.heroEthnicity = Database.hero.basicInformation.volk.value;
    this.dbEntry = Database.voelker[this.heroEthnicity];
    this.modal.content.innerHTML = "<h1>Wähle ein Volk</h1>";
    this.select = this.createSelect();
    this.description = this.createDescription();
    this.updateModalDescription();
  }

  createSelect() {
    let select = document.createElement("select");
    select.classList.add("modal__select");
    select.innerHTML = `
      <option value="">...</option>
      ${this.createSelectOptions()}`;
    select.addEventListener("change", (event) =>
      this.onSelect(event.target.value)
    );
    this.modal.content.appendChild(select);
    return select;
  }

  createSelectOptions() {
    let options = "";
    for (let key in Database.voelker) {
      let option = document.createElement("option");
      option.value = key;
      if (this.heroEthnicity === key) option.setAttribute("selected", true);
      option.innerText = Database.voelker[key].name;
      options += option.outerHTML;
    }
    return options;
  }

  onSelect(newEthnicity) {
    database.changeEthnicity(newEthnicity);
    this.updateModalDescription();
  }

  createDescription() {
    let description = document.createElement("p");
    description.classList.add("modal__description");
    this.modal.content.appendChild(description);
    return description;
  }

  updateModalDescription() {
    this.description.innerText = this.getDescritpion();
  }

  getEthnicity() {
    return Database.hero.basicInformation.volk.value;
  }

  getDescritpion() {
    return this.getEthnicity()
      ? Database.voelker[this.getEthnicity()].description
      : "";
  }
}
