import hero from "../hero/hero.js";
import db from "../db/db.js";
import talentController from "../hero/talentController.js";
import veranlagungController from "../hero/veranlagungController.js";
import Modal from "../modal/modal.js";

export default class HeroTalentModal {
  constructor(dbEntry, index) {
    this.dbEntry = dbEntry;
    this.index = index;
    this.modal;
    this.addModal();
  }

  addModal() {
    this.modal = new Modal();
    this.modal.content.innerHTML = `<h2>${this.dbEntry.name}</h2>`;
    if (this.dbEntry.name == "Veranlagung") this.addSelector();
    this.addCommentLabel();
    this.addComment();
    this.addTalentDescription();
  }

  addSelector() {
    let newSelect = document.createElement("select");
    newSelect.innerHTML = `<option value="">...</option>`;
    this.modal.content.appendChild(newSelect);
    this.addSelectorOptions(newSelect);
    this.addSelectorListener(newSelect);
  }

  addSelectorOptions(newSelect) {
    let talent = talentController.findTalent("veranlagung");
    for (let attribut of veranlagungController.getVeranlagungLimits()) {
      let newOption = document.createElement("option");
      newOption.value = attribut;
      if (talent.selected == attribut) newOption.setAttribute("selected", true);
      newOption.innerText = db.attribute[attribut].name;
      newSelect.appendChild(newOption);
    }
  }

  addSelectorListener(newSelect) {
    newSelect.addEventListener("change", (event) => {
      veranlagungController.setVeranlagung(event.target.value);
      document.dispatchEvent(new Event("resetTalents"));
      document.dispatchEvent(new Event("resetAttribute"));
    });
  }

  addCommentLabel() {
    let label = document.createElement("label");
    label.innerHTML = "Anmerkung";
    this.modal.content.appendChild(label);
  }

  addComment() {
    let comment = document.createElement("textarea");
    comment.classList.add("modal__textfield");
    comment.innerText = hero.talente[this.index].comment;
    this.modal.content.appendChild(comment);

    comment.addEventListener("input", (event) => {
      hero.talente[this.index].comment = comment.value;
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
