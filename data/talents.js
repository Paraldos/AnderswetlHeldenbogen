export default class Talents {
  constructor(hero) {
    this.hero = hero;
    this.value = [];
  }

  // =================================== basics
  findTalent(id) {
    return this.value.find((el) => el.id === id);
  }

  getSum() {
    return this.value.reduce((acc, el) => acc + el.level, 0);
  }

  addTalent(id, innate = false) {
    this.value.push({
      id: id,
      comment: "",
      level: 1,
      selected: "",
      innate: innate,
    });
    document.dispatchEvent(new Event("resetTalents"));
    document.dispatchEvent(new Event("resetStates"));
    this.hero.saveHero();
  }

  increaseTalent(index) {
    if (this.value[index].level >= 5) return;
    this.value[index].level += 1;
    document.dispatchEvent(new Event("resetTalents"));
    document.dispatchEvent(new Event("resetStates"));
    this.hero.saveHero();
  }

  decreaseTalent(index) {
    this.value[index].level -= 1;
    if (this.value[index].level <= 0) {
      this.value.splice(index, 1);
    }
    document.dispatchEvent(new Event("resetTalents"));
    document.dispatchEvent(new Event("resetStates"));
    this.hero.saveHero();
  }

  // =================================== innate
  removeInnateTalents() {
    this.value = this.value.filter((el) => !el.innate);
  }

  addInnateTalents(dbEntry) {
    if (dbEntry === undefined) return;
    let talents = dbEntry.talents ? dbEntry.talents.split("\n") : [];
    talents.forEach((id) => {
      if (this.findTalent(id)) this.findTalent(id).innate = true;
      else this.addTalent(id, true);
    });
  }
}
