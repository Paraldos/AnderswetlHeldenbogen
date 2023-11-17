export default class Attribute {
  constructor() {
    this.db = [
      new Attribut("staerke", "Stärke", 1, "koerperlich"),
      new Attribut("geschick", "Geschick", 1, "koerperlich"),
      new Attribut("zaehigkeit", "Zähigkeit", 1, "koerperlich"),
      new Attribut("klugheit", "Klugheit", 1, "geistig"),
      new Attribut("charisma", "Charisma", 1, "geistig"),
      new Attribut("weisheit", "Weisheit", 1, "geistig"),
    ];

    this.section = document.querySelector(".attribute");
    this.updateAttribute();
  }

  updateAttribute() {
    this.db.forEach((element) => {
      element.updateHtml();
    });
  }
}

class Attribut {
  constructor(id, name, value, type) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.type = type;
  }

  updateHtml() {
    const attribut = document.querySelector(`.attribute__${this.id}`);
    attribut.innerText = `${this.name}: ${this.value}`;
  }
}
