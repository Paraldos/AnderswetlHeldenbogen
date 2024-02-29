import skillsController from "../../javascript/skillsController.js";
import Section from "../section/section.js";
import SkillsSectionItem from "./skillsSectionItem.js";

export default class SkillsSection extends Section {
  constructor() {
    super("Fertigkeiten", "skills");
    this.createContainer();
    Object.keys(skillsController.getHeroList()).map(
      (key) => new SkillsSectionItem(key, this)
    );
    document.addEventListener("updateSkillsHeader", () =>
      this.onUpdateSkillsHeader()
    );
  }

  createContainer() {
    this.content.innerHTML = `
        <div class="skills__container skills__geistig"><h3>Geistig</h3></div>
        <div class="skills__container skills__koerperlich"><h3>Körperlich</h3></div>
        <div class="skills__container skills__sozial"><h3>Sozial</h3></div>`;
  }

  onToggleEdit() {
    super.onToggleEdit();
    this.onUpdateSkillsHeader();
  }

  onUpdateSkillsHeader() {
    const heroSum = skillsController.getHeroSum();
    const disabled = this.editToggle ? "" : "disabled";
    this.header.innerHTML = `Fertigkeiten <span class="${disabled}">(${heroSum})</span>`;
  }
}
