import Section from "../section/section.js";
import db from "../db/db.js";
import Talent from "./talent.js";

export default class Talente {
  constructor() {
    this.section = new Section("Talente");
    this.container = document.querySelector(".talente__content");
    this.talente = this.fillTalenteArray();
    this.addEditButtonListener();
    this.addResetListener();
  }

  fillTalenteArray() {
    let arr = [];
    this.talente = db.heroTalente.forEach((el, index) => {
      arr.push(
        new Talent(el.key, index, this.section.editBtn.classList.contains("on"))
      );
    });
    return arr;
  }

  addResetListener() {
    document.addEventListener("resetTalents", () => {
      this.container.innerHTML = "";
      this.talente = this.fillTalenteArray();
      this.updateSectionHeader();
    });
  }

  addEditButtonListener() {
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
    return db.heroTalente.length;
  }
}
