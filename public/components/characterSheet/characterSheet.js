import database from "../../data/database.js";
import BasicsInformationSection from "../basicInformation/basicInformationSection.js";
import AbilitiesSection from "../abilities/abilitiesSection.js";
import TalentsSection from "../talents/talentsSection.js";
import FlawsSection from "../flaws/flawsSection.js";
import ConditionSection from "../conditions/conditionSection.js";
import InventorySection from "../inventory/inventorySection.js";

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
    new BasicsInformationSection();
    new AbilitiesSection("Attribute", "attributs");
    new AbilitiesSection("Fertigkeiten", "skills");
    new TalentsSection();
    new FlawsSection();
    new ConditionSection();
    new InventorySection();
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
