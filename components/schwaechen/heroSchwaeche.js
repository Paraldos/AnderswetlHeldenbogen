import db from "../../data/db.js";
import hero from "../../data/hero.js";
import HeroSchwaechenModal from "./heroSchwaecheModal.js";

export default class HeroSchwaeche {
  constructor(id, index, btnsVisiblity, container) {
    this.id = id;
    this.index = index;
    this.container = container;
    this.dbEntry = db.schwaechen[id];
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".schwaeche__main-btn");
    this.minusBtn = this.element.querySelector(".schwaeche__minus-btn");
    this.mainBtn.addEventListener("click", () => this.onMainBtnClick());
    this.minusBtn.addEventListener("click", () => onMinusBtnClick());
    this.updateBtns();
    this.toggleEditBtn(btnsVisiblity);
  }

  createElement() {
    let newElement = document.createElement("div");
    newElement.classList.add("schwaeche");
    newElement.innerHTML = `
      <button class="schwaeche__main-btn">${this.dbEntry.name}</button>
      <button class="schwaeche__minus-btn symbol-btn">
        <i class="fa-solid fa-minus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  updateBtns() {
    hero.schwaechen[this.index].volksschwaeche
      ? this.minusBtn.setAttribute("disabled", true)
      : this.minusBtn.removeAttribute("disabled");
  }

  onMainBtnClick() {
    new HeroSchwaechenModal(this.dbEntry, this.index);
  }

  onMinusBtnClick() {
    hero.schwaechenController.decreaseSchwaeche(this.index);
  }

  toggleEditBtn(btnsVisible) {
    if (btnsVisible) {
      this.minusBtn.classList.remove("invisible");
    } else {
      this.minusBtn.classList.add("invisible");
    }
    this.updateBtns();
  }
}
