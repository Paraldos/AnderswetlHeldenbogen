import db from "./db.js";

export default class VolksController {
  constructor(hero) {
    this.hero = hero;
    this.dbEntry;
  }

  changeVolk(id) {
    this.hero.grundlagen.volk = id;
    this.dbEntry = db.voelker[this.hero.grundlagen.volk];
    this.hero.talents.removeInnateTalents();
    this.addInnateTalents();

    this.hero.flaws.removeInnateFlaws();
    this.addInnateFlaws();

    this.hero.saveHero();
    document.dispatchEvent(new Event("updateMainBtn"));
    document.dispatchEvent(new Event("resetTalents"));
  }

  addInnateTalents() {
    if (!this.dbEntry) return;
    let talents = this.dbEntry.talents ? this.dbEntry.talents.split("\n") : [];
    talents.forEach((id) => {
      if (this.hero.talents.findTalent(id))
        this.hero.talents.findTalent(id).innate = true;
      else this.hero.talents.addTalent(id, true);
    });
  }

  getInnateFlaws() {
    return this.dbEntry.flaws ? this.dbEntry.flaws.split("\n") : [];
  }

  addInnateFlaws() {
    const innateFlaws = this.getInnateFlaws();
    innateFlaws.forEach((id) => {
      if (this.hero.flaws.getFlaw(id)) {
        this.hero.flaws.getFlaw(id).innate = true;
      } else {
        this.hero.flaws.addFlaw(id, true);
      }
    });
  }
}
