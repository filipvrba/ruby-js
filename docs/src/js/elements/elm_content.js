export default class ElmContent extends HTMLElement {
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
    let lSidebarItem = () => {
      let liDom = `${`
      <li class='nav-item'>
        <a class='nav-link active' href='#'>Getting Started</a>
      </li>
      `}`;
      return liDom
    };

    let template = `${`
    <div class='container-fluid'>
      <div class='row'>
        <!-- Sidebar -->
        <div class='col-md-3 col-lg-2'>
          <nav class='sidebar'>
            <ul class='nav flex-column'>
              ${lSidebarItem()}
              <li class='nav-item'>
                  <a class='nav-link' href='#'>Installation</a>
              </li>
              <li class='nav-item'>
                  <a class='nav-link' href='#'>Usage</a>
              </li>
              <li class='nav-item'>
                  <a class='nav-link' href='#'>API Reference</a>
              </li>
              <li class='nav-item'>
                  <a class='nav-link' href='#'>Examples</a>
              </li>
            </ul>
          </nav>
        </div>

        <div class='col-md-9 col-lg-10'>
          <elm-main-content></elm-main-content>
        </div>
      </div>
    </div>
    `}`;
    return this.innerHTML = template
  }
}