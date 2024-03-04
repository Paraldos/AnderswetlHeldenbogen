import moneyController from "../../../javascript/moneyController.js";

export default class Money {
  constructor(section) {
    this.section = section;
    this.money = this.createMoney();
    this.gold = this.money.querySelector(".money__gold");
    this.silver = this.money.querySelector(".money__silver");
    this.copper = this.money.querySelector(".money__copper");
    this.input = this.money.querySelector(".money__input");
    this.plusBtn = this.money.querySelector(".money__plus-btn");
    this.minusBtn = this.money.querySelector(".money__minus-btn");
    this.updateCoins();
    this.plusBtn.addEventListener("click", this.onPlusBtnClick.bind(this));
    this.minusBtn.addEventListener("click", this.onMinusBtnClick.bind(this));
  }

  createMoney() {
    let element = document.createElement("div");
    element.className = "money";
    element.innerHTML = `
      <div class="money__first-row">
        <p class="money__gold">Gold: 0</p>
        <p class="money__silver">Silber: 0</p>
        <p class="money__copper">Kupfer: 0</p>
      </div>
      <div class="money__second-row">
        <input class="money__input" type="number" value="0">
        <button class="money__btn money__minus-btn symbol-btn"><i class="fa-solid fa-minus"></i></button>
        <button class="money__btn money__plus-btn symbol-btn"><i class="fa-solid fa-plus"></i></button>
      </div>
    `;
    this.section.content.appendChild(element);
    return element;
  }

  onPlusBtnClick() {
    moneyController.addMoney(this.input.value);
    this.input.value = 0;
    this.updateCoins();
  }

  onMinusBtnClick() {
    moneyController.removeMoney(this.input.value);
    this.input.value = 0;
    this.updateCoins();
  }

  updateCoins() {
    let coins = moneyController.getCoins();
    this.gold.innerHTML = `Gold: ${coins.gold}`;
    this.silver.innerHTML = `Silber: ${coins.silver}`;
    this.copper.innerHTML = `Kupfer: ${coins.copper}`;
  }
}
