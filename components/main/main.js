import db from "../../data/db.js";
import hero from "../../data/hero.js";
//
import Attributs from "../attributs/attributs.js";
import Grundlagen from "../grundlagen/grundlagen.js";
import Skills from "../skills/skills.js";
import TalentsSection from "../talents/talentsSection.js";
import FlawsSection from "../flaws/flawsSection.js";
import TraitsSection from "../traits/traitsSection.js";

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
    new TraitsSection();
    new Grundlagen();
    new Attributs();
    new Skills();
    new TalentsSection();
    new FlawsSection();
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
