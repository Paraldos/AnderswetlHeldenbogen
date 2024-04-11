import Modal from "../modal/modal.js";
import SelectTalentModal from "../talents/selectTalentModal.js";
import ListOfFlaws from "../flaws/ListOfFlaws.js";
import toolsController from "../../javascript/toolsController.js";
import consumablesController from "../../javascript/consumablesController.js";

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
            <button class="flaw-btn">Schwäche</button>
            <button class="tool-btn">Werkzeug</button>
            <button class="consumable-btn">Verbrauchsgegenstand</button>
        </ul>
    `;
  }

  onTalentBtn() {
    new SelectTalentModal();
  }

  onFlawBtn() {
    new ListOfFlaws();
  }

  onToolBtn() {
    toolsController.add();
    this.destroyModal();
  }

  onConsumableBtn() {
    consumablesController.add();
    this.destroyModal();
  }
}
