import Section from "../section/section.js";
import SimpleElement from "./simpleElement.js";
import EthnicityElement from "./ethnicityElement.js";
import DescriptionElement from "./descriptionElement.js";

export default class BasicsInformationSection extends Section {
  constructor() {
    super("Grundlagen", "basics");
    new SimpleElement(this.content, "name");
    new EthnicityElement(this.content);
    new SimpleElement(this.content, "konzept");
    new SimpleElement(this.content, "motive");
    new DescriptionElement(this.content);
  }
}
