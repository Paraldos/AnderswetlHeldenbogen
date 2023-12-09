import db from "../../data/db.js";
import hero from "../../data/hero.js";
import HeroSchwaechenModal from "./heroSchwaecheModal.js";

export default class HeroSchwaeche {
  constructor(id, index, btnVisiblity, container) {
    this.id = id;
    this.index = index;
    this.btnVisiblity = btnVisiblity;
    this.dbEntry = db.schwaechen[id];
    this.container = container;
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".schwaeche__main-btn");
    this.minusBtn = this.element.querySelector(".schwaeche__minus-btn");
    this.addMainBtnListener();
    this.addMinusBtnListener();
  }

  createElement() {
    let txt = this.dbEntry.name;
    let newElement = document.createElement("div");
    newElement.classList.add("schwaeche");
    newElement.innerHTML = `
      <button class="schwaeche__main-btn">${txt}</button>
      <button class="
        schwaeche__minus-btn 
        ${this.btnVisiblity ? "" : "invisible"}
        symbol-btn">
          <i class="fa-solid fa-minus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  addMainBtnListener() {
    this.mainBtn.addEventListener("click", () => {
      new HeroSchwaechenModal(this.dbEntry, this.index);
    });
  }

  addMinusBtnListener() {
    this.minusBtn.addEventListener("click", () => {
      hero.schwaechenController.decreaseSchwaeche(this.index);
    });
  }

  toggleEditBtn(btnsVisible) {
    if (btnsVisible) {
      this.minusBtn.classList.remove("invisible");
    } else {
      this.minusBtn.classList.add("invisible");
    }
  }
}
