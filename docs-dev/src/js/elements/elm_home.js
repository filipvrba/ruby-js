export default class ElmHome extends HTMLElement {
  constructor() {
    super();

    this._hHashChange = () => {
      return this.enterHash()
    };

    this.initElm();
    this.enterHash()
  };

  connectedCallback() {
    return window.addEventListener("hashchange", this._hHashChange)
  };

  disconnectedCallback() {
    return window.removeEventListener("hashchange", this._hHashChange)
  };

  initElm() {
    let template = `${`
    <div class='py-3'>
      <elm-header></elm-header>
      <main>
        <elm-content></elm-content>
      </main>
      <elm-footer></elm-footer>
    </div>
    `}`;
    return this.innerHTML = template
  };

  enterHash() {
    if (location.hash) return this.endpoint(location.hash.replace("#", ""))
  };

  endpoint(pageName) {
    let pageNameSplit = pageName.split("-");
    let categoryNumber = Number(pageNameSplit[0]);

    switch (categoryNumber) {
    case 0:

      let pageNameCamelNoCategory = pageNameSplit.map((e, i) => {
        if (i > 1) {
          return e.charAt(0).toUpperCase() + e.slice(1)
        } else if (i > 0) {
          return e
        }
      }).join("");

      navItemCategoryClick(pageNameCamelNoCategory);
      break;

    case 1:
      let contentId = pageNameSplit[1];
      navItemContentClick(contentId)
    }
  }
}