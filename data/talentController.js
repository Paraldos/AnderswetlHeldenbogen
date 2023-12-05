import hero from "./hero.js";
import db from "./db.js";

class TalentController {
  constructor() {}

  findTalent(id) {
    return hero.talente.find((el) => el.id === id);
  }

  addTalent(id, volkstalent = false) {
    hero.talente.push({
      id: id,
      comment: "",
      level: 1,
      selected: "",
      volkstalent: volkstalent,
    });
    hero.saveHero();
    document.dispatchEvent(new Event("resetTalents"));
  }

  increaseTalent(index) {
    if (hero.talente[index].level >= 5) return;
    hero.talente[index].level += 1;
    hero.saveHero();
    document.dispatchEvent(new Event("resetTalents"));
  }

  decreaseTalent(index) {
    hero.talente[index].level -= 1;
    if (hero.talente[index].level <= 0) {
      hero.talente.splice(index, 1);
    }
    hero.saveHero();
    document.dispatchEvent(new Event("resetTalents"));
  }
}

let talentController = new TalentController();
export default talentController;
