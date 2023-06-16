export default class ElmFooter extends HTMLElement {
  constructor() {
    super();
    this.initElm()
  };

  initElm() {
    let template = `${`
    <footer class='py-3'>
      <p class='text-center text-body-secondary mb-0'>Powered by docs plugin. Generated on: ${DOCS_API_GENERATED}</p>
    </footer>
    `}`;
    return this.innerHTML = template
  }
}