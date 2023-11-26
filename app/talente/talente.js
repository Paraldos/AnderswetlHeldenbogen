import Section from "../section/section.js";
import db from "../db/db.js";
import Talent from "./talent.js";

export default class Talente {
  constructor() {
    this.section = new Section("Talente");
    this.talente = this.fillTalenteArray();
    this.addEditButtonListener();
  }

  fillTalenteArray() {
    let arr = [];
    this.talente = db.heroTalente.forEach((el, index) => {
      arr.push(new Talent(el.key, index));
    });
    return arr;
  }

  addEditButtonListener() {
    this.section.editBtn.addEventListener("click", () => {
      const btnIsOn = this.section.toggleEditBtn();
      // this.updateSectionHeader();
      this.talente.forEach((el) => el.toggleEditBtn(btnIsOn));
    });
  }
}
