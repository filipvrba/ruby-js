(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();class c extends HTMLElement{constructor(){super(),this.initElm()}connectedCallback(){return null}disconnectedCallback(){return null}initElm(){let l=`${`
    <div class='container-fluid'>
      <div class='row'>
        <!-- Sidebar -->
        <div class='col-md-3 col-lg-2'>
          <nav class='sidebar'>
            <ul class='nav flex-column'>
              ${(()=>`
      <li class='nav-item'>
        <a class='nav-link active' href='#'>Getting Started</a>
      </li>
      `)()}
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
    `}`;return this.innerHTML=l}}class a extends HTMLElement{constructor(){super(),this.initElm()}connectedCallback(){return null}disconnectedCallback(){return null}initElm(){let n=`
      <h1>Getting Started</h1>
      <p>Welcome to the documentation.</p>
    `;return this.innerHTML=n}}window.customElements.define("elm-content",c);window.customElements.define("elm-main-content",a);document.querySelector("#app").innerHTML="<elm-content></elm-content>";
