import database from "../data/database.js";

class MoneyController {
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

  addMoney(value) {
    let parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      console.error("Invalid value: " + value);
      return;
    }
    database.hero.money += parsedValue;
    database.saveHero();
  }

  removeMoney(value) {
    let parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      console.error("Invalid value: " + value);
      return;
    }
    database.hero.money -= parsedValue;
    if (database.hero.money < 0) {
      database.hero.money = 0;
    }
    database.saveHero();
  }
}

let moneyController = new MoneyController();
export default moneyController;
