export default class ElmContent extends HTMLElement {
  constructor() {
    super();
    this._data = DOCS_API;
    this.initElm(this._data);
    window.navItemContentClick = this.navItemContentClick.bind(this);
    window.navItemCategoryClick = this.navItemCategoryClick.bind(this)
  };

  listPath() {
    let list = [];

    for (let i = 0; i < this._data.length; i++) {
      let info = this._data[i];
      if (!list.includes(info.path)) list.push(info.path)
    };

    return list.sort()
  };

  listData(path) {
    let list = [];

    for (let i = 0; i < this._data.length; i++) {
      let info = this._data[i];
      if (info.path === path) list.push([info, i])
    };

    return list
  };

  initElm(data) {
    let lListData = (path) => {
      let template = [];

      for (let [info, i] of this.listData(path)) {
        let name = info.comments_with_keywords[0].name;
        let nameFileNoSuffix = info.file.replace(".rb", "");
        let href = `1-${i}-${info.path}/${nameFileNoSuffix}`;
        let liItemDom = `${`
          <ul class='nav-item'>
            <a class='nav-link' href='#${href}'>${name}</a>
          </ul>
        `}`;
        template.push(liItemDom)
      };

      return template.join("\n")
    };

    this._listPath = this.listPath();

    let lListItem = () => {
      let template = [];

      for (let path of this._listPath) {
        let ulItemDom = `${`
          <ul class='nav-item'>
            <span class='nav-link'>${path}</span>
            ${lListData(path)}
          </ul>
        `}`;
        template.push(ulItemDom)
      };

      return template.join("\n")
    };

    let template = `${`
    <div class='container-fluid'>
      <div class='row'>
        <!-- Sidebar -->
        <div class='col-sm-3 col-lg-2'>
          <nav class='sidebar'>
            <ul class='nav flex-column'>
              <li class='nav-item'>
                <a class='nav-link active' href='#0-introduction'>Introduction</a>
              </li>
              <li class='nav-item'>
                <a class='nav-link active' href='#0-getting-started'>Getting Started</a>

                <ul class='nav-item'>
                  <a class='nav-link active' href='#0-tutorial-table-users'>Tutorial</a>
                </ul>
              </li>
              <li class='nav-item'>
                <a class='nav-link active' href='#0-plugins'>Plugins</a>

                <ul class='nav-item'>
                  <a class='nav-link active' href='#0-plugin-scaffold'>Scaffold</a>
                </ul>
              </li>

              <li class='nav-item'>
                <a class='nav-link' href='#0-api-reference'>API Reference</a>
                ${lListItem()}
              </li>
            </ul>
          </nav>
        </div>

        <div class='col-sm-9 col-lg-10'>
          <elm-main-content></elm-main-content>
        </div>
      </div>
    </div>
    `}`;
    return this.innerHTML = template
  };

  navItemContentClick(id) {
    return Events.send(EVENTS.navItemContent, this._data[id])
  };

  navItemCategoryClick(file) {
    return Events.send(EVENTS.navItemContent, file)
  }
}