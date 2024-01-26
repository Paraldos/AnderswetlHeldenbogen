import hero from "../../data/hero.js";
import Modal from "../../templates/modal/modal.js";
import database from "../../data/database.js";
import DeleteHeroModal from "./deleteHeroModal.js";

export default class HerosModal {
  constructor() {
    this.modal = new Modal();
    this.initModal();
    document.addEventListener("resetAll", () => this.initModal());
  }

  initModal() {
    this.addNewHeroBtn();
    this.createHeroList();
  }

  // new hero
  addNewHeroBtn() {
    this.modal.content.innerHTML = `
    <button class="modal__new-hero-btn">Neuer Held</button>`;
    let newHeroBtn = this.modal.content.querySelector(".modal__new-hero-btn");
    newHeroBtn.addEventListener("click", () => this.onNewHeroClick());
  }

  onNewHeroClick() {
    database.newHero();
    this.modal.destroyModal();
    document.dispatchEvent(new Event("resetAll"));
  }

  // heros list
  createHeroList() {
    database.getArrayOfHeros().then((arrayOfHeros) => {
      if (!arrayOfHeros.length) return;
      // seperator
      this.modal.content.appendChild(document.createElement("hr"));
      // list
      let list = document.createElement("ul");
      this.modal.content.appendChild(list);
      for (let hero of arrayOfHeros) {
        list.appendChild(this.createHeroListItem(hero));
      }
    });
  }

  createHeroListItem(hero) {
    let listItem = document.createElement("li");
    listItem.setAttribute("data-hero-ref", hero.refKey);
    listItem.appendChild(this.createHeroBtn(hero));
    listItem.appendChild(this.createDeleteBtn(hero));
    return listItem;
  }

  createHeroBtn(hero) {
    let heroBtn = document.createElement("button");
    heroBtn.className = "modal__load-hero-btn";
    heroBtn.innerHTML = hero.basicInformation.name
      ? hero.basicInformation.name
      : "Namenloser Held";
    heroBtn.addEventListener("click", (e) => this.onHeroBtnClick());
    return heroBtn;
  }

  onHeroBtnClick() {
    console.log("load hero");
  }

  createDeleteBtn(hero) {
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "modal__delete-hero-btn symbol-btn";
    deleteBtn.innerHTML = '<i class="fa-solid fa-x"></i>';
    deleteBtn.addEventListener("click", (e) => this.onDeleteBtnClick(hero));
    return deleteBtn;
  }

  onDeleteBtnClick(hero) {
    new DeleteHeroModal(hero);
  }

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
