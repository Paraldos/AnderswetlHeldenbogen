import database from "../../data/database.js";
import Section from "../../templates/section/section.js";
// import TalentsModal from "./talentsModal.js";
// import SingleTalent from "./singleTalent.js";

export default class TalentsSection {
  constructor() {
    this.section = new Section("Talente", "talents", true);
    this.types = [
      ["Allgemein", "allgemein"],
      ["Kampf", "kampf"],
      ["Manöver", "manoever"],
      ["Übernatürlich", "uebernatuerlich"],
      ["Zauber", "zauber"],
    ];
    // this.typeContainers = this.initTypeContainers();
    // this.talents = this.initTalents();
    // this.updateVisibility();
    // this.section.plusBtn.addEventListener("click", () => new TalentsModal());
    // document.addEventListener("toggleEdit", () => this.onToggleEdit());
    // document.addEventListener("resetTalents", () => this.onReset());
  }

  // ============================== init
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
      (el, index) => new SingleTalent(el.id, index, this.section.editToggle)
    );
  }

  // ============================== events
  onToggleEdit() {
    this.updateSectionHeader();
    this.talents.forEach((el) => el.toggleEditBtn(this.section.editToggle));
    this.updateVisibility();
  }

  onReset() {
    this.typeContainers = this.initTypeContainers();
    this.talents = this.initTalents();
    this.updateVisibility();
    this.updateSectionHeader();
  }

  // ============================== helper
  updateSectionHeader() {
    const visible = this.section.editToggle ? "" : "invisible";
    this.section.headerText.innerHTML = `Talente <span class="${visible}">(${hero.talents.getSum()})</span>`;
  }

  updateVisibility() {
    this.section.section.classList.toggle(
      "invisible",
      !this.section.editToggle && hero.talents.value.length <= 0
    );
    this.typeContainers.forEach((el) => {
      el.classList.toggle("invisible", el.childElementCount <= 1);
    });
  }
}
