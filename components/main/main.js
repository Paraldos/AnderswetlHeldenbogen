import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Attribute from "../attribute/attribute.js";
import Grundlagen from "../grundlagen/grundlagen.js";
import Fertigkeiten from "../fertigkeiten/fertigkeiten.js";
import TalentsSection from "../talente/talentsSection.js";
import FlawsSection from "../flaws/flawsSection.js";

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
    new Grundlagen();
    new Attribute();
    new Fertigkeiten();
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
