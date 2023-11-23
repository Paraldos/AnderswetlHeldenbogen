export default class Attribut {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.id = this.transformeNameIntoId(name);
    // html
    this.container = document.querySelector(".attribute__content");
    this.template = document.querySelector(".template__attribut");
    this.createHtmlElement();
  }

  createHtmlElement() {
    const clone = this.template.content.cloneNode(true).querySelector("li");
    clone.classList.add(`attribute__${this.id}`);
    clone.querySelector("p").innerText = `${this.name}: ${this.value}`;
    this.container.appendChild(clone);
  }

  transformeNameIntoId(string) {
    let value = string.toLowerCase();
    value = value.replace(/ä/g, "ae");
    value = value.replace(/ö/g, "oe");
    value = value.replace(/ü/g, "ue");
    return value;
  }
}
