import gettingStarted from "../../html/getting_started.html?raw";
import apiReference from "../../html/api_reference.html?raw";
import introduction from "../../html/introduction.html?raw";

export default class ElmMainContent extends HTMLElement {
  constructor() {
    super();

    this._hNic = (e) => {
      let isApi = typeof e.detail === "object";
      return this.changeContent(e.detail, isApi)
    };

    this._html = {gettingStarted, apiReference, introduction};
    this.initHtml(this._html.introduction)
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

  initHtml(contentHtml) {
    contentHtml = contentHtml.replaceAll(
      "\#{GH_PROFILE_URL}",
      GH_PROFILE_URL.replace("/blob/main", "")
    ).replace("\#{DOCS_API_VERSION}", DOCS_API_VERSION);

    return this.innerHTML = contentHtml
  };

  changeContent(info, isApi) {
    return isApi ? this.initElm(info) : this.initHtml(this._html[info])
  }
}