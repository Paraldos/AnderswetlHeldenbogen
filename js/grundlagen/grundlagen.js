import Section from "../section/section.js";

export default class Grundlagen {
  constructor() {
    this.section = new Section("Grundlagen");
    this.addName();
  }

  addName() {
    let name = document.createElement("li");
    name.classList.add("grundlagen__name");
    name.innerHTML = "Hello World";
    this.section.contentContainer.appendChild(name);
  }
}
