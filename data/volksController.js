import db from "./db.js";

export default class VolksController {
  constructor(hero) {
    this.hero = hero;
    this.dbEntry;
  }

  changeVolk(id) {
    this.hero.grundlagen.volk = id;
    this.dbEntry = db.voelker[this.hero.grundlagen.volk];
    this.removeVolkstalente();
    this.addVolkstalente();

    this.hero.flaws.removeInnateFlaws();
    this.addInnateFlaws();

    this.hero.saveHero();
    document.dispatchEvent(new Event("updateMainBtn"));
    document.dispatchEvent(new Event("resetTalents"));
  }

  removeVolkstalente() {
    this.hero.talente = this.hero.talente.filter((el) => !el.volkstalent);
  }

  addVolkstalente() {
    if (!this.dbEntry) return;
    let talente = this.dbEntry.talente ? this.dbEntry.talente.split("\n") : [];
    talente.forEach((id) => {
      if (this.hero.talenteController.findTalent(id))
        this.hero.talenteController.findTalent(id).volkstalent = true;
      else this.hero.talenteController.addTalent(id, true);
    });
  }

  getInnateFlaws() {
    return this.dbEntry.schwaechen ? this.dbEntry.schwaechen.split("\n") : [];
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
