import grundlagen from "./json/grundlagen.json" assert { type: "json" };
import voelker from "./json/voelker.json" assert { type: "json" };
import attributs from "./json/attributs.json" assert { type: "json" };
import skills from "./json/skills.json" assert { type: "json" };
import talents from "./json/talents.json" assert { type: "json" };
import flaws from "./json/flaws.json" assert { type: "json" };
import states from "./json/states.json" assert { type: "json" };
import firebaseConfig from "../firebaseConfig.js";
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
    const newHeroRef = this.database
      .ref("users/" + this.userId + "/heroes")
      .push();
    this.hero.refKey = newHeroRef.key;
    await this.saveHero();
  }

  async saveHero() {
    this.write(
      "/users/" + this.userId + "/heroes/" + this.hero.refKey,
      this.hero
    );
  }

  async removeHero(heroRefKey) {
    const heroRef = this.database.ref(
      "users/" + this.userId + "/heroes/" + heroRefKey
    );
    await heroRef.remove();
  }

  async getArrayOfHeros() {
    const snapshot = await this.database
      .ref("users/" + this.userId + "/heroes")
      .once("value");
    const heroes = snapshot.val();
    if (!heroes) {
      return [];
    } else {
      const heroesArray = Object.keys(heroes).map((key) => heroes[key]);
      return heroesArray;
    }
  }
}

class Hero {
  constructor() {
    this.basicInformation = this.createBasicInformation();
    this.attributs = this.createAttributes();
    this.skills = this.createSkills();
    this.talents = [];
    this.flaws = [];
    this.conditions = this.createConditions();
    this.consumables = [];
    this.items = [];
    this.money = 0;
    this.otherInventory = "";
  }

  createBasicInformation() {
    let basicInformation = {};
    for (let el in database.basicInformation) {
      basicInformation[el] = "";
    }
    return basicInformation;
  }

  createAttributes() {
    let attributes = {};
    for (let el in database.attributs) {
      attributes[el] = { value: 1 };
    }
    return attributes;
  }

  createSkills() {
    let skills = {};
    for (let el in database.skills) {
      skills[el] = { value: 0 };
    }
    return skills;
  }

  createConditions() {
    console.log(database.conditions);
    return {
      ap: { max: database.conditions.ap.min, current: 7 },
      lp: { max: database.conditions.lp.min, current: 7 },
      sp: { max: database.conditions.sp.min, current: 3 },
      ep: database.conditions.ep.min,
      stufe: database.conditions.stufe.min,
      tempo: database.conditions.tempo.min,
    };
  }
}

let database = new Database();
export default database;
