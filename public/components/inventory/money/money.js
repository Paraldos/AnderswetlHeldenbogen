import database from "../../../data/database.js";

export default class Money {
  constructor(section) {
    this.section = section;
    this.wrapper = this.createWrapper();
    this.firstRow = this.createRow("first-row");
    this.secondRow = this.createRow("second-row");
    this.gold = this.createCoin();
    this.silver = this.createCoin();
    this.copper = this.createCoin();
    this.updateCoins();
    this.input = this.createInput();
    this.plusBtn = this.createPlusBtn();
    this.minusBtn = this.createMinusBtn();
  }

  // ================== init
  createWrapper() {
    let el = document.createElement("div");
    el.classList.add(`money`);
    this.section.content.appendChild(el);
    return el;
  }

  createRow(name) {
    let el = document.createElement("div");
    el.classList.add(`money__${name}`);
    this.wrapper.appendChild(el);
    return el;
  }

  createCoin() {
    let el = document.createElement("p");
    el.classList.add("money__value");
    this.firstRow.appendChild(el);
    return el;
  }

  updateCoins() {
    let coins = this.getCoins();
    this.gold.innerHTML = `Gold: ${coins.gold}`;
    this.silver.innerHTML = `Silber: ${coins.silver}`;
    this.copper.innerHTML = `Kupfer: ${coins.copper}`;
  }

  createInput() {
    let el = document.createElement("input");
    el.classList.add("money__input");
    el.type = "number";
    el.value = 0;
    this.secondRow.appendChild(el);
    return el;
  }

  createPlusBtn() {
    let el = document.createElement("button");
    el.classList.add("money__btn", "money__plus-btn", "symbol-btn");
    el.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    el.addEventListener("click", () => this.onPlusBtnClick());
    this.secondRow.appendChild(el);
    return el;
  }

  createMinusBtn() {
    let el = document.createElement("button");
    el.classList.add("money__btn", "money__minus-btn", "symbol-btn");
    el.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    el.addEventListener("click", () => this.onMinusBtnClick());
    this.secondRow.appendChild(el);
    return el;
  }

  // ================== events
  onPlusBtnClick() {
    database.hero.money += parseFloat(this.input.value);
    database.saveHero();
    this.input.value = 0;
    this.updateCoins();
  }

  onMinusBtnClick() {
    database.hero.money -= parseFloat(this.input.value);
    if (database.hero.money < 0) {
      database.hero.money = 0;
    }
    database.saveHero();
    this.input.value = 0;
    this.updateCoins();
  }

  // ================== helper
  getCoins() {
    let money = database.hero.money;
    let coins = {};
    coins.gold = Math.floor(money / 100);
    money %= 100;
    coins.silver = Math.floor(money / 10);
    money %= 10;
    coins.copper = money;
    return coins;
  }
}
