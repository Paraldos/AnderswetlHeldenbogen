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
    this.removeVolksschwaechen();
    this.addVolksschwaechen();
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

  removeVolksschwaechen() {
    this.hero.schwaechen = this.hero.schwaechen.filter(
      (el) => !el.volksschwaeche
    );
  }

  addVolksschwaechen() {
    if (!this.dbEntry) return;
    let schwaechen = this.dbEntry.schwaechen
      ? this.dbEntry.schwaechen.split("\n")
      : [];
    schwaechen.forEach((id) => {
      if (this.hero.schwaechenController.findSchwaeche(id))
        this.hero.schwaechenController.findSchwaeche(id).volkstalent = true;
      else this.hero.schwaechenController.addSchwaeche(id, true);
    });
  }
}
