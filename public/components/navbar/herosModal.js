import Modal from "../modal/modal.js";
import database from "../../data/database.js";
import DeleteHeroModal from "./deleteHeroModal.js";

export default class HerosModal {
  constructor() {
    this.modal = new Modal();
    this.initModal();
    document.addEventListener("resetAll", () => this.initModal());
  }

  initModal() {
    this.modal.content.innerHTML = "";
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

  async onNewHeroClick() {
    await database.newHero();
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
    listItem.appendChild(this.createLoadHeroBtn(hero));
    listItem.appendChild(this.createDeleteBtn(hero));
    return listItem;
  }

  createLoadHeroBtn(hero) {
    let loadHeroBtn = document.createElement("button");
    loadHeroBtn.className = "modal__load-hero-btn";
    loadHeroBtn.innerHTML = hero.basicInformation.name.value
      ? hero.basicInformation.name.value
      : "Namenloser Held";
    loadHeroBtn.addEventListener("click", (e) => this.onLoadHeroBtnClick(hero));
    return loadHeroBtn;
  }

  async onLoadHeroBtnClick(hero) {
    await database.loadHero(hero.refKey);
    this.modal.destroyModal();
    document.dispatchEvent(new Event("resetAll"));
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
}
