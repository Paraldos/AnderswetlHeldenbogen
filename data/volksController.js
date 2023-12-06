import db from "./db.js";

export default class VolksController {
  constructor(hero) {
    this.hero = hero;
  }

  changeVolk(id) {
    this.hero.grundlagen.volk = id;
    this.removeVolkstalente();
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
      if (this.hero.talenteController.findTalent(id))
        this.hero.talenteController.findTalent(id).volkstalent = true;
      else this.hero.talenteController.addTalent(id, true);
    });
  }
}