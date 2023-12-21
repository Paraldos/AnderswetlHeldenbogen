import db from "../../data/db.js";
import hero from "../../data/hero.js";
//
import Basics from "../basics/basics.js";
import Attributs from "../attributs/attributs.js";
import Skills from "../skills/skills.js";
import TalentsSection from "../talents/talentsSection.js";
import FlawsSection from "../flaws/flawsSection.js";
import StatesSection from "../states/statesSection.js";
import InventorySection from "../inventory/inventorySection.js";

export default class Main {
  constructor() {
    this.main = document.querySelector("main");
    this.resetMain();
    this.addResetListener();
  }

  resetMain() {
    this.main.innerHTML = "";
    if (hero.heroIndex !== null) {
      this.fillMainWithHero();
    } else {
      this.fillMainWithPlaceholder();
    }
  }

  fillMainWithHero() {
    new InventorySection();
    new Basics();
    new Attributs();
    new Skills();
    new TalentsSection();
    new FlawsSection();
    new StatesSection();
  }

  fillMainWithPlaceholder() {
    this.main.innerHTML = `<button class="main__new-hero-btn">Neuer Held</button>`;
    let newHeroBtn = this.main.querySelector(".main__new-hero-btn");
    newHeroBtn.addEventListener("click", () => {
      hero.newHero();
      document.dispatchEvent(new Event("resetAll"));
    });
  }

  addResetListener() {
    document.addEventListener("resetAll", () => this.resetMain());
  }
}
