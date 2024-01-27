export default class Section {
  constructor(title, id, plusBtn = false) {
    this.content = document.querySelector(".content");
    this.editToggle = false;
    this.section = this.createSection(title, id, plusBtn);
    this.headerText = this.section.querySelector(".section__header-text");
    this.plusBtn = this.section.querySelector(".section__plus-btn");
    this.contentContainer = this.section.querySelector(".section__content");
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  createSection(title, id, plusBtn) {
    let section = Object.assign(document.createElement("section"), {
      classList: "section",
      innerHTML: `
        <div class="section__header">
          <h1 class="section__header-text">${title}</h1>
          ${this.addPlusBtn(plusBtn)}
        </div>
        <div class="${id}__content section__content"></div>
      `,
    });
    this.content.appendChild(section);
    return section;
  }

  addPlusBtn(plusBtn) {
    return plusBtn
      ? `<button class="section__plus-btn"><i class="fa-solid fa-plus"></i></button>`
      : "";
  }

  onToggleEdit() {
    this.editToggle = !this.editToggle;
  }
}
