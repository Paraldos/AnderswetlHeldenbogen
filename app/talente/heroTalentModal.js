import hero from "../hero/hero.js";
import Modal from "../modal/modal.js";

export default class HeroTalentModal {
  constructor(dbEntry, index) {
    this.dbEntry = dbEntry;
    this.index = index;
    this.addModal();
  }

  addModal() {
    let modal = new Modal();
    modal.content.innerHTML = `
      <h2>${this.dbEntry.name}</h2>`;
    this.addComment(modal);
    this.addTalentDescription(modal);
  }

  addComment(modal) {
    let label = document.createElement("label");
    label.innerHTML = "Anmerkung";
    modal.content.appendChild(label);

    let comment = document.createElement("textarea");
    comment.classList.add("modal__textfield");
    comment.innerText = hero.talente[this.index].comment;
    modal.content.appendChild(comment);

    comment.addEventListener("input", (event) => {
      hero.talente[this.index].comment = comment.value;
      document.dispatchEvent(new Event("resetTalents"));
      hero.saveHero();
    });
  }

  addTalentDescription(modal) {
    let newElement = document.createElement("p");
    newElement.innerText = this.dbEntry.description;
    modal.content.appendChild(newElement);
  }
}
