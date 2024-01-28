import Section from "../../templates/section/section.js";
import SimpleElement from "./simpleElement.js";
import EthnicityElement from "./ethnicityElement.js";
import DescriptionElement from "./descriptionElement.js";

export default class BasicsInformationSection {
  constructor() {
    this.section = new Section("Grundlagen", "basics");
    new SimpleElement(this.section.content, "name");
    new EthnicityElement(this.section.content);
    new SimpleElement(this.section.content, "konzept");
    new SimpleElement(this.section.content, "motive");
    new DescriptionElement(this.section);
  }
}
