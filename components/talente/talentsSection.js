import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import TalenteTypeContainer from "./TalenteTypeContainer.js";
import DbTalenteModal from "./dbTalenteModal.js";
import HeroTalentModal from "./heroTalentModal.js";

export default class TalentsSection {
  constructor() {
    this.section = new Section("Talente", "talente", true);
    this.container = document.querySelector(".talente__content");
    this.typeContainer = [
      new TalenteTypeContainer("Allgemein", this.container),
      new TalenteTypeContainer("Kampf", this.container),
      new TalenteTypeContainer("Manöver", this.container),
      new TalenteTypeContainer("Übernatürlich", this.container),
      new TalenteTypeContainer("Zauber", this.container),
    ];
    this.talente = this.fillTalenteArray();
    this.addEditBtnListener();
    this.addPlusBtnListener();
    this.addResetListener();
    this.updateContainerVisbility();
  }

  updateContainerVisbility() {
    this.typeContainer.forEach((el) => el.updateVisbility());
  }

  fillTalenteArray() {
    let talente = [];
    hero.talents.value.forEach((el, index) => {
      talente.push(
        new SingleTalent(
          el.id,
          index,
          this.section.editBtn.classList.contains("on")
        )
      );
    });
    return talente;
  }

  addResetListener() {
    document.addEventListener("resetTalents", () => {
      this.typeContainer.forEach((el) => el.resetContainer());
      this.talente = this.fillTalenteArray();
      this.updateContainerVisbility();
      this.updateSectionHeader();
    });
  }

  addPlusBtnListener() {
    this.section.plusBtn.addEventListener("click", () => new DbTalenteModal());
  }

  addEditBtnListener() {
    this.section.editBtn.addEventListener("click", () => {
      const btnIsOn = this.section.toggleEditBtn();
      this.updateSectionHeader();
      this.talente.forEach((el) => el.toggleEditBtn(btnIsOn));
    });
  }

  updateSectionHeader() {
    if (this.section.editBtn.classList.contains("on")) {
      this.section.updateHeader(`Talente (${this.getTalentSum()})`);
    } else {
      this.section.updateHeader("Talente");
    }
  }

  getTalentSum() {
    return hero.talents.value.length;
  }
}

class SingleTalent {
  constructor(id, index, btnVisiblity) {
    this.id = id;
    this.index = index;
    this.dbEntry = db.talents[id];
    this.container = document.querySelector(`.talente__${this.dbEntry.type}`);
    this.element = this.createElement(btnVisiblity);
    this.mainBtn = this.element.querySelector(".talent__main-btn");
    this.minusBtn = this.element.querySelector(".talent__minus-btn");
    this.plusBtn = this.element.querySelector(".talent__plus-btn");
    this.btns = this.element.querySelectorAll(".symbol-btn");
    this.mainBtn.addEventListener("click", () => this.onMainBtnclick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());

    this.updateBtns();
  }

  createElement(btnVisiblity) {
    // Text
    let txt = this.dbEntry.name;
    if (hero.talents.value[this.index].comment) {
      txt += "*";
    }
    if (this.dbEntry.max_level > 1) {
      txt += ` (${hero.talents.value[this.index].level})`;
    }
    if (
        this.dbEntry.name == "Veranlagung" &&
        hero.veranlagungsController.getVeranlagungName()
    ) {
      txt += ` (${hero.veranlagungsController.getVeranlagungName()})`;
    }

    let newElement = document.createElement("div");
    newElement.classList.add("talent");
    newElement.innerHTML = `
      <button class="talent__main-btn">${txt}</button>
      <button class="
        talent__minus-btn 
        ${btnVisiblity ? "" : "invisible"}
        symbol-btn">
          <i class="fa-solid fa-minus"></i>
      </button>
      <button class="
        talent__plus-btn 
        ${btnVisiblity ? "" : "invisible"}
        symbol-btn">
          <i class="fa-solid fa-plus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  onMainBtnclick() { new HeroTalentModal(this.dbEntry, this.index)}

  onMinusBtnClick() { hero.talents.decreaseTalent(this.index)}

  onPlusBtnClick() {hero.talents.increaseTalent(this.index)}

  updateBtns() {
    // plus
    this.plusBtn.removeAttribute("disabled");
    if (this.dbEntry.max_level <= 1) {
      this.plusBtn.classList.add("invisible");
    }
    if (hero.talents.value[this.index].level >= this.dbEntry.max_level) {
      this.plusBtn.setAttribute("disabled", true);
    }
    // minus
    this.minusBtn.removeAttribute("disabled");
    if (hero.talents.value[this.index].innate) {
      this.minusBtn.setAttribute("disabled", true);
    }
  }

  toggleEditBtn(btnsVisible) {
    if (btnsVisible) {
      this.minusBtn.classList.remove("invisible");
      this.plusBtn.classList.remove("invisible");
      this.updateBtns();
    } else {
      this.minusBtn.classList.add("invisible");
      this.plusBtn.classList.add("invisible");
    }
  }
}
