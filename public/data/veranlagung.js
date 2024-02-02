import database from "./database.js";
import talents from "./talents.js";

class Veranlagung {
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
    let talent = talents.findTalent("veranlagung");
    talent.selected = id;
  }
}

const veranlagung = new Veranlagung();
export default veranlagung;
