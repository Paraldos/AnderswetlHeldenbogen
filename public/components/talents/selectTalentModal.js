import talentsController from "../../javascript/talentsController.js";
import Modal from "../modal/modal.js";
import ControllElement from "../controllElement/controllElement.js";
import DescriptionModal from "../descriptionModal/descriptionModal.js";

export default class SelectTalentModal {
  constructor() {
    this.types = talentsController.types;
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
    talentsController
      .getUnusedTalents()
      .map((talentKey) => new Item(talentKey, this.modal.content));
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

class Item extends ControllElement {
  constructor(key, modalContent) {
    super("talent");
    this.key = key;
    this.dbEntry = talentsController.getDBEntry(key);
    this.talentContainer = modalContent.querySelector(
      `.talents-modal__${this.dbEntry.type}`
    );
    this.minusBtn.classList.add("disabled");
    this.update();
    this.talentContainer.appendChild(this.wrapper);
  }

  update() {
    this.mainBtn.innerHTML =
      this.dbEntry.max_level > 1
        ? `${this.dbEntry.name} (1 bis ${this.dbEntry.max_level})`
        : `${this.dbEntry.name}`;
  }

  onMainBtnClick() {
    new DescriptionModal(this.dbEntry);
  }

  onPlusBtnClick() {
    talentsController.addTalent(this.key);
    document.dispatchEvent(new Event("updateConditions"));
  }
}
