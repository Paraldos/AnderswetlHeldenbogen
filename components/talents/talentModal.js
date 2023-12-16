import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Modal from "../modal/modal.js";

export default class TalentModal {
  constructor(dbEntry, index = -1) {
    this.dbEntry = dbEntry;
    this.index = index;
    this.talent = hero.talents.value[index];
    this.modal = new Modal();
    this.modal.content.innerHTML = `<h2>${this.dbEntry.name}</h2>`;
    if (this.dbEntry.name == "Veranlagung" && this.index != -1) {
      this.seletor = this.initSelector();
      this.seletor.addEventListener("change", (e) => this.onSelectorChange(e));
    }
    if (this.index != -1) {
      this.addCommentLabel();
      this.addComment();
    }
    this.addTalentDescription();
  }

  initSelector() {
    const newSelector = Object.assign(document.createElement("select"), {
      innerHTML: `<option value="">...</option>`,
    });
    this.addSelectorOptions(newSelector);
    this.modal.content.appendChild(newSelector);
    return newSelector;
  }

  addSelectorOptions(newSelect) {
    for (let attribut of hero.veranlagungsController.getVeranlagungLimits()) {
      newSelect.appendChild(
        Object.assign(document.createElement("option"), {
          value: attribut,
          innerText: db.attributs[attribut].name,
          selected: this.talent.selected == attribut ? true : false,
        })
      );
    }
  }

  onSelectorChange(event) {
    hero.veranlagungsController.setVeranlagung(event.target.value);
    hero.saveHero();
    document.dispatchEvent(new Event("resetAttributs"));
    document.dispatchEvent(new Event("resetTalents"));
  }

  // comment
  addCommentLabel() {
    this.modal.content.appendChild(
      Object.assign(document.createElement("label"), { innerHTML: "Anmerkung" })
    );
  }

  addComment() {
    let comment = document.createElement("textarea");
    comment.classList.add("modal__textfield");
    comment.innerText = hero.talents.value[this.index].comment;
    this.modal.content.appendChild(comment);

    comment.addEventListener("input", (event) => {
      hero.talents.value[this.index].comment = comment.value;
      hero.saveHero();
      document.dispatchEvent(new Event("resetTalents"));
    });
  }

  addTalentDescription() {
    let newElement = document.createElement("p");
    newElement.innerText = this.dbEntry.description;
    this.modal.content.appendChild(newElement);
  }
}
