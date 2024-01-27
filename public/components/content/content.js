import Database from "../../data/database.js";
import BasicsInformationSection from "../basicsInformation/basicsInformationSection.js";
// import Attributs from "../attributs/attributs.js";
// import Skills from "../skills/skills.js";
// import TalentsSection from "../talents/talentsSection.js";
// import FlawsSection from "../flaws/flawsSection.js";
// import StatesSection from "../states/statesSection.js";
// import InventorySection from "../inventory/inventorySection.js";

export default class Content {
  constructor() {
    this.content = document.querySelector(".content");
    this.reset();
    document.addEventListener("resetAll", () => this.reset());
  }

  disable(disabled) {
    this.content.classList.toggle("disabled", disabled);
  }

  reset() {
    this.content.innerHTML = "";
    if (!Database.hero) {
      this.createPlaceholder();
    } else {
      this.createHero();
    }
  }

  createHero() {
    new BasicsInformationSection();
    // new Attributs();
    // new Skills();
    // new TalentsSection();
    // new FlawsSection();
    // new StatesSection();
    // new InventorySection();
  }

  createPlaceholder() {
    this.content.innerHTML = `<button class="content__new-hero-btn">Neuer Held</button>`;
    let newHeroBtn = this.content.querySelector(".content__new-hero-btn");
    newHeroBtn.addEventListener("click", () => this.onNewHeroBtn());
  }

  onNewHeroBtn() {
    Database.newHero();
    document.dispatchEvent(new Event("resetAll"));
  }
}
