import db from "../../data/db.js";
import hero from "../../data/hero.js";
import StateModal from "./stateModal.js";

export default class ComplexListItem {
  constructor(id, container) {
    this.id = id;
    this.container = container;
    this.dbEntry = db.states[id];
    this.heroEntry = hero.states[id];
    this.item = this.initItem();

    this.container.appendChild(this.item);
    this.updateStatesSquares();

    this.mainBtn = this.item.querySelector(".states__main-btn");
    this.mainBtn.addEventListener("click", () => new StateModal(this.id));
    this.updateMainBtnText();

    this.plusBtn = this.item.querySelector(".states__plus-btn");
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());

    this.minusBtn = this.item.querySelector(".states__minus-btn");
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());

    if (this.id != "sp") {
      this.maxPlusBtn = this.item.querySelector(".states__max-plus-btn");
      this.maxPlusBtn.addEventListener("click", () => this.onMaxPlusBtnClick());

      this.maxMinusBtn = this.item.querySelector(".states__max-minus-btn");
      this.maxMinusBtn.addEventListener("click", () =>
        this.onMaxMinusBtnClick()
      );
    }

    document.addEventListener("resetStates", () => {
      this.updateStatesSquares();
      this.updateMainBtnText();
    });
  }

  onMaxPlusBtnClick() {
    hero.states[this.id].max++;
    hero.saveHero();
    this.updateStatesSquares();
    this.updateMainBtnText();
  }

  onMaxMinusBtnClick() {
    if (this.id == "ap" && this.heroEntry.max <= 7) return;
    if (this.id == "lp" && this.heroEntry.max <= 7) return;
    if (this.id == "sp" && this.heroEntry.max <= 3) return;
    this.heroEntry.max--;
    hero.saveHero();
    this.updateStatesSquares();
    this.updateMainBtnText();
  }

  onPlusBtnClick() {
    if (this.heroEntry.current < this.getMax()) {
      this.heroEntry.current++;
      hero.saveHero();
      this.updateStatesSquares();
    }
  }

  onMinusBtnClick() {
    if (this.heroEntry.current > 0) {
      this.heroEntry.current--;
      hero.saveHero();
      this.updateStatesSquares();
    }
  }

  initItem() {
    let listItem = document.createElement("li");
    listItem.classList = `states__list-item states__${this.id}`;
    listItem.innerHTML = `
        <button class="states__main-btn">Text</button>
        <div class="states__squares states__${
          this.id
        }-squares states__edit-element"></div>
        <button class="symbol-btn states__minus-btn states__edit-element"><i class="fa-solid fa-minus"></i></button>
        <button class="symbol-btn states__plus-btn states__edit-element"><i class="fa-solid fa-plus"></i></button>
        
        ${this.id != "sp" ? this.getMaxBtns() : ""}`;
    return listItem;
  }

  getMaxBtns() {
    return `<p class="states__edit-element invisible">Maximum: </p>
    <button class="symbol-btn states__max-minus-btn states__edit-element invisible"><i class="fa-solid fa-minus"></i></button>
    <button class="symbol-btn states__max-plus-btn states__edit-element invisible"><i class="fa-solid fa-plus"></i></button>`;
  }

  getMax() {
    let max = this.heroEntry.max;
    if (this.id == "sp") {
      if (hero.talents.findTalent("glueck")) max++;
      if (hero.flaws.findFlaw("pech")) max--;
    }
    if (this.id == "lp") {
      if (hero.talents.findTalent("huene")) max += 2;
    }
    return max;
  }

  updateMainBtnText() {
    let mainTxt = `${this.dbEntry.abbreviation}: ${this.getMax()}`;
    this.mainBtn.textContent = mainTxt;
  }

  updateStatesSquares() {
    let container = this.item.querySelector(`.states__${this.id}-squares`);
    container.innerHTML = "";

    for (let i = 1; i <= this.getMax(); i++) {
      let square = document.createElement("i");
      square.classList.add(
        i <= hero.states[this.id].current ? "fa-solid" : "fa-regular"
      );
      square.classList.add("fa-square");
      container.appendChild(square);
    }
  }
}
