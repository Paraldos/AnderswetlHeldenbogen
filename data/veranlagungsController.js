import db from "./db.js";

export default class VeranlagungsController {
  constructor(hero) {
    this.hero = hero;
  }

  getVeranlagung() {
    let talent = this.hero.talenteController.findTalent("veranlagung");
    if (talent) return talent.selected;
    else return false;
  }

  getVeranlagungName() {
    let talent = this.hero.talenteController.findTalent("veranlagung");
    if (talent.selected) return db.attribute[talent.selected].name;
    else return false;
  }

  getVeranlagungLimits() {
    let volk = db.voelker[this.hero.grundlagen.volk];
    if (volk.limits) {
      return volk.limits.split("\n");
    } else {
      return Object.keys(db.attribute);
    }
  }

  setVeranlagung(id) {
    let talent = this.hero.talenteController.findTalent("veranlagung");
    talent.selected = id;
    this.hero.saveHero();
  }
}
