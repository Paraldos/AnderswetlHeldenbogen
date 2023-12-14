import Section from "../section/section.js";

export default class TraitsSection {
  constructor() {
    this.section = new Section("Merkmale", "traits");
    this.initSection()
    this.toggleWithEditElements = this.section.contentContainer.querySelectorAll(".traits__toggle-with-edit")
    this.section.editBtn.addEventListener("click", () => this.onEditBtnClick());
  }

  initSection() {
    this.section.contentContainer.innerHTML = `
      <ul>
        <li><div>
            <button class="traits__main-btn">Ausdauer</button>
            <p class="invisible traits__toggle-with-edit">Aktuell</p>
            <button class="symbol-btn"><i class="fa-solid fa-minus"></i></button>
            <button class="symbol-btn"><i class="fa-solid fa-plus"></i></button>
            <p class="invisible traits__toggle-with-edit">Maximal</p>
            <button class="traits__toggle-with-edit symbol-btn invisible"><i class="fa-solid fa-minus"></i></button>
            <button class="traits__toggle-with-edit symbol-btn invisible"><i class="fa-solid fa-plus"></i></button>
        </li></div>
        <li><div>
            <button class="traits__main-btn">Lebenspunkte</button>
        </li></div>
        <li><div>
            <button class="traits__main-btn">Schicksalspunkte</button>
        </li></div>
      </ul>
      <ul>
        <li><button>EP</button></li>
        <li><button>Stufe</button></li>
        <li><button>Tempo</button></li>
      </ul>`
  }

  onEditBtnClick() {
    this.toggleWithEditElements.forEach(el => {
      el.classList.toggle('invisible')
    })
  }
}
