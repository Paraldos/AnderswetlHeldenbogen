import database from "../data/database.js";

class SkillsController {
  getHeroList() {
    return database.hero.skills ? database.hero.skills : [];
  }

  getHeroSum() {
    let sum = -16;
    for (let key in database.hero.skills) {
      sum += database.hero.skills[key].value;
    }
    return sum;
  }

  getDBEntry(id) {
    return database.skills[id];
  }

  getValue(id) {
    let value = database.hero.skills[id].value;
    return value;
  }

  increase(id, operator = 1) {
    database.hero.skills[id].value += operator;
    if (database.hero.skills[id].value > 5) {
      database.hero.skills[id].value = 5;
    }
    database.saveHero();
    document.dispatchEvent(new Event("updateSkillsHeader"));
  }

  reduce(id, operator = 1) {
    database.hero.skills[id].value -= operator;
    if (database.hero.skills[id].value < 0) {
      database.hero.skills[id].value = 0;
    }
    database.saveHero();
    document.dispatchEvent(new Event("updateSkillsHeader"));
  }
}

let skillsController = new SkillsController();
export default skillsController;
