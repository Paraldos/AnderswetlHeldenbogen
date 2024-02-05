import database from "../../data/database.js";
import BasicsInformationSection from "../basicInformation/basicInformationSection.js";
import AttributsSection from "../attributs/attributsSection.js";
import SkillsSection from "../skills/skillsSection.js";
import TalentsSection from "../talents/talentsSection.js";
import FlawsSection from "../flaws/flawsSection.js";
import StatesSection from "../states/statesSection.js";
// import InventorySection from "../inventory/inventorySection.js";

export default class CharacterSheet {
  constructor() {
    this.characterSheet = document.querySelector(".characterSheet");
    document.addEventListener("resetAll", () => this.reset());
  }

  disable(disabled) {
    this.characterSheet.classList.toggle("disabled", disabled);
  }

  reset() {
    this.characterSheet.innerHTML = "";
    if (!database.hero) {
      this.createPlaceholder();
    } else {
      this.createHero();
    }
  }

  createHero() {
    new StatesSection();
    new BasicsInformationSection();
    new AttributsSection();
    new SkillsSection();
    new TalentsSection();
    new FlawsSection();
    // new InventorySection();
  }

  createPlaceholder() {
    this.characterSheet.innerHTML = `<button class="characterSheet__new-hero-btn">Neuer Held</button>`;
    let newHeroBtn = this.characterSheet.querySelector(
      ".characterSheet__new-hero-btn"
    );
    newHeroBtn.addEventListener("click", () => this.onNewHeroBtn());
  }

  onNewHeroBtn() {
    database.newHero();
    document.dispatchEvent(new Event("resetAll"));
  }
}
