import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Navbar from "../menus/navbar.js";
import HeroMenu from "../menus/heroMenu.js";
import Attribute from "../attribute/attribute.js";
import Grundlagen from "../grundlagen/grundlagen.js";
import Fertigkeiten from "../fertigkeiten/fertigkeiten.js";
import Talente from "../talente/talente.js";

export default class Main {
  constructor() {
    this.main = document.querySelector("main");
    new Navbar();
    new HeroMenu();
    this.resetMain();
    this.addResetListener();
  }

  resetMain() {
    this.main.innerHTML = "";
    if (hero.heroIndex !== null) {
      new Grundlagen();
      new Attribute();
      new Fertigkeiten();
      new Talente();
    } else {
      this.main.innerHTML = `<button class="main__new-hero-btn">Neuer Held</button>`;
      let newHeroBtn = this.main.querySelector(".main__new-hero-btn");
      newHeroBtn.addEventListener("click", () => {
        hero.newHero();
        document.dispatchEvent(new Event("resetAll"));
      });
    }
  }

  addResetListener() {
    document.addEventListener("resetAll", () => this.resetMain());
  }
}
