import database from "./database.js";

class Talents {
  getUnusedTalents() {
    let unusedTalents = [];
    Object.keys(database.talents).map((el) => {
      this.findTalent(el) ? null : unusedTalents.push(el);
    });
    return unusedTalents;
  }

  findTalent(id) {
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
  // removeInnateTalents() {
  //   this.value = this.value.filter((el) => !el.innate);
  // }

  // addInnateTalents(dbEntry) {
  //   this.addTalent("sprache", true);
  //   if (dbEntry === undefined) return;
  //   dbEntry.talents.forEach((id) => {
  //     if (this.findTalent(id)) this.findTalent(id).innate = true;
  //     else this.addTalent(id, true);
  //   });
  // }
}

const talents = new Talents();
export default talents;
