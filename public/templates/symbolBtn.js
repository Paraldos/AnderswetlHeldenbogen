export default class SymbolBtn {
  constructor(symbolName, classList, container) {
    this.classList = classList;
    this.container = container;
    this.symbolName = symbolName;
    this.btn = this.createBtn();
  }

  createBtn() {
    let btn = document.createElement("button");
    btn.innerHTML = `<i class="${this.symbolName}"></i>`;
    btn.classList.add("symbol-btn");
    for (let c of this.classList) {
      btn.classList.add(c);
    }
    this.container.appendChild(btn);
    return btn;
  }
}
