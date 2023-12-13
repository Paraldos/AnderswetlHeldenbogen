import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import Fertigkeit from "./fertigkeit.js";

export default class Fertigkeiten {
  constructor() {
    this.section = new Section("Fertigkeiten", "fertigkeiten");
    this.container = this.createContainer();
    this.fertigkeiten = this.fillFertigkeitenArray();
    this.addEditButtonListener();
    this.addUpdateSectionHeader();
  }

  createContainer() {
    let container = document.querySelector(".fertigkeiten__content");
    container.innerHTML = `
    <div class="fertigkeiten__container fertigkeiten__geistig"><h3>Geistig</h3></div>
    <div class="fertigkeiten__container fertigkeiten__koerperlich"><h3>Körperlich</h3></div>
    <div class="fertigkeiten__container fertigkeiten__sozial"><h3>Sozial</h3></div>`;
    return container;
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
      sum += hero.fertigkeiten[key].value;
    }
    return sum;
  }
}
