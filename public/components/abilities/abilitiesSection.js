import Section from "../section/section.js";
import abilitiesController from "../../javascript/abilitiesController.js";
import AbilitiesSectionItem from "./abilitiesSectionItem.js";

export default class AbilitiesSection extends Section {
  constructor(name, abilityType) {
    super(name, abilityType);
    this.name = name;
    this.abilityType = abilityType;
    this.addContainer();
    this.addElements();
    document.addEventListener("updateAbilitiesHeader", () =>
      this.onUpdateAttributsHeader()
    );
  }

  addContainer() {
    if (this.abilityType != "skills") return;
    this.content.innerHTML = `
        <div class="skills__container skills__geistig"><h3>Geistig</h3></div>
        <div class="skills__container skills__koerperlich"><h3>Körperlich</h3></div>
        <div class="skills__container skills__sozial"><h3>Sozial</h3></div>`;
  }

  addElements() {
    const heroList = abilitiesController.getHeroList(this.abilityType);
    Object.keys(heroList).map(
      (key) => new AbilitiesSectionItem(key, this, this.abilityType)
    );
  }

  onToggleEdit() {
    super.onToggleEdit();
    this.onUpdateAttributsHeader();
  }

  onUpdateAttributsHeader() {
    const heroSum = abilitiesController.getHeroSum(this.abilityType);
    const disabled = this.editToggle ? "" : "disabled";
    this.header.innerHTML = `Attribute <span class="${disabled}">(${heroSum})</span>`;
  }
}
