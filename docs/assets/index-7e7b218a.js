(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();window.EVENTS={navItemContent:"nic"};window.GH_PROFILE_URL="https://github.com/filipvrba/ruby-js/blob/main";window.APP_NAME="RubyJS-Vite";const u=[{file:"arguments.rb",path:"lib/rjsv/cli",comments_with_keywords:[{comment:"Module for all arguments to the CLI application. The argument initializes the OptionParser, which defines the arguments in detail. It is also nested with a function that adds all arguments from modules.",keyword:"module",name:"Arguments"},{comment:"Options is a get method and gets all options from arguments.",keyword:"def",name:"self.options"},{comment:"It finds out if the plugin is written in the argument.",keyword:"def",name:"self.active_plugin?"}]},{file:"plugins.rb",path:"lib/rjsv/cli",comments_with_keywords:[{comment:"This is the module that handles plugins so that they are found, imported and inizialized.",keyword:"module",name:"Plugins"},{comment:"Finds all init.rb files in the plugins folder. Otherwise, the absolute path is determined by the Dir.pwd() method.",keyword:"def",name:"find_all_init(path = Dir.pwd)"},{comment:"Imports all found init.rb files into Ruby script. Returns the classes that are imported, otherwise returns an empty array.",keyword:"def",name:"require_all_init()"},{comment:"Adds a plugin argument and initializes its nested arguments. It chooses the name and description of the argument to be the one written on behalf of the plugin,  which is found from the RJSV::Plugin class.",keyword:"def",name:"add_arguments(parser)"}]},{file:"signals.rb",path:"lib/rjsv/cli",comments_with_keywords:[{comment:"Dedicated to all signals for Unix system. Here we find the signal for INT.",keyword:"module",name:"Signals"}]},{file:"constants.rb",path:"lib/rjsv",comments_with_keywords:[{comment:"All constant variables.",keyword:"module",name:"Constants"}]},{file:"constants.rb",path:"lib/rjsv/core",comments_with_keywords:[{comment:"The module is reserved for handling classes and modules. Thus, it is a manipulation of constant keywords.",keyword:"module",name:"Constants"},{comment:"This method tries to find already initialized classes from the mod (module) using the abstract class RJSV::Plugin. It returns an array of classes.",keyword:"def",name:"get_classes(mod)"}]},{file:"event.rb",path:"lib/rjsv/core",comments_with_keywords:[{comment:"Event module for handling fifo events. This is so far a module for just the basic event printing element.",keyword:"module",name:"Event"},{comment:"Prints an event type using the puts() method that shows the time, cli application name, event and event message.",keyword:"def",name:'print(event, message = "")'}]},{file:"files.rb",path:"lib/rjsv/core",comments_with_keywords:[{comment:"The file module ensures safe handling of files. It always checks if a file really exists on the input path or if a certain folder exists on the output path. It can also change the absolute path or find all necessary files for further manipulation.",keyword:"module",name:"Files"},{comment:"Opens the file securely and returns the content from the file. If the file does not exist, it returns nil.",keyword:"def",name:"open(path)"},{comment:"Stores the file with the assigned container by safely discovering its folder and, if necessary, creating it when it does not exist in the path. It can also be assigned a file write mode.",keyword:"def",name:"write_with_dir(content, path, mode = 'w+')"},{comment:"Safely removes the file from the path. If the file is the last one in the folder, the folder is also deleted with the file.",keyword:"def",name:"remove(path)"},{comment:"The method is special in that it examines arguments from the CLI and modifies the definition path for the output path.",keyword:"def",name:"change_path_to_output(path, options_cli)"},{comment:"Finds all files with the extension '.*.rb' from the defined path.",keyword:"def",name:"find_all(path)"},{comment:"Copies all files from the input path to the output path. This is a method that copies all files even those that are invisible to the UNIX system (dot file).",keyword:"def",name:"copy(path_input, path_output)"}]},{file:"plugin.rb",path:"lib/rjsv",comments_with_keywords:[{comment:"Abstract 'class' for creating initialization plagins. They are teachable for defining basic information and is the starting point for triggering functions using the init() function. If we are creating a custom plugin, we need to inherit this 'class' into its own 'class'.",keyword:"class",name:"Plugin"},{comment:"Description of the plugin that is printed to the CLI during help.",keyword:"def",name:"description"},{comment:"This function is not mandatory and automatically defines the 'module' name according to the plugin 'module'.",keyword:"def",name:"name"},{comment:"The method should pass an initialization method for all arguments of this plugin.",keyword:"def",name:"arguments"},{comment:"The method that is the main initialization block for the code that the plugin should execute.",keyword:"def",name:"init"},{comment:"A private method that raises an error message about an abstract class with a function name.",keyword:"def",name:"abstract_error(fn_name)"}]},{file:"translate.rb",path:"lib/rjsv",comments_with_keywords:[{comment:"Here we can load everything necessary for the transpilation process of Ruby script into JavaScript. The transpilation process uses the Ruby2JS library. The transpilation is safe and catches error messages if the Ruby script has been written incorrectly.",keyword:"module",name:"Translate"},{comment:"Converts Ruby script to JavaScript using Ruby2JS library. If an error occurs during transpilation, the error message is raised in the next nested code block.",keyword:"def",name:"ruby_to_js(content_ruby, &block)"},{comment:"Converts Ruby script to JavaScript using Ruby2JS library. The final transpilation is followed by saving it to a file with a predefined path.",keyword:"def",name:"ruby_to_js_with_write(content_ruby, path, &block)"}]},{file:"watch.rb",path:"lib/rjsv",comments_with_keywords:[{comment:"Module for real-time monitoring of files on the local disk. It uses the 'listen' library for this function. There is only one method that can be loaded here which triggers everything.",keyword:"module",name:"Watch"},{comment:"Tracks modified files in the path that is defined as the source directory. When this function is called, the event listener is triggered for events such as modified, added, and deleted file events. Therefore, the method can put the application to sleep and silently monitor the event process. It watches all files with extension '.*.rb', which asterisk means any sub extension such as '.js'.",keyword:"def",name:"modified_files(path, &block)"}]},{file:"rjsv.rb",path:"lib",comments_with_keywords:[{comment:"This is the main initialization module of all modules that are needed for the functionality of this RubyJS-Vite transpiler. The methods that shape the direction of the application are also written here.",keyword:"module",name:"RJSV"},{comment:"Block of code that handles the transpilation of script. This is opening a Ruby script container file, which is then converted into a JavaScript file. The file is saved to the output path.",keyword:"def",name:"translate_state(path)"},{comment:"Block of code that tracks files under the input path. If a file has been logged, several events are performed such as to add, modify and remove logged files. These then trigger procedural methods to process the requests.",keyword:"def",name:"watch_state()"},{comment:"This is the main function to run the desired block function scenarios. In order to arm itself regarding plugins and directly Arguments, this method checks the accessibility of the plugin by checking if it is active or attached in the argument given by the confirmed command from the terminal.",keyword:"def",name:"main()"}]}],p="19. 06. 2023 07:43:53",f="2.0.0",c={docs_api:u,generated:p,version:f};window.DOCS_API=c.docs_api;window.DOCS_API_GENERATED=c.generated;window.DOCS_API_VERSION=c.version;class y extends HTMLElement{constructor(){super(),this._data=DOCS_API,this.initElm(this._data),window.navItemContentClick=this.navItemContentClick.bind(this),window.navItemCategoryClick=this.navItemCategoryClick.bind(this)}listPath(){let e=[];for(let n=0;n<this._data.length;n++){let s=this._data[n];e.includes(s.path)||e.push(s.path)}return e.sort()}listData(e){let n=[];for(let s=0;s<this._data.length;s++){let t=this._data[s];t.path===e&&n.push([t,s])}return n}initElm(e){let n=i=>{let a=[];for(let[o,l]of this.listData(i)){let h=o.comments_with_keywords[0].name,d=o.file.replace(".rb",""),m=`${`
          <ul class='nav-item'>
            <a class='nav-link' href='#${`1-${l}-${o.path}/${d}`}'>${h}</a>
          </ul>
        `}`;a.push(m)}return a.join(`
`)};this._listPath=this.listPath();let t=`${`
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
              </li>
              <li class='nav-item'>
                <a class='nav-link' href='#0-api-reference'>API Reference</a>
                ${(()=>{let i=[];for(let a of this._listPath){let o=`${`
          <ul class='nav-item'>
            <span class='nav-link'>${a}</span>
            ${n(a)}
          </ul>
        `}`;i.push(o)}return i.join(`
`)})()}
              </li>
            </ul>
          </nav>
        </div>

        <div class='col-sm-9 col-lg-10'>
          <elm-main-content></elm-main-content>
        </div>
      </div>
    </div>
    `}`;return this.innerHTML=t}navItemContentClick(e){return Events.send(EVENTS.navItemContent,this._data[e])}navItemCategoryClick(e){return Events.send(EVENTS.navItemContent,e)}}const g=`<div class='container'>
<h1 id="getting-started">Getting Started</h1>
<br>
<p>Before we start using the RubyJS tool, let me give you some background information. You'll learn how to install the CLI application, how to use it with basic features and a little bit about configuring the transpiler.</p>
<h2 id="0-getting-started-1-installation">1 Installation</h2>
<p>Installing the RubyJS CLI tool is simple and we use the Ruby language ecosystem to do it using the 'gem' command. This installs everything needed for RubyJS and then creates an executable file called 'rjsv'.</p>
<p><em>Just type this command into the terminal to install it:</em></p>
<pre class="hljs"><code><div>gem install rubyjs-vite
</div></code></pre>
<p>After successful installation, we can test the functionality of the application by typing the RubyJS version into the terminal.</p>
<p><em>This command will print the version:</em></p>
<pre class="hljs"><code><div>rjsv -v
</div></code></pre>
<blockquote>
<h3 id="info">Info</h3>
<p>If you see version 2.0.0 or greater and it doesn't throw any errors, you have RubyJS-Vite installed correctly.</p>
</blockquote>
<h2 id="0-getting-started-2-basic-usage">2 Basic usage</h2>
<p>At the base RubyJS has 4 functions that are used for transpiling Ruby scripts. The most basic is defining input and output paths that will be used during transpilation. In order for transpilation to take place, it needs to be marked as active and if it is not done, no file is transpiled. The last feature is file tracking, which is useful for rapid web development and communicates with the Vite tool.</p>
<p>The way it works is that if we create, edit or remove a file, the tracker will capture the event that the transpilation is working with next (that's why it's important that the transpilation is always active). Once the files are transpiled into the native JavaScript syntax, the Vite tool catches the changes and it automatically restarts the server and refreshes the web page if necessary.</p>
<p><em>Here are the 4 basic functions that are broken down into points and are applicable as the 'rjsv' cli application argument:</em></p>
<ol>
<li><strong>-s DIR, --source DIR</strong> (The path of the source folder where all RB files are found. Example of ending file type *.js.rb.)</li>
<li><strong>-o DIR, --output DIR</strong> (The path of the output folder where all Ruby codes will be translated into JavaScript with the prepared file type.)</li>
<li><strong>-t, --translate</strong> (It translates all loaded RB files into JavaScript code and stores them in certain type files.)</li>
<li><strong>-w, --watch</strong> (Monitors all RB files in real time to see if they have been modified.)</li>
</ol>
<h3 id="0-getting-started-21-paths-suffix">2.1 Paths &amp; Suffix</h3>
<p>I'd better mention here that input and output paths can be relative. Files in the input directory for Ruby scripts should have 2x extensions. The idea is that the 1st suffix is the file type, for the output folder, and the 2nd suffix is to indicate the RB file. So if we want to store JavaScript syntax in a 'js' extension, we do that by writing two '*.js.rb' extensions. Or, if we want to use a specific file type, we write this '*.jsx.rb' extension (this 'jsx' extension is used for React). If we don't write 2x extension then RubyJS won't automatically recognize the file in the input folder.</p>
<h2 id="0-getting-started-3-configuration">3 Configuration</h2>
<p>Configuration of the Ruby2JS transpiler can be done in the 'config/ruby2js.rb' file and should be allocated in the project root. If a RubyJS-Vite (rjsv) application is enabled with the transpilation argument enabled. So the config file is automatically detected and the transpilation is adapted as you expect.</p>
<p>You can find this configuration file if you have created a new web project using scaffolding. If you are creating a project manually, it is required that you create a configuration file. If the configuration file does not exist, Ruby2JS has predefined default configuration parameters. It shouldn't happen that RubyJS doesn't throw an error message. The error message happens when the Ruby script is poorly written and the transpiler fails to recognize the syntax.</p>
<h3 id="0-getting-started-31-basic-configuration">3.1 Basic Configuration</h3>
<p>The configuration can be varied, so I will list the basic file configuration here. If you don't understand the configuration, I recommend reading the <a href="https://www.ruby2js.com/docs/options">Options</a> article. It will walk you through everything you need to know.</p>
<p><em>Here is the basic configuration:</em></p>
<pre class="hljs"><code><div><span class="hljs-comment"># config/ruby2js.rb</span>

preset

filter <span class="hljs-symbol">:functions</span>
filter <span class="hljs-symbol">:camelCase</span>

eslevel <span class="hljs-number">2021</span>

include_method <span class="hljs-symbol">:class</span>
</div></code></pre>
</div>`,b=`<div class='container'>
  <h1 id="api-reference">API Reference</h1>
  <br>
  <p>This is the basic API of the modules, or classes, of the RubyJS application itself. They are written in Ruby language and can be further used to create custom plugins. In order to navigate which module belongs where. They have submodules starting with the 'lib' component tag. The basic module is 'RJSV', in which we find the main() method. This executes a particular function marked 'state'.</p>
  <p>The API does not specify basic constants in the module like application name and root folder. This is because they are defined directly in the 'bin/rjsv' executable.</p>
  
  <p><em>These are constants:</em></p>
  <ul>
    <li><strong>APP_NAME</strong></li>
    <li><strong>ROOT</strong></li>
  </ul>

  <blockquote>
    <h3 id="info">Info</h3>
    <p>Modules or classes don't need to be imported in plugins, they are already imported when the RubyJS application starts.</p>
  </blockquote>

  <p>API reference is automatically generated from Ruby scripts. If you want to see the source script, just click on the link below the module or class name.</p>  
</div>`,w=`<div class='container'>
  <h1>Introduction</h1>
  <br>
  <table frame='void' rules='none'>
    <colgroup>
      <col>
      <col>
    </colgroup>
    <tbody valign='top'>
      <tr><th>Author:</th><td>Filip Vrba</td></tr>
      <tr><th>Version:</th><td>#{DOCS_API_VERSION}</td></tr>
      <tr><th>GitHub:</th><td>
        <a href='#{GH_PROFILE_URL}'>
          #{GH_PROFILE_URL}
        </a>
      </td></tr>
      <tr><th>License:</th><td>MIT</td></tr>
    </tbody>
  </table>
  <br>
  <p>This tool is written in Ruby which uses a library to transpile Ruby script into JavaScript. To give you a better idea of what this CLI application does, it can track files with the extension '.*.rb' in real time and transpile them to another file with native JS script (note that the extension has a star and this indicates the type of file we want to save the transpiled script to).</p>
  <p>
    The program utilizes a <a href="https://www.ruby2js.com/">Ruby2JS</a> transpiler in conjunction with a separate module for monitoring file modifications. The collaboration of these libraries resulted in the creation of this RubyJS tool. It can be used almost anywhere, as long as the virtual environment supports <a href="https://en.wikipedia.org/wiki/ECMAScript">ECMAScript</a> (JS).
    There are various tools like this one, such as <a href="https://www.typescriptlang.org/">TypeScript</a>, <a href="https://fable.io/">Fable</a>, and <a href="https://coffeescript.org/">CoffeeScript</a>, that offer similar functionalities. You can utilize your preferred scripting syntax to execute the supplied command. However, these transpilers have a disadvantage in that they only provide a JavaScript API.
  </p>
  <p>
    Another possibility of the CLI application tool is that it has its own ecosystem created by inserting a plugin into it, which extends the functionality of the RubyJS tool. The default plugin is a scaffold that can generate various elements. With this plugin, you can create a new web project that is built exactly for RubyJS-Vite, or add a new DOM Element to a web project for faster site creation (something similar to Ruby on Rails).
    I recommend studying Ruby2JS so you can write scripts to transpile into native JS. There's a lot that this Ruby2JS library can do, and it's mostly configuration independent. What I mean by this is that you can configure the transpiler using a configuration file. Just add 'config/ruby2js.rb' to your project and the RubyJS CLI tool will recognize this file and adapt to the configurations.
  </p>
  <br>
  <blockquote>
    <h3>Info</h3>
    <p>Since the Vite tool is a secondary feature of the RubyJS tool, it is appropriate to refer to the combined tool as RubyJS-Vite, which is available online. Therefore, both RubyJS and RubyJS-Vite are identical tools.</p>
  </blockquote>
</div>`;class v extends HTMLElement{constructor(){super(),this._hNic=e=>{let n=typeof e.detail=="object";return this.changeContent(e.detail,n)},this._html={gettingStarted:g,apiReference:b,introduction:w}}connectedCallback(){return document.addEventListener(EVENTS.navItemContent,this._hNic)}disconnectedCallback(){return document.removeEventListener(EVENTS.navItemContent,this._hNic)}initElm(e){let n=()=>{let a=[];for(let o=1;o<e.comments_with_keywords.length;o++){let l=e.comments_with_keywords[o],h=`${`
        <div class=''>
          <h4>${l.keyword} ${l.name}</h4>
          <p>${l.comment}</p>
          <br>
        <div>
        `}`;a.push(h)}return a.join(`
`)},s=`${e.path}/${e.file}`,t=e.comments_with_keywords[0],i=`${`
    <div class='container'>
      <h1>${t.name}</h1>
      
      <ul class='nav flex-column'>
        <li class='nav-item'>
          <h3 style='padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);'>${t.keyword}</h3>
        </li>
        <li class='nav-item'>
          <a class='nav-link active' href='${GH_PROFILE_URL}/${s}' target='_blank'>${s}</a>
        </li>
      </ul>
      <br>
      <p class=''>${t.comment}</p>
      <br>
      ${n()}
    </div>
    `}`;return this.innerHTML=i}initHtml(e){return e=e.replaceAll("#{GH_PROFILE_URL}",GH_PROFILE_URL.replace("/blob/main","")).replace("#{DOCS_API_VERSION}",DOCS_API_VERSION),this.innerHTML=e}changeContent(e,n){return n?this.initElm(e):this.initHtml(this._html[e])}}class k extends HTMLElement{constructor(){super(),this.initElm()}initElm(){let e=`${`
    <header class='mb-3'>
      <div class='container d-flex flex-wrap justify-content-center'>
        <a href='#introduction' onclick='navItemCategoryClick("introduction")' class='d-flex align-items-center link-body-emphasis text-decoration-none'>
          <img src='./rjsv.svg' width='64'/>
          <span class='display-6 fs-3 px-3'>${APP_NAME} | Docs</span>
        </a>
      </div>
    </header>
    `}`;return this.innerHTML=e}}class _ extends HTMLElement{constructor(){super(),this.initElm()}initElm(){let e=`${`
    <footer class='py-3'>
      <p class='text-center text-body-secondary mb-0'>Powered by docs plugin. Generated on: ${DOCS_API_GENERATED}</p>
    </footer>
    `}`;return this.innerHTML=e}}class I extends HTMLElement{constructor(){super(),this._hHashChange=()=>this.enterHash(),this.initElm(),this.enterHash()}connectedCallback(){return window.addEventListener("hashchange",this._hHashChange)}disconnectedCallback(){return window.removeEventListener("hashchange",this._hHashChange)}initElm(){let e=`
    <div class='py-3'>
      <elm-header></elm-header>
      <main>
        <elm-content></elm-content>
      </main>
      <elm-footer></elm-footer>
    </div>
    `;return this.innerHTML=e}enterHash(){return location.hash?this.endpoint(location.hash.replace("#","")):this.endpoint("0-introduction")}endpoint(e){let n=e.split("-");switch(Number(n[0])){case 0:let t=n.map((a,o)=>{if(o>1)return a.charAt(0).toUpperCase()+a.slice(1);if(o>0)return a}).join("");navItemCategoryClick(t);break;case 1:let i=n[1];navItemContentClick(i)}}}window.customElements.define("elm-content",y);window.customElements.define("elm-main-content",v);window.customElements.define("elm-header",k);window.customElements.define("elm-footer",_);window.customElements.define("elm-home",I);let R=class{static send(e,n=null){return e=new CustomEvent(e,{detail:n}),document.dispatchEvent(e)}};window.Events=R;document.querySelector("#app").innerHTML="<elm-home></elm-home>";
