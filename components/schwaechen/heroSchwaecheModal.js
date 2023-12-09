import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Modal from "../modal/modal.js";

export default class HeroSchwaechenModal {
  constructor(dbEntry, index) {
    this.dbEntry = dbEntry;
    this.index = index;
    this.addModal();
  }

  addModal() {
    this.modal = new Modal();
    this.modal.content.innerHTML = `<h2>${this.dbEntry.name}</h2>`;
    this.addComment();
    this.addDescription();
  }

  addComment() {
    let comment = document.createElement("textarea");
    comment.classList.add("modal__textfield");
    comment.innerText = hero.schwaechen[this.index].comment;
    this.modal.content.appendChild(comment);

    comment.addEventListener("input", () => {
      hero.schwaechen[this.index].comment = comment.value;
      hero.saveHero();
      document.dispatchEvent(new Event("resetTalents"));
    });
  }

  addDescription() {
    let newElement = document.createElement("p");
    newElement.innerText = this.dbEntry.description;
    this.modal.content.appendChild(newElement);
  }
}
