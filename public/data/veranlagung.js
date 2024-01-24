import db from "./db.js";

export default class Veranlagung {
  constructor(hero) {
    this.hero = hero;
  }

  getVeranlagung() {
    let talent = this.hero.talents.findTalent("veranlagung");
    if (talent) return talent.selected;
    else return false;
  }

  getVeranlagungName() {
    let talent = this.hero.talents.findTalent("veranlagung");
    if (talent.selected) return db.attributs[talent.selected].name;
    else return false;
  }

  getVeranlagungLimits() {
    let volk = db.voelker[this.hero.grundlagen.volk];
    return volk.limits ? volk.limits : Object.keys(db.attributs);
  }

  resetVeranlagung() {
    let talent = this.hero.talents.findTalent("veranlagung");
    if (talent) {
      talent.selected = "";
    }
  }

  setVeranlagung(id) {
    let talent = this.hero.talents.findTalent("veranlagung");
    talent.selected = id;
    this.hero.saveHero();
  }
}
