import hero from "../../../data/hero.js";

export default class Money {
  constructor(container) {
    this.container = container;
    // init
    this.initMoney();
    this.moneyValue = this.container.querySelector(".money__values");
    this.moneyChange = this.container.querySelector(".money__change");
    this.moneyPlus = this.container.querySelector(".money__plus-btn");
    this.moneyMinus = this.container.querySelector(".money__minus-btn");
    // events
    this.moneyPlus.addEventListener("click", () => this.onMoneyPlusClick());
    this.moneyMinus.addEventListener("click", () => this.onMoneyMinusClick());
  }

  // ================== events
  onMoneyPlusClick() {
    hero.money += parseFloat(this.moneyChange.value);
    this.moneyChange.value = 0;
    hero.saveHero();
    this.moneyValue.innerHTML = this.getMoney();
  }

  onMoneyMinusClick() {
    hero.money -= parseFloat(this.moneyChange.value);
    hero.saveHero();
    this.moneyValue.innerHTML = this.getMoney();
  }

  // ================== init
  initMoney(container) {
    let money = Object.assign(document.createElement("div"), {
      classList: "money",
      innerHTML: `
        <div class="money__values">
          ${this.getMoney()}
        </div>
        <div class="money__change-container">
          <input class="money__change" type="number" value="0">
          <button class="money__minus-btn symbol-btn"><i class="fa-solid fa-minus"></i></button>
          <button class="money__plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>
        </div>`,
    });
    this.container.appendChild(money);
  }

  // ================== helper
  getMoney() {
    let money = hero.money;
    let goldValue = Math.floor(money / 100);
    money %= 100;
    let silverValue = Math.floor(money / 10);
    money %= 10;
    let copperValue = money;

    return `
      <p class="money__value">Gold: ${goldValue}</p>
      <p class="money__value">Silber: ${silverValue}</p>
      <p class="money__value">Kupfer: ${copperValue}</p>`;
  }
}
