import database from "../../data/database.js";
import Modal from "../../templates/modal.js";

export default class HeroTalent {
  constructor(dbEntry, index) {
    this.dbEntry = dbEntry;
    this.index = index;
    this.heroEntry = database.hero.talents[index];
    this.modal = new Modal();
    this.createHeader();
    // if (this.dbEntry.name == "Veranlagung" && this.index != -1) {
    //   this.createSelect();
    // }
    this.createComment();
    this.addTalentDescription();
  }

  createHeader() {
    this.modal.content.innerHTML = `<h2>${this.dbEntry.name}</h2>`;
  }

  // createSelect() {
  //   let newSelect = document.createElement("select");
  //   newSelect.innerHTML = `<option value="">...</option>`;
  //   this.createSelectItems(newSelect);
  //   newSelect.addEventListener("change", (event) => onChangeSelect(event));
  //   this.modal.content.appendChild(newSelect);
  // }

  // createSelectItems(select) {
  //   for (const attKey in database.attributs) {
  //     let newSelectItem = document.createElement("option");
  //     newSelectItem.value = attKey;
  //     newSelectItem.innerText = database.attributs[attKey].name;
  //     // newSelectItem.selected = this.talent.selected == attKey ? true : false;
  //     select.appendChild(newSelectItem);
  //   }
  // }

  // onChangeSelect(event) {
  //   hero.veranlagung.setVeranlagung(event.target.value);
  //   hero.saveHero();
  //   document.dispatchEvent(new Event("resetAttributs"));
  //   document.dispatchEvent(new Event("resetTalents"));
  // }

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

  addTalentDescription() {
    let element = document.createElement("p");
    element.innerText = this.dbEntry.description;
    this.modal.content.appendChild(element);
  }
}
