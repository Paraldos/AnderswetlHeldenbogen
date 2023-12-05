import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import DbSchwaechenModal from "./dbSchwaechenModal.js";

export default class HeroSchwaechen {
  constructor() {
    this.section = new Section("Schwächen", true);
    this.container = document.querySelector(".talente__content");

    this.addPlusBtnListener();
    this.addEditBtnListener();
  }

  addPlusBtnListener() {
    this.section.plusBtn.addEventListener("click", () => {
      new DbSchwaechenModal();
    });
  }

  addEditBtnListener() {
    this.section.editBtn.addEventListener("click", () => {
      console.log("edit");
    });
  }
}
