import database from "../../data/database.js";
import Section from "../section/section.js";
import SkillsSectionItem from "./skillsSectionItem.js";

export default class SkillsSection extends Section {
  constructor() {
    super("Fertigkeiten", "skills");
    this.createContainer();
    Object.keys(database.skills).map((key) => new SkillsSectionItem(key, this));
    document.addEventListener("updateSkillsHeader", () => this.update());
  }

  onToggleEdit() {
    super.onToggleEdit();
    this.update();
  }

  createContainer() {
    this.content.innerHTML = `
        <div class="skills__container skills__geistig"><h3>Geistig</h3></div>
        <div class="skills__container skills__koerperlich"><h3>Körperlich</h3></div>
        <div class="skills__container skills__sozial"><h3>Sozial</h3></div>`;
  }

  update() {
    const visible = this.editToggle ? "" : "disabled";
    this.header.innerHTML = `Fertigkeiten <span class="${visible}">(${this.getSkillsSum()})</span>`;
  }

  getSkillsSum() {
    let sum = -16;
    for (let key in database.hero.skills) {
      sum += database.hero.skills[key].value;
    }
    return sum;
  }
}
