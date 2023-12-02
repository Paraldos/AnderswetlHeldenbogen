import db from "../db/db.js";

class Hero {
  constructor() {
    this.grundlagen = {};
    this.attribute = [];
    this.fertigkeiten = [];

    for (let el in db.grundlagen) {
      this.grundlagen[el] = "";
    }
  }
}

let hero = new Hero();
export default hero;
