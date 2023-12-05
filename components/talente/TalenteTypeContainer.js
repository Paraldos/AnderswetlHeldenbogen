import db from "../../data/db.js";

export default class TalenteTypeContainer {
  constructor(name, parentContainer) {
    this.parentContainer = parentContainer;
    this.name = name;
    this.id = db.nameToId(name);
    this.typeContainer = this.addTypeContainer(name);
  }

  addTypeContainer() {
    let newElement = document.createElement("div");
    newElement.classList.add("talente__container", `talente__${this.id}`);
    newElement.innerHTML = `<h3>${this.name}</h3>`;
    this.parentContainer.appendChild(newElement);
    return newElement;
  }

  resetContainer() {
    this.typeContainer.innerHTML = `<h3>${this.name}</h3>`;
  }

  updateVisbility() {
    this.typeContainer.childElementCount <= 1
      ? this.typeContainer.classList.add("invisible")
      : this.typeContainer.classList.remove("invisible");
  }
}
