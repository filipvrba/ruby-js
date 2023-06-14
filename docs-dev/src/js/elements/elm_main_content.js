export default class ElmMainContent extends HTMLElement {
  constructor() {
    super();
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`\n      <h1>Getting Started</h1>\n      <p>Welcome to the documentation.</p>\n    `}`;
    return this.innerHTML = template
  }
}