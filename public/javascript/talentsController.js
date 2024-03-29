import database from "../data/database.js";

class TalentsController {
  constructor() {
    this.types = [
      ["Allgemein", "allgemein"],
      ["Kampf", "kampf"],
      ["Manöver", "manoever"],
      ["Übernatürlich", "uebernatuerlich"],
      ["Zauber", "zauber"],
    ];
  }

  getDBEntry(key) {
    return database.talents[key];
  }

  heroHasTalents() {
    return database.hero.talents && database.hero.talents.length > 0;
  }

  getHeroTalents() {
    return database.hero.talents ? database.hero.talents : [];
  }

  getUnusedTalents() {
    let unusedTalents = [];
    Object.keys(database.talents).map((el) => {
      this.getTalent(el) ? null : unusedTalents.push(el);
    });
    return unusedTalents;
  }

  getTalentIndex(index) {
    return database.hero.talents[index];
  }

  getTalent(id) {
    if (database.hero.talents) {
      return database.hero.talents.find((el) => el.id === id);
    }
  }

  sort() {
    database.hero.talents.sort((a, b) => a.id - b.id);
  }

  getSum() {
    if (!database.hero.talents) {
      return 0;
    }

    return database.hero.talents.reduce((sum, talent) => {
      return sum + talent.level - (talent.innate ? 1 : 0);
    }, 0);
  }

  addTalent(id, innate = false) {
    if (!database.hero.talents) {
      database.hero.talents = [];
    }
    database.hero.talents.push({
      id: id,
      comment: "",
      level: 1,
      selected: "",
      innate: innate,
    });
    this.sort();
    document.dispatchEvent(new Event("resetTalents"));
    document.dispatchEvent(new Event("updateConditions"));
    database.saveHero();
  }

  plusTalent(index) {
    if (database.hero.talents[index].level >= 5) return;
    database.hero.talents[index].level += 1;
    document.dispatchEvent(new Event("resetTalents"));
    document.dispatchEvent(new Event("updateConditions"));
    database.saveHero();
  }

  minusTalent(index) {
    database.hero.talents[index].level -= 1;
    if (database.hero.talents[index].level <= 0) {
      database.hero.talents.splice(index, 1);
    }
    document.dispatchEvent(new Event("resetTalents"));
    document.dispatchEvent(new Event("resetStates"));
    database.saveHero();
  }

  // // =================================== innate
  removeInnateTalents() {
    if (!database.hero.talents) return;
    database.hero.talents = database.hero.talents.filter((el) => !el.innate);
  }

  addInnateTalents(listOfTalents) {
    this.addTalent("sprache", true);
    listOfTalents.forEach((talent) => {
      if (this.getTalent(talent)) this.getTalent(talent).innate = true;
      else this.addTalent(talent, true);
    });
  }
}

const talentsController = new TalentsController();
export default talentsController;
