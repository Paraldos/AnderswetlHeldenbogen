import Database from "../../data/database.js";
import Modal from "../modal/modal.js";

export default class EthnicityModal {
  constructor() {
    this.modal = new Modal();
    this.heroEthnicity = Database.hero.basicInformation.volk.value;
    this.dbEntry = Database.voelker[this.heroEthnicity];
    this.initModal();
  }

  initModal() {
    this.modal.content.innerHTML = "<h1>Wähle ein Volk</h1>";
    this.modal.content.appendChild(this.createSelect());
    this.modal.content.appendChild(this.createDescription());
  }

  createSelect() {
    let select = document.createElement("select");
    select.classList.add("modal__select");
    select.innerHTML = `
      <option value="">...</option>
      ${this.createSelectOptions()}`;
    select.addEventListener("change", (event) => {
      this.onSelect(event.target.value);
    });
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

  onSelect() {
    console.log("ToDo: onSelect EthnicityModal");
    // hero.changeEthnicity(event.target.value);
    // this.heroEthnicity = Database.voelker[Database.hero.basicInformation.volk];
    // this.updateModalDescription(modal);
  }

  createDescription() {
    let description = document.createElement("p");
    description.classList.add("modal__description");
    description.innerText = this.heroEthnicity ? this.dbEntry.description : "";
    return description;
  }
}
