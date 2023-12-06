export default class SchwaechenController {
  constructor(hero) {
    this.hero = hero;
  }

  findSchwaeche(id) {
    return this.hero.schwaechen.find((el) => el.id === id);
  }

  addSchwaeche(id, volksschwaeche = false) {
    this.hero.schwaechen.push({
      id: id,
      level: 1,
      volksschwaeche: volksschwaeche,
    });
    this.hero.saveHero();
    document.dispatchEvent(new Event("resetSchwaechen"));
  }

  increaseSchwaeche(index) {
    if (this.hero.schwaechen[index].level >= 5) return;
    this.hero.schwaechen[index].level += 1;
    this.hero.saveHero();
    document.dispatchEvent(new Event("resetSchwaechen"));
  }

  decreaseSchwaeche(index) {
    this.hero.schwaechen[index].level -= 1;
    if (this.hero.schwaechen[index].level <= 0) {
      this.hero.schwaechen.splice(index, 1);
    }
    this.hero.saveHero();
    document.dispatchEvent(new Event("resetSchwaechen"));
  }
}
