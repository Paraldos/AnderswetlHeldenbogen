import Hero from "./hero.js";
import firebaseConfig from "./firebaseConfig.js";
firebase.initializeApp(firebaseConfig);

class Database {
  constructor() {
    // database
    this.database = firebase.database();
    this.userId = null;
    // infos
    this.basicInformation = null;
    this.voelker = null;
    this.attributs = null;
    this.skills = null;
    this.talents = null;
    this.flaws = null;
    this.conditions = null;
    this.init();
    // heros
    this.hero;
    this.currentHeroRef;
  }

  async init() {
    this.basicInformation = await this.read("/basicInformation");
    this.voelker = await this.read("/voelker");
    this.attributs = await this.read("/attributs");
    this.skills = await this.read("/skills");
    this.talents = await this.read("/talents");
    this.flaws = await this.read("/flaws");
    this.conditions = await this.read("/conditions");
  }

  async write(path, data) {
    this.database.ref(path).set(data);
  }

  async read(path) {
    const snapshot = await this.database.ref(path).once("value");
    return snapshot.val();
  }

  async newHero() {
    this.hero = new Hero();
    const path = `/users/${this.userId}/heroes/`;
    const newHeroRef = this.database.ref(path).push();
    this.hero.refKey = newHeroRef.key;
    await this.saveHero();
  }

  async saveHero() {
    const path = `/users/${this.userId}/heroes/${this.hero.refKey}`;
    this.write(path, this.hero);
  }

  async removeHero(heroRefKey) {
    const path = `/users/${this.userId}/heroes/${heroRefKey}`;
    const heroRef = this.database.ref(path);
    await heroRef.remove();
  }

  async getArrayOfHeros() {
    const path = `/users/${this.userId}/heroes/`;
    const heroes = await this.read(path);
    if (!heroes) {
      return [];
    } else {
      return Object.keys(heroes).map((key) => heroes[key]);
    }
  }

  async loadHero(heroRefKey) {
    const path = `/users/${this.userId}/heroes/${heroRefKey}`;
    this.hero = await this.read(path);
    console.log(this.hero);
  }

  nameToId(string) {
    let value = string.toLowerCase();
    value = value.replace(/ä/g, "ae");
    value = value.replace(/ö/g, "oe");
    value = value.replace(/ü/g, "ue");
    return value;
  }
}

let database = new Database();
export default database;
