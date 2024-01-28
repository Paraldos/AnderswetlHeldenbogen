export default class Section {
  constructor(title, id, plusBtn = false) {
    this.characterSheet = document.querySelector(".characterSheet");
    this.section = this.createSection();
    this.header = this.createHeader(title, plusBtn);
    this.plusBtn = plusBtn ? this.createPlusBtn() : null;
    this.content = this.createContent(id);
    this.editToggle = false;
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  createSection() {
    let section = document.createElement("section");
    section.classList.add("section");
    this.characterSheet.appendChild(section);
    return section;
  }

  createHeader(title) {
    let header = document.createElement("h1");
    header.classList.add("section__header");
    header.innerHTML = title;
    this.section.appendChild(header);
    return header;
  }

  createPlusBtn() {
    const btn = document.createElement("button");
    btn.classList.add("section__plus-btn");
    btn.innerHTML = `<i class="fa-solid fa-plus"></i>`;
    this.section.appendChild(btn);
  }

  createContent(id) {
    let content = document.createElement("div");
    content.classList.add(`${id}__content`, "section__content");
    this.section.appendChild(content);
    return content;
  }

  onToggleEdit() {
    this.editToggle = !this.editToggle;
  }
}
