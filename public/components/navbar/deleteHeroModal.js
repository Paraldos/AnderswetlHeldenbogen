import Modal from "../modal/modal.js";
import database from "../../data/database.js";

export default class DeleteHeroModal {
  constructor(hero) {
    this.hero = hero;
    this.modal = new Modal();
    this.initModal();
    this.yesBtn = this.modal.content.querySelector(".modal__yes-btn");
    this.noBtn = this.modal.content.querySelector(".modal__no-btn");
    this.yesBtn.addEventListener("click", () => this.onYesBtnClick());
    this.noBtn.addEventListener("click", () => this.onNoBtnClick());
  }

  initModal() {
    const modalTxt = this.hero.basicInformation.name.value
      ? `Bist du sicher dass du "${this.hero.basicInformation.name.value}" löschen möchtest?`
      : "Bist du sicher dass du diesen namenlosen Helden löschen möchtest?";
    this.modal.content.innerHTML = `
      <p>${modalTxt}</p>
      <div class="modal__horizontal-list">
        <button class="modal__yes-btn">Ja</button>
        <button class="modal__no-btn">Nein</button>
      </div>`;
  }

  async onYesBtnClick() {
    await database.removeHero(this.hero.refKey);
    document.dispatchEvent(new Event("resetAll"));
    this.modal.destroyModal();
  }

  onNoBtnClick() {
    this.modal.destroyModal();
  }
}
