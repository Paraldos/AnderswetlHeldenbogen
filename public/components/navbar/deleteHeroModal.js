import hero from "../../data/hero.js";
import Modal from "../../templates/modal/modal.js";

export default class DeleteHeroModal {
  constructor(index) {
    this.index = index;
    this.addModal();
  }

  addModal() {
    let modal = new Modal();
    modal.content.innerHTML = `
        <div class="delete-hero-modal">
            <p>Bist du sicher dass du den Helden "${
              hero.arrayOfHeros[this.index].grundlagen.name
            }" permanent löschen möchtest?</p>
            <div class="delete-hero-modal__btns">
                <button class="delete-hero-modal__yes-btn">Ja</button>
                <button class="delete-hero-modal__no-btn">Nein</button>
            </div>
        </div>`;

    let yesBtn = modal.content.querySelector(".delete-hero-modal__yes-btn");
    yesBtn.addEventListener("click", () => {
      hero.removeHero(this.index);
      document.dispatchEvent(new Event("resetAll"));
      modal.destroyModal();
    });

    let noBtn = modal.content.querySelector(".delete-hero-modal__no-btn");
    noBtn.addEventListener("click", () => modal.destroyModal());
  }
}
