import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import Skill from "./skill.js";

export default class Skills {
  constructor() {
    this.section = new Section("Fertigkeiten", "skills");
    this.container = this.createContainer();
    this.skills = Object.keys(db.skills).map((key) => new Skill(key));
    this.updateSectionHeader();
    document.addEventListener("updateSkillsHeader", () =>
      this.updateSectionHeader()
    );
  }

  createContainer() {
    let container = document.querySelector(".skills__content");
    container.innerHTML = `
        <div class="skills__container skills__geistig"><h3>Geistig</h3></div>
        <div class="skills__container skills__koerperlich"><h3>Körperlich</h3></div>
        <div class="skills__container skills__sozial"><h3>Sozial</h3></div>`;
    return container;
  }

  updateSectionHeader() {
    this.section.headerText.innerHTML = `Fertigkeiten <span class="hide-on-no-edit">(${this.getSkillsSum()})</span>`;
  }

  getSkillsSum() {
    let sum = 0;
    for (let key in db.skills) {
      sum += hero.skills[key].value;
    }
    return sum;
  }
}
