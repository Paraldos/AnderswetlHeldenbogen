import hero from "../../data/hero.js";
import StateModal from "./stateModal.js";

export default class Tempo {
  constructor(container) {
    this.container = container;
    this.item = this.initItem();
    this.mainBtn = this.item.querySelector(".states__main-btn");
    this.updateMainBtn();
    this.mainBtn.addEventListener("click", () => new StateModal("tempo"));
    document.addEventListener("resetStates", () => this.updateMainBtn());
  }

  updateMainBtn() {
    this.mainBtn.innerText = `Tempo: ${this.getValue()}`;
  }

  initItem() {
    let element = Object.assign(document.createElement("li"), {
      className: "states__list-item",
      innerHTML: `<button class="states__main-btn">placeholder</button>`,
    });
    this.container.appendChild(element);
    return element;
  }

  getValue() {
    let value = hero.states.tempo;
    if (hero.flaws.findFlaw("lahm")) value -= 2;
    return value;
  }
}
