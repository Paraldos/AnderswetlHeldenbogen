import Hero from "./hero.js";
import firebaseConfig from "./firebaseConfig.js";
import talents from "./talents.js";
import flaws from "./flaws.js";
firebase.initializeApp(firebaseConfig);

class Database {
  constructor() {
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
    // heros
    this.hero;
  }

  changeEthnicity(newEthnicity) {
    this.hero.basicInformation.volk.value = newEthnicity;
    // talents
    talents.removeInnateTalents();
    if (newEthnicity && this.voelker[newEthnicity].talents) {
      talents.addInnateTalents(this.voelker[newEthnicity].talents);
    }
    // flaws
    flaws.removeInnateFlaws();
    if (newEthnicity && this.voelker[newEthnicity].flaws) {
      flaws.addInnateFlaws(this.voelker[newEthnicity].flaws);
    }
    // events
    document.dispatchEvent(new Event("resetFlaws"));
    document.dispatchEvent(new Event("resetTalents"));
    document.dispatchEvent(new Event("updateEthnecity"));
    // save
    this.saveHero();
  }

  async init() {
    const paths = {
      basicInformation: "/basicInformation",
      voelker: "/voelker",
      attributs: "/attributs",
      skills: "/skills",
      talents: "/talents",
      flaws: "/flaws",
      conditions: "/conditions",
    };

    const results = await Promise.all(
      Object.values(paths).map((path) => this.read(path))
    );

    Object.keys(paths).forEach((key, i) => {
      this[key] = results[i];
    });
  }

  async setUser(userId) {
    this.userId = userId;
    const path = `/users/${userId}/lastUsedHero`;
    const lastUsedHero = await this.read(path);
    if (lastUsedHero) {
      if (await this.read(`/users/${this.userId}/heroes/${lastUsedHero}`)) {
        await this.loadHero(lastUsedHero);
      }
    }
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
    this.write(`/users/${this.userId}/lastUsedHero`, this.hero.refKey);
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
    this.write(`/users/${this.userId}/lastUsedHero`, this.hero.refKey);
  }

  nameToId(string) {
    let value = string.toLowerCase();
    value = value.replace(/ä/g, "ae");
    value = value.replace(/ö/g, "oe");
    value = value.replace(/ü/g, "ue");
    return value;
  }

  addTool() {
    if (!this.hero.items) this.hero.items = [];
    this.hero.items.push({ name: "", description: "", bonus: 0, pool: 0 });
    this.saveHero();
    document.dispatchEvent(new Event("resetItems"));
  }

  removeTool(index) {
    this.hero.items.splice(index, 1);
    this.saveHero();
    document.dispatchEvent(new Event("resetItems"));
  }
}

let database = new Database();
export default database;
