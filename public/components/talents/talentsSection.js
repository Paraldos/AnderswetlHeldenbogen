import database from "../../data/database.js";
import Section from "../section/section.js";
import ListOfTalents from "./listOfTalents.js";
import TalentsSectionItem from "./talentsSectionItem.js";
import talents from "../../data/talents.js";

export default class TalentsSection {
  constructor() {
    this.types = [
      ["Allgemein", "allgemein"],
      ["Kampf", "kampf"],
      ["Manöver", "manoever"],
      ["Übernatürlich", "uebernatuerlich"],
      ["Zauber", "zauber"],
    ];
    this.section = new Section("Talente", "talents", true);
    this.initSection();
    this.section.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    document.addEventListener("resetTalents", () => this.initSection());
    document.addEventListener("toggleEdit", () => this.updateHeader());
    document.addEventListener("resetTalentHeader", () => this.updateHeader());
  }

  initSection() {
    this.section.content.innerHTML = "";
    this.initContainer();
    this.initTalents();
    this.updateVisibility();
    this.updateHeader();
  }

  initContainer() {
    for (const [name, id] of this.types) {
      let newElement = document.createElement("div");
      newElement.className = `talents__container talents__${id}`;
      newElement.innerHTML = `<h3>${name}</h3>`;
      this.section.content.appendChild(newElement);
    }
  }

  initTalents() {
    if (!database.hero.talents) return;
    database.hero.talents.map(
      (talent, index) => new TalentsSectionItem(talent.id, index, this.section)
    );
  }

  onPlusBtnClick() {
    new ListOfTalents(this.types);
  }

  updateHeader() {
    this.section.editToggle
      ? (this.section.header.innerHTML = `Talente <span>(${talents.getSum()})</span>`)
      : (this.section.header.innerHTML = `Talente`);
  }

  updateVisibility() {
    const containers = this.section.content.querySelectorAll(
      ".talents__container"
    );
    for (const container of containers) {
      container.classList.toggle("disabled", container.childElementCount <= 1);
    }
  }
}
