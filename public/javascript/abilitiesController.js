import database from "../data/database.js";
import veranlagungsController from "./veranlagungsController.js";
import moneyController from "./moneyController.js";

class AbilitiesController {
  getHeroList(abilityType) {
    return database.hero[abilityType] ? database.hero[abilityType] : [];
  }

  getHeroSum(abilityType) {
    const startValue = abilityType === "attributs" ? 12 : 16;
    let sum = 0 - startValue;
    Object.keys(database.hero[abilityType]).forEach((key) => {
      sum += database.hero[abilityType][key].value;
    });
    return sum;
  }

  getDBEntry(key) {
    return database.attributs[key]
      ? database.attributs[key]
      : database.skills[key];
  }

  getDisplayValue(key) {
    const abilityType = this.getAbilityType(key);
    let value = database.hero[abilityType][key].value;
    if (veranlagungsController.getSelectedAttribut() == key) {
      value += 1;
    }
    return value;
  }

  getAbilityType(key) {
    return database.attributs[key] ? "attributs" : "skills";
  }

  increase(key) {
    const abilityType = this.getAbilityType(key);
    const dbEntry = database.hero[abilityType][key];
    dbEntry.value++;
    if (dbEntry.value > 5) {
      dbEntry.value = 5;
    }
    database.saveHero();
    document.dispatchEvent(new Event("updateAbilitiesHeader"));
  }

  reduce(key) {
    const abilityType = this.getAbilityType(key);
    const dbEntry = database.hero[abilityType][key];
    const minvalue = abilityType === "attributs" ? 1 : 0;
    dbEntry.value--;
    if (dbEntry.value < 1) {
      dbEntry.value = minvalue;
    }
    database.saveHero();
    document.dispatchEvent(new Event("updateAbilitiesHeader"));
  }
}

let abilitiesController = new AbilitiesController();
export default abilitiesController;
