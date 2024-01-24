let modals = [];

document.addEventListener("keydown", (e) => {
  if (e.key != "Escape") return;
  if (modals.length < 1) return;
  modals[modals.length - 1].dispatchEvent(
    new Event("escape", { bubbles: true })
  );
});

export default class Modal {
  constructor() {
    this.body = document.body;
    this.modal = this.createModal();
    this.box = this.modal.querySelector(".modal__box");
    this.xBtn = this.modal.querySelector(".modal__x-btn");
    this.background = this.modal.querySelector(".modal__background");
    this.content = this.modal.querySelector(".modal__content");
    modals.push(this.modal);

    setTimeout(() => {
      this.modal.classList.add("modal__fade-in");
    }, 50);

    this.background.addEventListener("click", () => this.destroyModal());
    this.xBtn.addEventListener("click", () => this.destroyModal());
    this.modal.addEventListener("escape", () => this.destroyModal());
    this.addOverflow();
  }

  createModal() {
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
    <div class="modal__background"></div>
    <div class="modal__box">
        <div class="modal__x-btn"><i class="fa-solid fa-x"></i></div>
        <div class="modal__content"></div>
    </div>
    `;
    this.body.appendChild(modal);
    return modal;
  }

  addOverflow() {
    this.body.classList.add("overflow-hidden");
  }

  destroyModal() {
    let modal = modals.pop();
    this.modal.classList.remove("modal__fade-in");
    setTimeout(() => {
      if (modals.length <= 0) this.body.classList.remove("overflow-hidden");
      modal.remove();
    }, 200);
  }
}
