import Database from "./database.js";

export default class Hero {
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
    this.refKey = null;
  }

  createBasicInformation() {
    let basicInformation = {};
    for (let el in Database.basicInformation) {
      basicInformation[el] = Database.basicInformation[el];
    }
    return basicInformation;
  }

  createAttributes() {
    let attributes = {};
    for (let el in Database.attributs) {
      attributes[el] = { value: 1 };
    }
    return attributes;
  }

  createSkills() {
    let skills = {};
    for (let el in Database.skills) {
      skills[el] = { value: 0 };
    }
    return skills;
  }

  createConditions() {
    return {
      ap: { max: Database.conditions.ap.min, current: 7 },
      lp: { max: Database.conditions.lp.min, current: 7 },
      sp: { max: Database.conditions.sp.min, current: 3 },
      ep: Database.conditions.ep.min,
      stufe: Database.conditions.stufe.min,
      tempo: Database.conditions.tempo.min,
    };
  }
}
