import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import DbSchwaechenModal from "./dbSchwaechenModal.js";
import HeroSchwaeche from "./heroSchwaeche.js";

export default class HeroSchwaechen {
  constructor() {
    this.section = new Section("Schwächen", true);
    this.container = document.querySelector(".schwaechen__content");
    this.schwaechen = this.addSchwaechen();
    this.addPlusBtnListener();
    this.addEditBtnListener();
    this.addResetListener();
  }

  addSchwaechen() {
    let schwaechen = [];
    hero.schwaechen.forEach((el, index) => {
      schwaechen.push(
        new HeroSchwaeche(
          el.id,
          index,
          this.section.editBtn.classList.contains("on"),
          this.container
        )
      );
    });
  }

  addPlusBtnListener() {
    this.section.plusBtn.addEventListener("click", () => {
      new DbSchwaechenModal();
    });
  }

  addEditBtnListener() {
    this.section.editBtn.addEventListener("click", () => {
      const btnIsOn = this.section.toggleEditBtn();
      this.updateSectionHeader();
    });
  }

  addResetListener() {
    document.addEventListener("resetSchwaechen", () => {
      this.container.innerHTML = "";
      this.schwaechen = this.addSchwaechen();
      this.updateSectionHeader();
    });
  }

  updateSectionHeader() {
    if (this.section.editBtn.classList.contains("on")) {
      this.section.updateHeader(`Schwächen (${this.getSchwaechenSum()})`);
    } else {
      this.section.updateHeader("Schwächen");
    }
  }

  getSchwaechenSum() {
    return hero.schwaechen.length;
  }
}
