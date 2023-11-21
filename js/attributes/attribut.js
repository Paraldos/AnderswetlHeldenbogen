export default class Attribut {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.id = this.transformeNameIntoId(name);

    this.htmlElement = document.querySelector(`.attribute__${this.id}`);

    this.updateHtml();
  }

  transformeNameIntoId(string) {
    let value = string.toLowerCase();
    value = value.replace(/ä/g, "ae");
    value = value.replace(/ö/g, "oe");
    value = value.replace(/ü/g, "ue");
    return value;
  }

  updateHtml() {
    this.htmlElement.innerText = `${this.name}: ${this.value}`;
  }
}
