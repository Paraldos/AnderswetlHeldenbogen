import database from "../../../data/database.js";
import hero from "../../../data/hero.js";

export default class Money {
  constructor(section) {
    this.section = section;
    this.wrapper = this.createWrapper();
    this.gold = this.createCoin();
    this.silver = this.createCoin();
    this.copper = this.createCoin();
    this.updateCoins();
    this.input = this.createInput();
    this.plusBtn = this.createPlusBtn();
    this.minusBtn = this.createMinusBtn();
    // this.moneyValue = this.container.querySelector(".money__values");
    // this.moneyChange = this.container.querySelector(".money__change");
    // this.moneyPlus = this.container.querySelector(".money__plus-btn");
    // this.moneyMinus = this.container.querySelector(".money__minus-btn");
    // events
    // this.moneyPlus.addEventListener("click", () => this.onMoneyPlusClick());
    // this.moneyMinus.addEventListener("click", () => this.onMoneyMinusClick());
  }

  // ================== init
  createWrapper() {
    let el = document.createElement("div");
    el.classList.add("money");
    this.section.content.appendChild(el);
    return el;
  }

  createCoin() {
    let el = document.createElement("p");
    el.classList.add("money__value");
    this.wrapper.appendChild(el);
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
    this.wrapper.appendChild(el);
    return el;
  }

  createPlusBtn() {
    let el = document.createElement("button");
    el.classList.add("money__plus-btn", "symbol-btn");
    el.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    el.addEventListener("click", () => this.onPlusBtnClick());
    this.wrapper.appendChild(el);
    return el;
  }

  createMinusBtn() {
    let el = document.createElement("button");
    el.classList.add("money__minus-btn", "symbol-btn");
    el.innerHTML = `<i class="fa-solid fa-minus"></i>`;
    el.addEventListener("click", () => this.onMinusBtnClick());
    this.wrapper.appendChild(el);
    return el;
  }

  // ================== events
  onPlusBtnClick() {
    hero.money += parseFloat(this.moneyChange.value);
    this.moneyChange.value = 0;
    hero.saveHero();
    this.moneyValue.innerHTML = this.getMoney();
  }

  onMinusBtnClick() {
    hero.money -= parseFloat(this.moneyChange.value);
    hero.saveHero();
    this.moneyValue.innerHTML = this.getMoney();
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
