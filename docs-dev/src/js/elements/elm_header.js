export default class ElmHeader extends HTMLElement {
  constructor() {
    super();
    this.initElm()
  };

  initElm() {
    let template = `${`
    <header class='mb-3'>
      <div class='container d-flex flex-wrap justify-content-center'>
        <a href='#introduction' onclick='navItemCategoryClick("introduction")' class='d-flex align-items-center link-body-emphasis text-decoration-none'>
          <img src='./rjsv.svg' width='64'/>
          <span class='display-6 fs-3 px-3'>${APP_NAME} | Docs</span>
        </a>
      </div>
    </header>
    `}`;
    return this.innerHTML = template
  }
}