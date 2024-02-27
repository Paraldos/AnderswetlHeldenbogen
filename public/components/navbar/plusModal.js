import Modal from "../modal/modal.js";
import ListOfTalents from "../talents/listOfTalents.js";
import ListOfFlaws from "../flaws/ListOfFlaws.js";
import database from "../../data/database.js";
import ConsumablesController from "../../data/ConsumablesController.js";

export default class PlusModal extends Modal {
  constructor() {
    super();
    this.createContent();
    this.talentBtn = this.content.querySelector(".talent-btn");
    this.flawBtn = this.content.querySelector(".flaw-btn");
    this.toolBtn = this.content.querySelector(".tool-btn");
    this.consumableBtn = this.content.querySelector(".consumable-btn");
    this.talentBtn.addEventListener("click", () => this.onTalentBtn());
    this.flawBtn.addEventListener("click", () => this.onFlawBtn());
    this.toolBtn.addEventListener("click", () => this.onToolBtn());
    this.consumableBtn.addEventListener("click", () => this.onConsumableBtn());
  }

  createContent() {
    this.content.innerHTML = `
        <h2>Hinzufügen</h2>
        <ul>
            <button class="">Stufe</button>
            <button class="talent-btn">Talent</button>
            <button class="flaw-btn">Nachteil</button>
            <button class="tool-btn">Werkzeug</button>
            <button class="consumable-btn">Verbrauchsgegenstand</button>
        </ul>
    `;
  }

  onTalentBtn() {
    new ListOfTalents();
  }

  onFlawBtn() {
    new ListOfFlaws();
  }

  onToolBtn() {
    database.addTool();
    this.destroyModal();
  }

  onConsumableBtn() {
    ConsumablesController.add();
    this.destroyModal();
  }
}
