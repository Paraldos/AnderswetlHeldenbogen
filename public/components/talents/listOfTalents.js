import talents from "../../data/talents.js";
import Modal from "../modal/modal.js";
import ListOfTalentsItem from "./listOfTalentsItem.js";

export default class ListOfTalents {
  constructor(types) {
    this.types = types;
    this.modal = new Modal();
    this.initModal();
    document.addEventListener("resetTalents", () => this.initModal());
  }

  initModal() {
    this.modal.content.innerHTML = `<h2>Talente</h2>`;
    this.createContainer();
    this.createTalents();
    this.updateContainerVisbility();
  }

  createContainer() {
    this.types.map(([name, id]) => {
      let newElement = document.createElement("div");
      newElement.className = `talents-modal__container talents-modal__${id}`;
      newElement.innerHTML = `<h3>${name}</h3>`;
      this.modal.content.appendChild(newElement);
    });
  }

  createTalents() {
    talents
      .getUnusedTalents()
      .map((talentKey) => new ListOfTalentsItem(talentKey, this.modal.content));
  }

  updateContainerVisbility() {
    const containers = this.modal.content.querySelectorAll(
      ".talents-modal__container"
    );
    containers.forEach((el) => {
      el.childElementCount <= 1
        ? el.classList.add("disabled")
        : el.classList.remove("disabled");
    });
  }
}
