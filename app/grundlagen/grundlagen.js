import Section from "../section/section.js";
import BasicElement from "./basicElement.js";
import db from "../db/db.js";

export default class Grundlagen {
  constructor() {
    this.section = new Section("Grundlagen");
    this.nameElement = new BasicElement(this.section, "name");
    this.nameElement = new BasicElement(this.section, "titel");
    this.nameElement = new BasicElement(this.section, "herkunft");
  }
}
