import hero from "./hero.js";
import db from "../db/db.js";
import talentController from "./talentController.js";

class VolkController {
  constructor() {}

  changeVolk(id) {
    this.removeVolkstalente();
    hero.grundlagen.volk = id;
    this.addVolkstalente();
    hero.saveHero();
    document.dispatchEvent(new Event("updateMainBtn"));
    document.dispatchEvent(new Event("resetTalents"));
  }

  removeVolkstalente() {
    hero.talente = hero.talente.filter((el) => !el.volkstalent);
  }

  addVolkstalente() {
    let dbEntry = db.voelker[hero.grundlagen.volk];
    if (!dbEntry) return;
    let volkstalente = dbEntry.talente ? dbEntry.talente.split("\n") : [];
    volkstalente.forEach((id) => {
      if (talentController.findTalent(id))
        talentController.findTalent(id).volkstalent = true;
      else talentController.addTalent(id, true);
    });
  }
}

let volkController = new VolkController();
export default volkController;
