import db from "./db.js";
import Talents from "./talents.js";
import Veranlagung from "./veranlagung.js";
import Flaws from "./flaws.js";

class Hero {
  constructor() {
    this.arrayOfHeros = [];
    this.heroIndex = null;
    this.talents = new Talents(this);
    this.veranlagung = new Veranlagung(this);
    this.flaws = new Flaws(this);

    this.getArrayOfHeros();
    this.getHeroIndex();
    this.getStartHero();

    console.log(this.arrayOfHeros[this.heroIndex]);
  }

  getArrayOfHeros() {
    this.arrayOfHeros = localStorage.getItem("andersweltArrayOfHeros")
      ? JSON.parse(localStorage.getItem("andersweltArrayOfHeros"))
      : [];
  }

  getHeroIndex() {
    this.heroIndex = localStorage.getItem("andersweltHeroIndex")
      ? Number(localStorage.getItem("andersweltHeroIndex"))
      : null;
    if (this.heroIndex == null) return;
    if (this.heroIndex > this.arrayOfHeros.length - 1) {
      this.heroIndex = this.arrayOfHeros.length - 1;
    }
    if (this.heroIndex < 0) this.heroIndex = null;
  }

  getStartHero() {
    if (this.heroIndex === null && this.arrayOfHeros.length) {
      this.setHeroIndex(0);
    }
    if (this.heroIndex !== null) {
      this.loadHero(this.heroIndex);
    }
  }

  setArrayOfHeros(array = null) {
    if (array) this.arrayOfHeros = array;
    localStorage.setItem(
      "andersweltArrayOfHeros",
      JSON.stringify(this.arrayOfHeros)
    );
  }

  setHeroIndex(index = false) {
    if (index) this.heroIndex = index;
    if (this.heroIndex < 0) localStorage.removeItem("andersweltHeroIndex");
    else localStorage.setItem("andersweltHeroIndex", this.heroIndex);
  }

  resetHero() {
    this.grundlagen = {};
    for (let el in db.grundlagen) {
      this.grundlagen[el] = "";
    }

    this.attributs = {};
    for (let el in db.attributs) {
      this.attributs[el] = { value: 1 };
    }

    this.skills = {};
    for (let el in db.skills) {
      this.skills[el] = { value: 0 };
    }

    this.talents.value = [];

    this.flaws.value = [];

    this.states = {
      ap: { max: db.states.ap.min, current: 7 },
      lp: { max: db.states.lp.min, current: 7 },
      sp: { max: db.states.sp.min, current: 3 },
      ep: db.states.ep.min,
      stufe: db.states.stufe.min,
      tempo: db.states.tempo.min,
    };

    this.consumables = [];
    this.items = [];
    this.money = 0;
    this.otherInventory = "";
  }

  newHero() {
    this.heroIndex = this.arrayOfHeros.length;
    this.resetHero();
    this.saveHero();
    this.getArrayOfHeros();
  }

  loadHero(index) {
    this.heroIndex = index;
    this.setHeroIndex();
    this.resetHero();
    this.grundlagen = this.arrayOfHeros[index].grundlagen;
    this.attributs = this.arrayOfHeros[index].attributs;
    this.skills = this.arrayOfHeros[index].skills;
    this.talents.value = this.arrayOfHeros[index].talents;
    this.flaws.value = this.arrayOfHeros[index].flaws;
    this.states = this.arrayOfHeros[index].states;
    this.consumables = this.arrayOfHeros[index].consumables;
    this.items = this.arrayOfHeros[index].items;
    this.money = this.arrayOfHeros[index].money;
    this.otherInventory = this.arrayOfHeros[index].otherInventory;
  }

  saveHero() {
    let hero = {
      grundlagen: this.grundlagen,
      attributs: this.attributs,
      skills: this.skills,
      talents: this.talents.value,
      flaws: this.flaws.value,
      states: this.states,
      consumables: this.consumables,
      items: this.items,
      money: this.money,
      otherInventory: this.otherInventory,
    };
    this.arrayOfHeros[this.heroIndex] = hero;
    this.setHeroIndex();
    this.setArrayOfHeros();
  }

  removeHero(index) {
    this.arrayOfHeros.splice(index, 1);
    this.setArrayOfHeros();
    this.getHeroIndex();
    this.getStartHero();
  }

  changeEthnicity(id) {
    // basics
    this.grundlagen.volk = id;
    // talents
    this.talents.removeInnateTalents();
    this.talents.addInnateTalents(db.voelker[id]);
    this.veranlagung.resetVeranlagung();
    // flaws
    this.flaws.removeInnateFlaws();
    this.flaws.addInnateFlaws(db.voelker[id]);
    // update
    this.saveHero();
    document.dispatchEvent(new Event("resetAttributs"));
    document.dispatchEvent(new Event("updateEthnecity"));
    document.dispatchEvent(new Event("resetTalents"));
  }
}

let hero = new Hero();
export default hero;
