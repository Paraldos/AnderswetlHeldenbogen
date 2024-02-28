import database from "../../data/database.js";
import veranlagungsController from "../../javascript/veranlagungsController.js";
import Modal from "../modal/modal.js";

export default class HeroTalent {
  constructor(dbEntry, index) {
    this.dbEntry = dbEntry;
    this.index = index;
    this.heroEntry = database.hero.talents[index];
    this.modal = new Modal();
    this.createHeader();
    if (this.dbEntry.name == "Veranlagung") this.createSelect();
    this.createComment();
    this.createDescription();
  }

  createHeader() {
    this.modal.content.innerHTML = `<h2>${this.dbEntry.name}</h2>`;
  }

  createSelect() {
    let newSelect = document.createElement("select");
    newSelect.innerHTML = `<option value="">...</option>`;
    this.createSelectItems(newSelect);
    newSelect.addEventListener("change", (event) => this.onChangeSelect(event));
    this.modal.content.appendChild(newSelect);
  }

  createSelectItems(select) {
    for (const attKey in database.attributs) {
      let newSelectItem = document.createElement("option");
      newSelectItem.value = attKey;
      newSelectItem.innerText = database.attributs[attKey].name;
      newSelectItem.selected = this.heroEntry.selected == attKey ? true : false;
      select.appendChild(newSelectItem);
    }
  }

  onChangeSelect(event) {
    veranlagungsController.setVeranlagung(event.target.value);
    database.saveHero();
    document.dispatchEvent(new Event("resetAttributs"));
    document.dispatchEvent(new Event("resetTalents"));
  }

  createComment() {
    let comment = document.createElement("textarea");
    comment.classList.add("modal__textfield");
    comment.innerText = this.heroEntry.comment;
    comment.addEventListener("input", () => this.onInputComment(event));
    this.modal.content.appendChild(comment);
  }

  onInputComment(event) {
    this.heroEntry.comment = event.target.value;
    database.saveHero();
    document.dispatchEvent(new Event("resetTalents"));
  }

  createDescription() {
    let element = document.createElement("p");
    element.innerText = this.dbEntry.description;
    this.modal.content.appendChild(element);
  }
}
