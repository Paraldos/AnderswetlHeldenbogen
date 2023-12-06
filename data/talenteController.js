export default class TalenteController {
  constructor(hero) {
    this.hero = hero;
  }

  findTalent(id) {
    return this.hero.talente.find((el) => el.id === id);
  }

  addTalent(id, volkstalent = false) {
    this.hero.talente.push({
      id: id,
      comment: "",
      level: 1,
      selected: "",
      volkstalent: volkstalent,
    });
    this.hero.saveHero();
    document.dispatchEvent(new Event("resetTalents"));
  }

  increaseTalent(index) {
    if (this.hero.talente[index].level >= 5) return;
    this.hero.talente[index].level += 1;
    this.hero.saveHero();
    document.dispatchEvent(new Event("resetTalents"));
  }

  decreaseTalent(index) {
    this.hero.talente[index].level -= 1;
    if (this.hero.talente[index].level <= 0) {
      this.hero.talente.splice(index, 1);
    }
    this.hero.saveHero();
    document.dispatchEvent(new Event("resetTalents"));
  }
}
