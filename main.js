import db from "./app/db/db.js";
import hero from "./app/hero/hero.js";
import NavMenu from "./app/menus/navMenu.js";
import HeroMenu from "./app/menus/heroMenu.js";
import Attribute from "./app/attribute/attribute.js";
import Grundlagen from "./app/grundlagen/grundlagen.js";
import Fertigkeiten from "./app/fertigkeiten/fertigkeiten.js";
import Talente from "./app/talente/talente.js";

class Main {
  constructor() {
    this.main = document.querySelector("main");
    new NavMenu();
    new HeroMenu();
    this.resetMain();
    this.addResetListener();
  }

  resetMain() {
    this.main.innerHTML = "";
    new Grundlagen();
    // new Attribute();
    // new Fertigkeiten();
    // new Talente();
  }

  addResetListener() {
    document.addEventListener("resetMain", () => this.resetMain());
  }
}
new Main();
