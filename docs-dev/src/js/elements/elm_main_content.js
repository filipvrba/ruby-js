export default class ElmMainContent extends HTMLElement {
  // init_elm()
  constructor() {
    super();
    this._hNic = e => this.changeContent(e.detail, true)
  };

  connectedCallback() {
    return document.addEventListener(EVENTS.navItemContent, this._hNic)
  };

  disconnectedCallback() {
    return document.removeEventListener(
      EVENTS.navItemContent,
      this._hNic
    )
  };

  initElm(info) {
    let lCommentsKeywords = () => {
      let template = [];

      for (let i = 1; i < info.comments_with_keywords.length; i++) {
        let commentsKeywords = info.comments_with_keywords[i];
        let templateDom = `${`
        <div class=''>
          <h4>${commentsKeywords.keyword} ${commentsKeywords.name}</h4>
          <p>${commentsKeywords.comment}</p>
          <br>
        <div>
        `}`;
        template.push(templateDom)
      };

      return template.join("\n")
    };

    let pathFile = `${info.path}/${info.file}`;
    let firstKeyword = info.comments_with_keywords[0];
    let template = `${`
    <div class='container'>
      <h1>${firstKeyword.name}</h1>
      
      <ul class='nav flex-column'>
        <li class='nav-item'>
          <h3 style='padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);'>${firstKeyword.keyword}</h3>
        </li>
        <li class='nav-item'>
          <a class='nav-link active' href='${GH_PROFILE_URL}/${pathFile}' target='_blank'>${pathFile}</a>
        </li>
      </ul>
      <br>
      <p class=''>${firstKeyword.comment}</p>
      <br>
      ${lCommentsKeywords()}
    </div>
    `}`;
    return this.innerHTML = template
  };

  changeContent(info, isApi) {
    if (isApi) return this.initElm(info)
  }
}