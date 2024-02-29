import talents from "../data/talents.js";

class VeranlagungsController {
  getSelectedAttribut() {
    let talent = talents.findTalent("veranlagung");
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
    this.dispatchEvents();
  }

  setVeranlagung(id) {
    let talent = talents.findTalent("veranlagung");
    talent.selected = id;
    this.dispatchEvents();
  }

  dispatchEvents() {
    document.dispatchEvent(new Event("resetAbilities"));
    document.dispatchEvent(new Event("updateAttributsHeader"));
    document.dispatchEvent(new Event("resetFlaws"));
    document.dispatchEvent(new Event("resetTalents"));
  }
}

const veranlagungsController = new VeranlagungsController();
export default veranlagungsController;