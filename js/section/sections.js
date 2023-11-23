export default class Section {
  constructor(name) {
    this.template = `
        <div class="section-header">
            <h1>Section Header</h1>
            <button class="section-header__button">
            <i class="fa-solid fa-wrench"></i>
            </button>
        </div>`;
  }
}
