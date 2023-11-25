import attribute from "./attribute.json" assert { type: "json" };
import grundlagen from "./grundlagen.json" assert { type: "json" };

class DB {
  constructor() {
    this.grundlagen = grundlagen;
    this.attribute = attribute;
  }
}

let db = new DB();
export default db;
