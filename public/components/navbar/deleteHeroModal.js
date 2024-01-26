import Modal from "../../templates/modal/modal.js";
import database from "../../data/database.js";

export default class DeleteHeroModal {
  constructor(hero) {
    this.hero = hero;
    this.modal = new Modal();
    this.initModal();
    this.yesBtn = this.modal.content.querySelector(
      ".delete-hero-modal__yes-btn"
    );
    this.noBtn = this.modal.content.querySelector(".delete-hero-modal__no-btn");
    this.yesBtn.addEventListener("click", () => this.onYesBtnClick());
    this.noBtn.addEventListener("click", () => this.onNoBtnClick());
  }

  initModal() {
    const modalTxt = this.hero.basicInformation.name
      ? `Bist du sicher dass du "${this.hero.basicInformation.name}" löschen möchtest?`
      : "Bist du sicher dass du diesen namenlosen Helden löschen möchtest?";
    this.modal.content.innerHTML = `
      <p>${modalTxt}</p>
      <div class="btn-list--horizontal">
          <button class="delete-hero-modal__yes-btn">Ja</button>
          <button class="delete-hero-modal__no-btn">Nein</button>
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
