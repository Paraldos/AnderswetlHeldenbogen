import Section from "../section/section.js";
import BasicElement from "./basicElement.js";
import EthnicityElement from "./ethnicityElement.js";
import DescriptionElement from "./descriptionElement.js";

export default class Basics {
  constructor() {
    this.section = new Section("Grundlagen", "basics");
    new BasicElement(this.section.contentContainer, "name");
    new EthnicityElement(this.section.contentContainer);
    new BasicElement(this.section.contentContainer, "konzept");
    new BasicElement(this.section.contentContainer, "motive");
    new DescriptionElement(this.section);
  }
}
