import db from "../../data/db.js";
import hero from "../../data/hero.js";

export default class HeroSchwaeche {
  constructor(id, index, btnVisiblity) {
    this.id = id;
    this.index = index;
    this.btnVisiblity = btnVisiblity;
    this.dbEntry = db.schwaechen[id];
    this.container = document.querySelector(`.talente__${this.dbEntry.type}`);
  }
}
