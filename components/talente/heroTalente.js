import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import HeroTalent from "./heroTalent.js";
import TalenteTypeContainer from "./TalenteTypeContainer.js";
import DbTalenteModal from "./dbTalenteModal.js";

export default class HeroTalente {
  constructor() {
    this.section = new Section("Talente", true);
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
    this.talente = hero.talente.forEach((el, index) => {
      talente.push(
        new HeroTalent(
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
    return hero.talente.length;
  }
}
