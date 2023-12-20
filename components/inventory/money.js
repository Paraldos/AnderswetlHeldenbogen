import hero from "../../data/hero.js";

export default class Money {
  constructor(container) {
    this.container = container;
    // init
    this.initMoney();
    this.moneyValue = this.container.querySelector(".inventory__money-value");
    this.moneyChange = this.container.querySelector(".inventory__money-change");
    this.moneyPlus = this.container.querySelector(".inventory__money-plus");
    this.moneyMinus = this.container.querySelector(".inventory__money-minus");
    // events
    this.moneyPlus.addEventListener("click", () => this.onMoneyPlusClick());
    this.moneyMinus.addEventListener("click", () => this.onMoneyMinusClick());
  }

  // ================== events
  onMoneyPlusClick() {
    hero.money += parseFloat(this.moneyChange.value);
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
      classList: "inventory__money",
      innerHTML: `
          <h3>Geld</h3>
          <div></div>
          <div class="inventory__money-value">
            ${this.getMoney()}
          </div>
          <div class="inventory__change-money-container">
            <input class="inventory__money-change" type="number" value="0">
            <button class="inventory__money-minus symbol-btn"><i class="fa-solid fa-minus"></i></button>
            <button class="inventory__money-plus symbol-btn"><i class="fa-solid fa-plus"></i></button>
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
        <p>Gold: ${goldValue}</p>
        <p>Silber: ${silverValue}</p>
        <p>Kupfer: ${copperValue}</p>`;
  }
}
