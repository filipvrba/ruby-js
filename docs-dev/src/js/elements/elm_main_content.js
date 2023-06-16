export default class ElmMainContent extends HTMLElement {
  // init_elm()
  constructor() {
    super();
    this._hNic = e => this.changeContent(e.detail)
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
      <h1>${firstKeyword.name}</h1>
      <h3>${firstKeyword.keyword}</h3>
      <p>${pathFile}</p>
      <br>
      <p class=''>${firstKeyword.comment}</p>
      <hr>
      ${lCommentsKeywords()}
    `}`;
    return this.innerHTML = template
  };

  changeContent(info) {
    return this.initElm(info)
  }
}