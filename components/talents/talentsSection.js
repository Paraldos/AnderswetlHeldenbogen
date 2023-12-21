import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import TalentsModal from "./talentsModal.js";
import TalentModal from "./talentModal.js";

export default class TalentsSection {
  constructor() {
    this.section = new Section("Talente", "talents", true);
    this.editToggle = false;
    this.types = [
      ["Allgemein", "allgemein"],
      ["Kampf", "kampf"],
      ["Manöver", "manoever"],
      ["Übernatürlich", "uebernatuerlich"],
      ["Zauber", "zauber"],
    ];
    this.typeContainers = this.initTypeContainers();
    this.talents = this.initTalents();
    this.updateContainerVisbility();
    this.section.plusBtn.addEventListener("click", () => new TalentsModal());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
    document.addEventListener("resetTalents", () => this.onReset());
  }

  initTypeContainers() {
    this.section.contentContainer.innerHTML = "";
    return this.types.map(([name, id]) => {
      let newElement = Object.assign(document.createElement("div"), {
        className: `talents__container talents__${id}`,
        innerHTML: `<h3>${name}</h3>`,
      });
      this.section.contentContainer.appendChild(newElement);
      return newElement;
    });
  }

  initTalents() {
    return hero.talents.value.map(
      (el, index) => new SingleTalent(el.id, index, this.editToggle)
    );
  }

  updateContainerVisbility() {
    this.typeContainers.forEach((el) => {
      el.childElementCount <= 1
        ? el.classList.add("invisible")
        : el.classList.remove("invisible");
    });
  }

  onToggleEdit() {
    this.editToggle = !this.editToggle;
    this.updateSectionHeader();
    this.talents.forEach((el) => el.toggleEditBtn(this.editToggle));
  }

  onReset() {
    this.typeContainers = this.initTypeContainers();
    this.talents = this.initTalents();
    this.updateContainerVisbility();
    this.updateSectionHeader();
  }

  // helper
  updateSectionHeader() {
    const visible = this.editToggle ? "" : "invisible";
    this.section.headerText.innerHTML = `Talente <span class="${visible}">(${hero.talents.getSum()})</span>`;
  }
}

class SingleTalent {
  constructor(id, index, btnVisiblity) {
    this.id = id;
    this.index = index;
    this.talent = hero.talents.value[this.index];
    this.dbEntry = db.talents[id];
    this.container = document.querySelector(`.talents__${this.dbEntry.type}`);
    this.element = this.createElement();

    this.mainBtn = this.element.querySelector(".talent__main-btn");
    this.minusBtn = this.element.querySelector(".talent__minus-btn");
    this.plusBtn = this.element.querySelector(".talent__plus-btn");
    this.btns = this.element.querySelectorAll(".symbol-btn");

    this.mainBtn.addEventListener("click", () => this.onMainBtnclick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());

    this.toggleEditBtn(btnVisiblity);
  }

  createElement() {
    const txt = `
    ${this.dbEntry.name}
    ${this.talent.comment ? "*" : ""}
    ${this.dbEntry.max_level > 1 ? `(${this.talent.level})` : ""}
    ${
      this.dbEntry.name == "Veranlagung" &&
      hero.veranlagungsController.getVeranlagungName()
        ? ` (${hero.veranlagungsController.getVeranlagungName()})`
        : ""
    }`;
    let newElement = document.createElement("div");
    newElement.classList.add("talent");
    newElement.innerHTML = `
      <button class="talent__main-btn">${txt}</button>
      <button class="talent__minus-btn symbol-btn">
          <i class="fa-solid fa-minus"></i>
      </button>
      <button class="talent__plus-btn symbol-btn">
          <i class="fa-solid fa-plus"></i>
      </button>`;
    this.container.appendChild(newElement);
    return newElement;
  }

  onMainBtnclick() {
    new TalentModal(this.dbEntry, this.index);
  }

  onMinusBtnClick() {
    hero.talents.decreaseTalent(this.index);
  }

  onPlusBtnClick() {
    hero.talents.increaseTalent(this.index);
  }

  updateBtns() {
    this.plusBtn.classList.toggle("invisible", this.dbEntry.max_level <= 1);
    this.plusBtn.disabled = this.dbEntry.max_level <= this.talent.level;
    this.minusBtn.disabled = this.talent.innate;
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
