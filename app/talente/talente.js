import Section from "../section/section.js";
import db from "../db/db.js";
import Talent from "./talent.js";

export default class Talente {
  constructor() {
    this.section = new Section("Talente");
    db.heroTalente.forEach((el, index) => new Talent(el.key, index));
  }
}
