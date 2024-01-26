import hero from "../../data/hero.js";
import Modal from "../../templates/modal/modal.js";
import DeleteHeroModal from "./deleteHeroModal.js";
import database from "../../database.js";

export default class HerosModal {
  constructor() {
    this.modal = new Modal();
    this.initModal();
    // document.addEventListener("resetAll", () => this.initModal());
  }

  initModal() {
    this.modal.content.innerHTML = `
      <button class="modal__new-hero-btn">Neuer Held</button>`;
    let newHeroBtn = this.modal.content.querySelector(".modal__new-hero-btn");
    newHeroBtn.addEventListener("click", () => this.onNewHeroClick());
    // if (hero.arrayOfHeros.length) {
    //   this.modal.content.appendChild(document.createElement("hr"));
    //   this.addHerosList();
    //   this.addLoadHeroListener();
    //   this.addDeleteHeroListener();
    // }
  }

  // onNewHeroClick() {
  //   hero.newHero();
  //   this.modal.destroyModal();
  //   document.dispatchEvent(new Event("resetAll"));
  // }

  // addHerosList() {
  //   let list = document.createElement("ul");
  //   this.modal.content.appendChild(list);
  //   hero.arrayOfHeros.forEach((el, index) => {
  //     let li = document.createElement("li");
  //     li.setAttribute("data-index", index);
  //     li.innerHTML = `
  //     <button class="modal__load-hero-btn">${(li.innerHTML = el.grundlagen.name
  //       ? (li.innerHTML = el.grundlagen.name)
  //       : "Namenloser Held")}</button>
  //     <button class="modal__delete-hero-btn symbol-btn"><i class="fa-solid fa-x"></i></button>`;
  //     list.appendChild(li);
  //   });
  // }

  // addLoadHeroListener() {
  //   let btns = this.modal.content.querySelectorAll(".modal__load-hero-btn");
  //   btns.forEach((el) => {
  //     el.addEventListener("click", (e) => {
  //       hero.loadHero(e.target.parentElement.attributes["data-index"].value);
  //       this.modal.destroyModal();
  //       document.dispatchEvent(new Event("resetAll"));
  //     });
  //   });
  // }

  // addDeleteHeroListener() {
  //   let btns = this.modal.content.querySelectorAll(".modal__delete-hero-btn");
  //   btns.forEach((el) => {
  //     el.addEventListener("click", (e) => {
  //       this.DeleteHeroModal = new DeleteHeroModal(
  //         el.parentElement.attributes["data-index"].value
  //       );
  //     });
  //   });
  // }
}
