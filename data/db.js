import grundlagen from "./json/grundlagen.json" assert { type: "json" };
import attributs from "./json/attributs.json" assert { type: "json" };
import voelker from "./json/voelker.json" assert { type: "json" };
import skills from "./json/skills.json" assert { type: "json" };

import talents from "./json/talents.json" assert { type: "json" };
import flaws from "./json/flaws.json" assert { type: "json" };

class DB {
  // Test
  constructor() {
    this.grundlagen = grundlagen;
    this.voelker = voelker;
    this.attributs = attributs;
    this.skills = skills;
    this.talents = talents;
    this.flaws = flaws;
  }

  nameToId(string) {
    let value = string.toLowerCase();
    value = value.replace(/ä/g, "ae");
    value = value.replace(/ö/g, "oe");
    value = value.replace(/ü/g, "ue");
    return value;
  }
}

let db = new DB();
export default db;
