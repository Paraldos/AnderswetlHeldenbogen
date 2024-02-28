import database from "../data/database.js";
import veranlagung from "../data/veranlagung.js";

class AttributsController {
  getHeroList() {
    return database.hero.attributs ? database.hero.attributs : [];
  }

  getHeroSum() {
    let sum = -12;
    for (let key in database.hero.attributs) {
      sum += database.hero.attributs[key].value;
    }
    return sum;
  }

  getDBEntry(id) {
    return database.attributs[id];
  }

  getValue(id) {
    let value = database.hero.attributs[id].value;
    if (veranlagung.getSelectedAttribut() == id) {
      value += 1;
    }
    return value;
  }

  increase(id, operator = 1) {
    database.hero.attributs[id].value += operator;
    if (database.hero.attributs[id].value > 5) {
      database.hero.attributs[id].value = 5;
    }
    database.saveHero();
    document.dispatchEvent(new Event("resetAttributs"));
    document.dispatchEvent(new Event("updateAttributsHeader"));
  }

  reduce(id, operator = 1) {
    database.hero.attributs[id].value -= operator;
    if (database.hero.attributs[id].value < 1) {
      database.hero.attributs[id].value = 1;
    }
    database.saveHero();
    document.dispatchEvent(new Event("resetAttributs"));
    document.dispatchEvent(new Event("updateAttributsHeader"));
  }
}

let attributsController = new AttributsController();
export default attributsController;
