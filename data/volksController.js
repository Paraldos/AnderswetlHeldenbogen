import db from "./db.js";
import talentController from "./talentController.js";

export default class VolksController {
  constructor(hero) {
    this.hero = hero;
  }

  changeVolk(id) {
    this.removeVolkstalente();
    this.hero.grundlagen.volk = id;
    this.addVolkstalente();
    this.hero.saveHero();
    document.dispatchEvent(new Event("updateMainBtn"));
    document.dispatchEvent(new Event("resetTalents"));
  }

  removeVolkstalente() {
    this.hero.talente = this.hero.talente.filter((el) => !el.volkstalent);
  }

  addVolkstalente() {
    let dbEntry = db.voelker[this.hero.grundlagen.volk];
    if (!dbEntry) return;
    let volkstalente = dbEntry.talente ? dbEntry.talente.split("\n") : [];
    volkstalente.forEach((id) => {
      if (talentController.findTalent(id))
        talentController.findTalent(id).volkstalent = true;
      else talentController.addTalent(id, true);
    });
  }
}
