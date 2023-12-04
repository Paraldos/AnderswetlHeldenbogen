import hero from "./hero.js";
import db from "../db/db.js";
import talentController from "./talentController.js";

class VeranlagungController {
  constructor() {}

  getVeranlagungLimits() {
    let volk = db.voelker[hero.grundlagen.volk];
    if (volk.limits) {
      return volk.limits.split("\n");
    } else {
      return Object.keys(db.attribute);
    }
  }

  setVeranlagung(id) {
    let talent = talentController.findTalent("veranlagung");
    talent.selected = id;
    hero.saveHero();
  }
}

let veranlagungController = new VeranlagungController();
export default veranlagungController;
