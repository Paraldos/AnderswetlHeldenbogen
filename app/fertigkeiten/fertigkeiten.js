import Section from "../section/section.js";
import db from "../db/db.js";
import Fertigkeit from "./fertigkeit.js";

export default class Fertigkeiten {
  constructor() {
    this.section = new Section("Fertigkeiten");
    this.container = document.querySelector(".fertigkeiten__content");
    this.container.innerHTML = `
    <div class="fertigkeiten__container fertigkeiten__geistig"><h2>Geistig</h2></div>
    <div class="fertigkeiten__container fertigkeiten__koerperlich"><h2>Körperlich</h2></div>
    <div class="fertigkeiten__container fertigkeiten__sozial"><h2>Sozial</h2></div>`;
    this.fertigkeiten = this.fillFertigkeitenArray();
    this.addEditButtonListener();
    this.addUpdateSectionHeader();
  }

  fillFertigkeitenArray() {
    let arr = [];
    for (let key in db.fertigkeiten) {
      arr.push(new Fertigkeit(key));
    }
    return arr;
  }

  addEditButtonListener() {
    this.section.editBtn.addEventListener("click", () => {
      const btnIsOn = this.section.toggleEditBtn();
      this.updateSectionHeader();
      this.fertigkeiten.forEach((el) => el.toggleEditBtn(btnIsOn));
    });
  }

  addUpdateSectionHeader() {
    document.addEventListener("updateFertigkeitenHeader", () =>
      this.updateSectionHeader()
    );
  }

  updateSectionHeader() {
    if (this.section.editBtn.classList.contains("on")) {
      this.section.updateHeader(`Fertigkeiten (${this.getFertigkeitenSum()})`);
    } else {
      this.section.updateHeader("Fertigkeiten");
    }
  }

  getFertigkeitenSum() {
    let sum = 0;
    for (let key in db.fertigkeiten) {
      sum += db.fertigkeiten[key].value;
    }
    return sum;
  }
}
