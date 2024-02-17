export default class SymbolBtn {
  constructor(symbolName) {
    this.symbolName = symbolName;
    this.btn = this.createBtn();
  }

  createBtn() {
    let btn = document.createElement("button");
    btn.innerHTML = `<i class="${this.symbolName}"></i>`;
    btn.classList.add("symbol-btn");
    return btn;
  }
}
