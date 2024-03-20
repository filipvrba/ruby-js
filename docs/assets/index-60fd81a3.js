(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=n(t);fetch(t.href,s)}})();window.EVENTS={navItemContent:"nic"};window.GH_PROFILE_URL="https://github.com/filipvrba/ruby-js/blob/main";window.APP_NAME="RubyJS-Vite";const m=[{file:"arguments.rb",path:"/home/filip/.local/src/ruby-js/lib/rjsv/cli",comments_with_keywords:[{comment:"Module for all arguments to the CLI application. The argument initializes the OptionParser, which defines the arguments in detail. It is also nested with a function that adds all arguments from modules.",keyword:"module",name:"Arguments"},{comment:"Options is a get method and gets all options from arguments.",keyword:"def",name:"self.options"},{comment:"It finds out if the plugin is written in the argument.",keyword:"def",name:"self.active_plugin?"}]},{file:"plugins.rb",path:"/home/filip/.local/src/ruby-js/lib/rjsv/cli",comments_with_keywords:[{comment:"This is the module that handles plugins so that they are found, imported and inizialized.",keyword:"module",name:"Plugins"},{comment:"Finds all init.rb files in the plugins folder. Otherwise, the absolute path is determined by the Dir.pwd() method.",keyword:"def",name:"find_all_init(path = Dir.pwd)"},{comment:"Imports all found init.rb files into Ruby script. Returns the classes that are imported, otherwise returns an empty array.",keyword:"def",name:"require_all_init()"},{comment:"Adds a plugin argument and initializes its nested arguments. It chooses the name and description of the argument to be the one written on behalf of the plugin,  which is found from the RJSV::Plugin class.",keyword:"def",name:"add_arguments(parser)"}]},{file:"signals.rb",path:"/home/filip/.local/src/ruby-js/lib/rjsv/cli",comments_with_keywords:[{comment:"Dedicated to all signals for Unix system. Here we find the signal for INT.",keyword:"module",name:"Signals"}]},{file:"constants.rb",path:"/home/filip/.local/src/ruby-js/lib/rjsv",comments_with_keywords:[{comment:"All constant variables.",keyword:"module",name:"Constants"}]},{file:"constants.rb",path:"/home/filip/.local/src/ruby-js/lib/rjsv/core",comments_with_keywords:[{comment:"The module is reserved for handling classes and modules. Thus, it is a manipulation of constant keywords.",keyword:"module",name:"Constants"},{comment:"This method tries to find already initialized classes from the mod (module) using the abstract class RJSV::Plugin. It returns an array of classes.",keyword:"def",name:"get_classes(mod)"}]},{file:"event.rb",path:"/home/filip/.local/src/ruby-js/lib/rjsv/core",comments_with_keywords:[{comment:"Event module for handling fifo events. This is so far a module for just the basic event printing element.",keyword:"module",name:"Event"},{comment:"Prints an event type using the puts() method that shows the time, cli application name, event and event message.",keyword:"def",name:'print(event, message = "")'}]},{file:"files.rb",path:"/home/filip/.local/src/ruby-js/lib/rjsv/core",comments_with_keywords:[{comment:"The file module ensures safe handling of files. It always checks if a file really exists on the input path or if a certain folder exists on the output path. It can also change the absolute path or find all necessary files for further manipulation.",keyword:"module",name:"Files"},{comment:"Opens the file securely and returns the content from the file. If the file does not exist, it returns nil.",keyword:"def",name:"open(path)"},{comment:"Stores the file with the assigned container by safely discovering its folder and, if necessary, creating it when it does not exist in the path. It can also be assigned a file write mode.",keyword:"def",name:"write_with_dir(content, path, mode = 'w+')"},{comment:"Safely removes the file from the path. If the file is the last one in the folder, the folder is also deleted with the file.",keyword:"def",name:"remove(path)"},{comment:"The method is special in that it examines arguments from the CLI and modifies the definition path for the output path.",keyword:"def",name:"change_path_to_output(path, options_cli)"},{comment:"Finds all files with the extension '.*.rb' from the defined path.",keyword:"def",name:"find_all(path)"},{comment:"Copies all files from the input path to the output path. This is a method that copies all files even those that are invisible to the UNIX system (dot file).",keyword:"def",name:"copy(path_input, path_output)"}]},{file:"plugin.rb",path:"/home/filip/.local/src/ruby-js/lib/rjsv",comments_with_keywords:[{comment:"Abstract 'class' for creating initialization plagins. They are teachable for defining basic information and is the starting point for triggering functions using the init() function. If we are creating a custom plugin, we need to inherit this 'class' into its own 'class'.",keyword:"class",name:"Plugin"},{comment:"Description of the plugin that is printed to the CLI during help.",keyword:"def",name:"description"},{comment:"This function is not mandatory and automatically defines the 'module' name according to the plugin 'module'.",keyword:"def",name:"name"},{comment:"The method should pass an initialization method for all arguments of this plugin.",keyword:"def",name:"arguments"},{comment:"The method that is the main initialization block for the code that the plugin should execute.",keyword:"def",name:"init"},{comment:"A private method that raises an error message about an abstract class with a function name.",keyword:"def",name:"abstract_error(fn_name)"}]},{file:"translate.rb",path:"/home/filip/.local/src/ruby-js/lib/rjsv",comments_with_keywords:[{comment:"Here we can load everything necessary for the transpilation process of Ruby script into JavaScript. The transpilation process uses the Ruby2JS library. The transpilation is safe and catches error messages if the Ruby script has been written incorrectly.",keyword:"module",name:"Translate"},{comment:"Converts Ruby script to JavaScript using Ruby2JS library. If an error occurs during transpilation, the error message is raised in the next nested code block.",keyword:"def",name:"ruby_to_js(content_ruby, &block)"},{comment:"Converts Ruby script to JavaScript using Ruby2JS library. The final transpilation is followed by saving it to a file with a predefined path.",keyword:"def",name:"ruby_to_js_with_write(content_ruby, path, &block)"}]},{file:"watch.rb",path:"/home/filip/.local/src/ruby-js/lib/rjsv",comments_with_keywords:[{comment:"Module for real-time monitoring of files on the local disk. It uses the 'listen' library for this function. There is only one method that can be loaded here which triggers everything.",keyword:"module",name:"Watch"},{comment:"Tracks modified files in the path that is defined as the source directory. When this function is called, the event listener is triggered for events such as modified, added, and deleted file events. Therefore, the method can put the application to sleep and silently monitor the event process. It watches all files with extension '.*.rb', which asterisk means any sub extension such as '.js'.",keyword:"def",name:"modified_files(path, &block)"}]},{file:"rjsv.rb",path:"/home/filip/.local/src/ruby-js/lib",comments_with_keywords:[{comment:"This is the main initialization module of all modules that are needed for the functionality of this RubyJS-Vite transpiler. The methods that shape the direction of the application are also written here.",keyword:"module",name:"RJSV"},{comment:"Block of code that handles the transpilation of script. This is opening a Ruby script container file, which is then converted into a JavaScript file. The file is saved to the output path.",keyword:"def",name:"translate_state(path)"},{comment:"Block of code that tracks files under the input path. If a file has been logged, several events are performed such as to add, modify and remove logged files. These then trigger procedural methods to process the requests.",keyword:"def",name:"watch_state()"},{comment:"This is the main function to run the desired block function scenarios. In order to arm itself regarding plugins and directly Arguments, this method checks the accessibility of the plugin by checking if it is active or attached in the argument given by the confirmed command from the terminal.",keyword:"def",name:"main()"}]}],u="20. 03. 2024 14:38:41",f="2.0.0",c={docs_api:m,generated:u,version:f};window.DOCS_API=c.docs_api;window.DOCS_API_GENERATED=c.generated;window.DOCS_API_VERSION=c.version;class g extends HTMLElement{constructor(){super(),this._data=DOCS_API,this.initElm(this._data),window.navItemContentClick=this.navItemContentClick.bind(this),window.navItemCategoryClick=this.navItemCategoryClick.bind(this)}listPath(){let e=[];for(let n=0;n<this._data.length;n++){let i=this._data[n];e.includes(i.path)||e.push(i.path)}return e.sort()}listData(e){let n=[];for(let i=0;i<this._data.length;i++){let t=this._data[i];t.path===e&&n.push([t,i])}return n}initElm(e){let n=s=>{let a=[];for(let[l,r]of this.listData(s)){let h=l.comments_with_keywords[0].name,p=l.file.replace(".rb",""),d=`${`
          <ul class='nav-item'>
            <a class='nav-link' href='#${`1-${r}-${l.path}/${p}`}'>${h}</a>
          </ul>
        `}`;a.push(d)}return a.join(`
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
                ${(()=>{let s=[];for(let a of this._listPath){let l=`${`
          <ul class='nav-item'>
            <span class='nav-link'>${a}</span>
            ${n(a)}
          </ul>
        `}`;s.push(l)}return s.join(`
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
    `}`;return this.innerHTML=t}navItemContentClick(e){return Events.send(EVENTS.navItemContent,this._data[e])}navItemCategoryClick(e){return Events.send(EVENTS.navItemContent,e)}}const w=`<div class='container'>
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
<br>
<blockquote>
<h3 id="info">Info</h3>
<p>If you see version 2.0.0 or greater and it doesn't throw any errors, you have RubyJS-Vite installed correctly.</p>
</blockquote>
<br>
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
</div>`,y=`<div class='container'>
  <h1 id="api-reference">API Reference</h1>
  <br>
  <p>This is the basic API of the modules, or classes, of the RubyJS application itself. They are written in Ruby language and can be further used to create custom plugins. In order to navigate which module belongs where. They have submodules starting with the 'lib' component tag. The basic module is 'RJSV', in which we find the main() method. This executes a particular function marked 'state'.</p>
  <p>The API does not specify basic constants in the module like application name and root folder. This is because they are defined directly in the 'bin/rjsv' executable.</p>
  
  <p><em>These are constants:</em></p>
  <ul>
    <li><strong>APP_NAME</strong></li>
    <li><strong>ROOT</strong></li>
  </ul>
  <br>
  <blockquote>
    <h3 id="info">Info</h3>
    <p>Modules or classes don't need to be imported in plugins, they are already imported when the RubyJS application starts.</p>
  </blockquote>
  <br>
  <p>API reference is automatically generated from Ruby scripts. If you want to see the source script, just click on the link below the module or class name.</p>  
</div>`,b=`<div class='container'>
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
</div>`,j=`<div class='container'>
  <h1 id="plugins">Plugins</h1>
<p>It is an extension element of the CLI application. If a plugin is inserted into the root project, RubyJS will recognize the existence of the plugin in the 'plugins' folder. Everything is triggered with the 'rjsv' command and the plugin name. If we are not sure what the name of the plugin is, it is recommended to use the help command. This will print out all the arguments to the application itself with and plugins.</p>
<p><em>Here is the command to display the help:</em></p>
<pre class="hljs"><code><div>rjsv -h
</div></code></pre>
<h2 id="1-location">1 Location</h2>
<p>As I mentioned before, the plugin is placed in the 'plugins' folder, which is located in the root folder of the project. Anything that can run a RubyJS application is taken as a project. As a RubyJS-Vite project itself, it already has its own plugin called 'scaffold'. So, it can be used all the time where it is needed.</p>
<p><em>As an example, here I will give a tree structure of folders:</em></p>
<pre class="hljs"><code><div>A
└── plugins
    ├── markdown
    └── vue
B
└── plugins
    ├── docs
    └── react
</div></code></pre>
<blockquote>
<h3 id="info">Info</h3>
<p>Plugins are relative to projects. If project A has a specific plugin, you won't see that plugin in project B.</p>
</blockquote>
<h3 id="11-home-directory-for-easy-access">1.1 Home directory for easy access</h3>
<p>There is another way to extend plugins using the home directory. Just create a new hidden file called '.rjsv/plugins' in your home directory. Then our program will automatically recognize it and allow you to use plugins in all projects created with RubyJS tool.</p>
<p><em>Here is an example of the plugin's location in the home directory:</em></p>
<pre class="hljs"><code><div><span class="hljs-variable">$HOME</span>/.rjsv/plugins
</div></code></pre>
<h2 id="2-development">2 Development</h2>
<p>If you are developing a project with RubyJS and you need to change the way functions work, you need to create a specific plugin. To create a plugin, we need to know a few criteria to be able to initialize it in the CLI of the application. If these criteria are met and the specific plugin can initialize, then we can write the function logic.</p>
<blockquote>
<h3 id="info">Info</h3>
<p>Here it should be emphasized that we can use the API Reference to manipulate an existing function. Most functions are independent and reusable.</p>
</blockquote>
<h3 id="21-criteria">2.1 Criteria</h3>
<p><em>Here is a list of criteria to be followed:</em></p>
<ol>
<li>Structure the folders so that everything is under the plugin name in the 'lib' folder.</li>
<li>Initialization is done in the 'init.rb' file. In it, the class 'Init' is written, which inherits the ready abstract class 'RSJV::Plugin'.</li>
<li>The 'Init' class is nested in modules to indicate that it is a plugin with that name.</li>
<li>The 'Init' class is taken as a representative content snippet of the plugin. Imported scripts are to be written here, and abstract functions are to be wrapped to run functions from different libraries (there should be no logic here).</li>
<li>The name of the plugin is automatically written according to the name of the module, which should be the third nested one.</li>
</ol>
<p>I have described 5 criteria to follow when creating your own plugin. In order to understand it better, I will elaborate on each criterion separately.</p>
<h3 id="211-folder-structure">2.1.1 Folder Structure</h3>
<p>A folder structure is needed to better organize libraries. Therefore it is essential to make sure that the plugin itself is in the plugins folder and then in a folder under its own name. It should have a libraries folder and an initialization file in it. RubyJS recognizes this structuring and knows in advance that it will find there all the important information or functions to be run.</p>
<p><em>Here is an example of the tree structure:</em></p>
<pre class="hljs"><code><div>.
└── plugins
    └── &lt;plugin name&gt;
        └── lib
            └── init.rb
</div></code></pre>
<h3 id="212-initialization-file">2.1.2 Initialization File</h3>
<p>Initialization is done in the 'init.rb' file. In it, the class 'Init' is written, which inherits the ready abstract class <a href="#1-7-lib/rjsv/plugin">RSJV::Plugin</a>. You need to know this abstract class, mainly because of the abstract methods. The methods should be defined in the class and populated.</p>
<p><em>It is these abstract methods:</em></p>
<ul>
<li><strong>description</strong> - a short description of the plugin, which will be printed during help.</li>
<li><strong>arguments</strong> - initialization of arguments if the plugin is running.</li>
<li><strong>init</strong> - initialization method that starts the logic of the plugin functions. It is similar to a method like main().</li>
</ul>
<p><em>Here is a sample of the listed class:</em></p>
<pre class="hljs"><code><div><span class="hljs-comment"># lib/init.rb</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Init</span> &lt; RJSV::Plugin</span>
  <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">description</span></span>
  <span class="hljs-keyword">end</span>

  <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">arguments</span></span>
  <span class="hljs-keyword">end</span>

  <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">init</span><span class="hljs-params">()</span></span>
  <span class="hljs-keyword">end</span>
<span class="hljs-keyword">end</span>
</div></code></pre>
<h3 id="213-nesting-modules">2.1.3 Nesting Modules</h3>
<p>You need to pay attention to the structure of the modules when creating a plugin. In order for RubyJS to recognize a custom plugin, it looks for all classes in the RJSV::Plugins module. If they are not there, it cannot recognize that it is a plugin.</p>
<p><em>Therefore, the initialization file should look similar:</em></p>
<pre class="hljs"><code><div><span class="hljs-comment"># lib/init.rb</span>

<span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">RJSV</span></span>
  <span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">Plugins</span></span>
    <span class="hljs-class"><span class="hljs-keyword">module</span> &lt;PluginName&gt;</span>
      <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Init</span> &lt; RJSV::Plugin</span>
        <span class="hljs-comment"># ...</span>
      <span class="hljs-keyword">end</span>
    <span class="hljs-keyword">end</span>
  <span class="hljs-keyword">end</span>
<span class="hljs-keyword">end</span>
</div></code></pre>
<blockquote>
<h3 id="info">Info</h3>
<p>When creating plugin libraries, the structure of the modules should also be followed. If it is not followed, there is a possible conflict of functions from different plugins or separate RubyJS applications.</p>
</blockquote>
<h3 id="214-representative-content-snippet">2.1.4 Representative Content Snippet</h3>
<p>Simply put, an initialization file is like the contents of a book. If we open this file, we can see everything the plugin contains and what functions it runs when it initializes.</p>
<p><em>Here is an example of what an initialization file should look like, for the scaffold plugin:</em></p>
<pre class="hljs"><code><div><span class="hljs-comment"># lib/init.rb</span>

<span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">RJSV</span></span>
  <span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">Plugins</span></span>
    <span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">Scaffold</span></span>
      require_relative <span class="hljs-string">'./scaffold/cli/arguments'</span>

      require_relative <span class="hljs-string">'./scaffold/vite'</span>
      require_relative <span class="hljs-string">'./scaffold/states'</span>
      require_relative <span class="hljs-string">'./scaffold/create'</span>

      <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Init</span> &lt; RJSV::Plugin</span>
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">initialize</span></span>
          @arguments_cli = RJSV::Plugins::Scaffold::CLI::Arguments
        <span class="hljs-keyword">end</span>

        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">description</span></span>
          <span class="hljs-string">"Scaffolding can create new\\n"</span> +
          <span class="hljs-string">"projects or create new elements."</span>
        <span class="hljs-keyword">end</span>

        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">arguments</span></span>
          @arguments_cli.init(<span class="hljs-keyword">self</span>)
        <span class="hljs-keyword">end</span>

        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">init</span><span class="hljs-params">()</span></span>
          Scaffold::States.create_web_state(@arguments_cli.options)
          Scaffold::States.create_element_state(@arguments_cli.options)
        <span class="hljs-keyword">end</span>
      <span class="hljs-keyword">end</span>
    <span class="hljs-keyword">end</span>
  <span class="hljs-keyword">end</span>
<span class="hljs-keyword">end</span>
</div></code></pre>
<h3 id="215-plugin-name">2.1.5 Plugin Name</h3>
<p>The plugin name is automatically written from the third module. Therefore it is important to have the third module written. So the 'RJSV::Plugin.name()' method is not abstract, but it can be overloaded. Overloading this function is rare, but possible if we want to have a specific plugin name.</p>
<p><em>Here is a sample name of the third plugin:</em></p>
<pre class="hljs"><code><div><span class="hljs-comment"># lib/init.rb</span>

<span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">RJSV</span></span>
  <span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">Plugins</span></span>
    <span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">Scaffold</span>  <span class="hljs-comment"># This is the 'scaffold' plugin name.</span></span>
    <span class="hljs-comment">#...</span>
</div></code></pre>
<p><em>Or here is an example of overloading the 'name()' method, which shortens the plugin name:</em></p>
<pre class="hljs"><code><div><span class="hljs-comment"># lib/init.rb</span>

<span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">RJSV</span></span>
  <span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">Plugins</span></span>
    <span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">Scaffold</span></span>
      <span class="hljs-comment">#...</span>
      <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Init</span> &lt; RJSV::Plugin</span>
        <span class="hljs-comment">#...</span>
        <span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">name</span></span>
          <span class="hljs-string">'scaf'</span>
        <span class="hljs-keyword">end</span>
        <span class="hljs-comment">#...</span>
      <span class="hljs-keyword">end</span>
    <span class="hljs-keyword">end</span>
  <span class="hljs-keyword">end</span>
<span class="hljs-keyword">end</span>
</div></code></pre>
<h3 id="22-logic-of-functions">2.2 Logic of Functions</h3>
<p>Function logic should be split into libraries and should not be in the initialization file itself. When writing functions, we can use predefined functions in the RJSV module. It's a good idea to read the API Reference, which breaks down the module or function classes. If we use a function from the RJSV module, it is recommended to write the whole path to the function.</p>

</div>`,v=`<div class='container'>
  <h1 id="scaffold">Scaffold</h1>
  <p>This is a plugin that extends the functionality of RubyJS-Vite. As the name implies, it is a scaffold that can create new projects and elements for an existing web project. To run this plugin, just type the name of the plugin (which is 'scaffold') after the command and use the ideal argument for the functionality. If you don't know what functionality exists, just view the help.</p>
  <p><em>The command to view the help for scaffold:</em></p>
<pre class="hljs"><code><div>rjsv scaffold -h
</div></code></pre>
  <h2 id="1-web">1 Web</h2>
  <p>This is an argument that can create a new web project. Just type the argument and add the project name after it. The project is created in the directory you have set as the default terminal directory. After the project is successfully created, the terminal will print the information procedure and it will tell you how to turn on the development server.</p>
  <p><em>Here is the command to create a web project:</em></p>
<pre class="hljs"><code><div>rjsv scaffold web NAME
</div></code></pre>
  <h2 id="2-element">2 Element</h2>
  <p>It is another argument that creates an element for an existing web project. This element is created in a specific element folder with an initialization file. After creation, the terminal will list the name under which you can call the element in the HTML file. The initialization file needs to be imported into the 'main.*.rb' file to recognize the server, the already existing elements.</p>
  <p><em>The command to create the element:</em></p>
<pre class="hljs"><code><div>rjsv scaffold element NAME
</div></code></pre>
  <p><em>Here is a Ruby script for importing existing elements:</em></p>
<pre class="hljs"><code><div><span class="hljs-comment"># src/rb/main.*.rb</span>

<span class="hljs-comment">#...</span>
import <span class="hljs-string">'./elements'</span>
<span class="hljs-comment">#...</span>
</div></code></pre>  
</div>`,k=`<div class='container'>
<h1 id="table-users">Tutorial</h1>
<br>
<p>In this tutorial, we'll show how to create a web project using scaffolding and adding a new element. The element will render a table with user information that we have stored in a json file. This is a simple project so we won't be creating anything complicated for styling.</p>
<h2 id="1-new-project">1 New Project</h2>
<p>In order to start developing, we need RubyJS-Vite, so make sure you already have this tool since version 2.0.0. Using the 'scaffold' plugin, we will create a project called 'tutorial_table_users'. Make sure the default directory is set to the desktop. This is where the already created web project will be located.</p>
<p><em>Here is the overall command to set up the directory and create the web project:</em></p>
<pre class="hljs"><code><div><span class="hljs-built_in">cd</span> ~/Desktop &amp;&amp;
rjsv scaffold web tutorial_table_users
</div></code></pre>
<p>After creation, the terminal tells us that the project is already created and we can access it in the directory and start the server. If we do so, the server starts and we get the url address where we can view the site. If you issue 'Hello RubyJS' on the site, then you have a properly working server with the RubyJS-Vite tool.</p>
<p><em>Here is the command to start the server:</em></p>
<pre class="hljs"><code><div><span class="hljs-built_in">cd</span> tutorial_table_users &amp;&amp;
bin/server
</div></code></pre>
<h2 id="2-creating-an-element">2 Creating an Element</h2>
<p>We have already created a web project and we create a new element using the 'scaffold' plugin. This plugin takes an argument named 'element' and we type the name of the element as a parameter. We name the element 'table_users' and let it be created. Once created, the terminal will tell us that it has modified the files and the name of the element to use in the HTML syntax.</p>
<p><em>Here is the command to create the new element:</em></p>
<pre class="hljs"><code><div>rjsv scaffold element table_users
</div></code></pre>
<h3 id="21-importing-elements">2.1 Importing Elements</h3>
<p>In order for the server to recognize the created elements, it is necessary to import the library that initializes the elements. This is the 'elements.js.rb' file. This is done by opening the 'main.js.rb' file and writing the import of the required file here.</p>
<p><em>Here is an example script:</em></p>
<pre class="hljs"><code><div><span class="hljs-comment"># src/rb/main.js.rb</span>

import <span class="hljs-string">'../css/style.css'</span>

import <span class="hljs-string">'./elements'</span>
<span class="hljs-comment">#...</span>
</div></code></pre>
<p>After inserting the import, save the file and the server will respond immediately. From now on we can insert elements in HTML syntax and they are non-binding.</p>
<h2 id="3-element-table-users">3 Element Table Users</h2>
<p>Now we need the element to be in HTML. We do this by using 'innerHTML' in the 'main.js.rb' file to insert the DOM tag 'elm-table-users'. This will run the script in 'elm_table_users.js.rb'. We will then modify the script to use a single method called 'init_elm()'. We need to have some user data. So we will create a file 'users.json' and put some data in it. We will open this data using import and convert it into HTML syntax. This will create a table, which we will further customize to a neater styling using a 'style.css' file.</p>
<h3 id="31-inner-html">3.1 Inner HTML</h3>
<p>So, first we edit the 'main.js.rb' file and insert the DOM label of our already created element into the innerHTML.</p>
<p><em>Here is the script of the solution:</em></p>
<pre class="hljs"><code><div><span class="hljs-comment"># src/rb/main.js.rb</span>

<span class="hljs-comment">#...</span>
document.querySelector(<span class="hljs-string">'#app'</span>).innerHTML = <span class="hljs-string">"&lt;elm-table-users&gt;&lt;/elm-table-users&gt;"</span>
</div></code></pre>
<h3 id="32-json">3.2 Json</h3>
<p>Another thing needed for rendering data is a json file. Therefore, this will list the user content that will be put into the 'users.json' file. We then import it over the ElmTableUsers class to have this data present in the 'elm_table_users.js.rb' file.</p>
<h3 id="321-users-content">3.2.1 Users Content</h3>
<p>This dumped content is stored in the 'users.json' file. Therefore it is necessary to create the necessary folder or file.</p>
<pre class="hljs"><code><div>{
  <span class="hljs-attr">"users"</span>: [
    {
      <span class="hljs-attr">"company"</span>: <span class="hljs-string">"Alfreds Futterkiste"</span>,
      <span class="hljs-attr">"contact"</span>: <span class="hljs-string">"Maria Anders"</span>,
      <span class="hljs-attr">"country"</span>: <span class="hljs-string">"Germany"</span>
    },
    {
      <span class="hljs-attr">"company"</span>: <span class="hljs-string">"Centro comercial Moctezuma"</span>,
      <span class="hljs-attr">"contact"</span>: <span class="hljs-string">"Francisco Chang"</span>,
      <span class="hljs-attr">"country"</span>: <span class="hljs-string">"Mexico"</span>
    },
    {
      <span class="hljs-attr">"company"</span>: <span class="hljs-string">"Ernst Handel"</span>,
      <span class="hljs-attr">"contact"</span>: <span class="hljs-string">"Roland Mendel"</span>,
      <span class="hljs-attr">"country"</span>: <span class="hljs-string">"Austria"</span>
    }
  ]
}
</div></code></pre>
<h3 id="322-import-content">3.2.2 Import Content</h3>
<p>Finally, we import the container so that the server recognizes that it is a JSON file. We do this by appending an extension after the file. We'll put the import in the 'elm_table_users.js.rb' file, so we need to modify it. We will wrap the import under the 'usersObj' name.</p>
<p><em>The modification should look like this:</em></p>
<pre class="hljs"><code><div><span class="hljs-comment"># src/rb/elements/elm_table_users.js.rb</span>

import <span class="hljs-string">'usersObj'</span>, <span class="hljs-string">'../../json/users.json'</span>

export default <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ElmTableUsers</span> &lt; HTMLElement</span>
<span class="hljs-comment">#...</span>
</div></code></pre>
<h3 id="33-init-element">3.3 Init Element</h3>
<p>In order to render everything, we need to modify the initialization of the element. Therefore, in the 'elm_table_users.js.rb' file we will modify the 'init_elm()' function and modify the variable to render the table. To make the table have some data, we will create an anonymous function that will create a nested element for the table.</p>
<h3 id="331-template">3.3.1 Template</h3>
<p>We'll start by preparing the temple. The template will contain a name and a table with three columns. The columns will have their own name and will not be empty.</p>
<p><em>The modification of the 'init_elm()' function will be as follows:</em></p>
<pre class="hljs"><code><div><span class="hljs-comment"># src/rb/elements/elm_table_users.js.rb</span>

<span class="hljs-comment">#...</span>
<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">init_elm</span><span class="hljs-params">()</span></span>
  template = <span class="hljs-string">""</span><span class="hljs-string">"
  &lt;h1&gt;Users&lt;/h1&gt;
  &lt;table&gt;
    &lt;tr&gt;
      &lt;th&gt;Company&lt;/th&gt;
      &lt;th&gt;Contact&lt;/th&gt;
      &lt;th&gt;Country&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/table&gt;
  "</span><span class="hljs-string">""</span>

  <span class="hljs-keyword">self</span>.innerHTML = template
<span class="hljs-keyword">end</span>
<span class="hljs-comment">#...</span>
</div></code></pre>
<h3 id="332-anonymous-function">3.3.2 Anonymous Function</h3>
<p>To insert data from the 'users.json' file, we open its container and start exploring the users. The exploration is done via a loop, which gives us one user and we can manipulate their data. So we'll put them into a template that is designed to nest the information for that column separately. The anonymous function will return HTML content with the elements already prepared. This anonymous function, needs to be called inside the base templates and under 'tr' markup which has column names inside. All of the above is again modified in the 'init_elm()' function.</p>
<p><em>Another modification of the 'init_elm()' function:</em></p>
<pre class="hljs"><code><div><span class="hljs-comment"># src/rb/elements/elm_table_users.js.rb</span>

<span class="hljs-comment">#...</span>
<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">init_elm</span><span class="hljs-params">()</span></span>
  l_tr_users = lambda <span class="hljs-keyword">do</span>
    dom_elements = []
    users_obj.users.each <span class="hljs-keyword">do</span> <span class="hljs-params">|user|</span>
      template = <span class="hljs-string">""</span><span class="hljs-string">"
      &lt;tr&gt;
        &lt;td&gt;<span class="hljs-subst">#{user.company}</span>&lt;/td&gt;
        &lt;td&gt;<span class="hljs-subst">#{user.contact}</span>&lt;/td&gt;
        &lt;td&gt;<span class="hljs-subst">#{user.country}</span>&lt;/td&gt;
      &lt;/tr&gt;
      "</span><span class="hljs-string">""</span>
      dom_elements &lt;&lt; template
    <span class="hljs-keyword">end</span>
    dom_elements.join(<span class="hljs-string">"\\n"</span>)
  <span class="hljs-keyword">end</span>

  template = <span class="hljs-string">""</span><span class="hljs-string">"
  &lt;h1&gt;Users&lt;/h1&gt;
  &lt;table&gt;
    &lt;tr&gt;
      &lt;th&gt;Company&lt;/th&gt;
      &lt;th&gt;Contact&lt;/th&gt;
      &lt;th&gt;Country&lt;/th&gt;
    &lt;/tr&gt;
    <span class="hljs-subst">#{l_tr_users()}</span>
  &lt;/table&gt;
  "</span><span class="hljs-string">""</span>

  <span class="hljs-keyword">self</span>.innerHTML = template
<span class="hljs-keyword">end</span>
<span class="hljs-comment">#...</span>
</div></code></pre>
<h3 id="34-stylization">3.4 Stylization</h3>
<p>If you have the server turned on and you are viewing a web project in the browser, you can see the organized data with the users. There is no stylization that would be clearer. We can solve this problem simply by modifying the 'style.css' file and adding values for table, td, th and tr.</p>
<pre class="hljs"><code><div><span class="hljs-comment">/* src/css/style.css */</span>

<span class="hljs-selector-tag">table</span> {
  <span class="hljs-attribute">font-family</span>: arial, sans-serif;
  <span class="hljs-attribute">border-collapse</span>: collapse;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-tag">td</span>, <span class="hljs-selector-tag">th</span> {
  <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#bababa</span>;
  <span class="hljs-attribute">text-align</span>: left;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">8px</span>;
}

<span class="hljs-selector-tag">tr</span><span class="hljs-selector-pseudo">:nth-child(even)</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#dddddd</span>;
}
</div></code></pre>
<h2 id="4-conclusion">4 Conclusion</h2>
<p>If we save the css file, we can see the change immediately and we can see a neater stylization of the table. If any file is changed (if it is imported), the server records the change and restarts the server immediately. This is a quick moment that we don't even notice that the server has restarted. Which is a big advantage for web project development.</p>
<p>RubyJS-Vite is a tool that communicates well with the Vite tool and in real time. The magic is that when the server is turned on, RubyJS-Vite is turned on after the fact and recognizes all file event activity in the defined path where the RB files are stored. If there is an event then RubyJS transforms the script into a JS file and the Vite tool, recognizes any files with JS syntax and it communicates with the server.</p>
<p>As far as the 'scaffold' plugin is concerned, it should assist in faster project development. We tried out how to create an element in that tutorial and didn't have to go round a new round by not having to write all the script that keeps repeating if we want to have multiple elements in a web project.</p>

</div>`;class _ extends HTMLElement{constructor(){super(),this._hNic=e=>{let n=typeof e.detail=="object";return this.changeContent(e.detail,n)},this._html={gettingStarted:w,apiReference:y,introduction:b,plugins:j,pluginScaffold:v,tutorialTableUsers:k}}connectedCallback(){return document.addEventListener(EVENTS.navItemContent,this._hNic)}disconnectedCallback(){return document.removeEventListener(EVENTS.navItemContent,this._hNic)}initElm(e){let n=()=>{let a=[];for(let l=1;l<e.comments_with_keywords.length;l++){let r=e.comments_with_keywords[l],h=`${`
        <div class=''>
          <h4>${r.keyword} ${r.name}</h4>
          <p>${r.comment}</p>
          <br>
        <div>
        `}`;a.push(h)}return a.join(`
`)},i=`${e.path}/${e.file}`,t=e.comments_with_keywords[0],s=`${`
    <div class='container'>
      <h1>${t.name}</h1>
      
      <ul class='nav flex-column'>
        <li class='nav-item'>
          <h3 style='padding: var(--bs-nav-link-padding-y) var(--bs-nav-link-padding-x);'>${t.keyword}</h3>
        </li>
        <li class='nav-item'>
          <a class='nav-link active' href='${GH_PROFILE_URL}/${i}' target='_blank'>${i}</a>
        </li>
      </ul>
      <br>
      <p class=''>${t.comment}</p>
      <br>
      ${n()}
    </div>
    `}`;return this.innerHTML=s}initHtml(e){return e=e.replaceAll("#{GH_PROFILE_URL}",GH_PROFILE_URL.replace("/blob/main","")).replace("#{DOCS_API_VERSION}",DOCS_API_VERSION),this.innerHTML=e}changeContent(e,n){return n?this.initElm(e):this.initHtml(this._html[e])}}class I extends HTMLElement{constructor(){super(),this.initElm()}initElm(){let e=`${`
    <header class='mb-3'>
      <div class='container d-flex flex-wrap justify-content-center'>
        <a href='#introduction' onclick='navItemCategoryClick("introduction")' class='d-flex align-items-center link-body-emphasis text-decoration-none'>
          <img src='./rjsv.svg' width='64'/>
          <span class='display-6 fs-3 px-3'>${APP_NAME} | Docs</span>
        </a>
      </div>
    </header>
    `}`;return this.innerHTML=e}}class T extends HTMLElement{constructor(){super(),this.initElm()}initElm(){let e=`${`
    <footer class='py-3'>
      <p class='text-center text-body-secondary mb-0'>Powered by docs plugin. Generated on: ${DOCS_API_GENERATED}</p>
    </footer>
    `}`;return this.innerHTML=e}}class S extends HTMLElement{constructor(){super(),this._hHashChange=()=>this.enterHash(),this.initElm(),this.enterHash()}connectedCallback(){return window.addEventListener("hashchange",this._hHashChange)}disconnectedCallback(){return window.removeEventListener("hashchange",this._hHashChange)}initElm(){let e=`
    <div class='py-3'>
      <elm-header></elm-header>
      <main>
        <elm-content></elm-content>
      </main>
      <elm-footer></elm-footer>
    </div>
    `;return this.innerHTML=e}enterHash(){return location.hash?this.endpoint(location.hash.replace("#","")):this.endpoint("0-introduction")}endpoint(e){let n=e.split("-");switch(Number(n[0])){case 0:let t=n.map((a,l)=>{if(l>1)return a.charAt(0).toUpperCase()+a.slice(1);if(l>0)return a}).join("");navItemCategoryClick(t);break;case 1:let s=n[1];navItemContentClick(s)}}}window.customElements.define("elm-content",g);window.customElements.define("elm-main-content",_);window.customElements.define("elm-header",I);window.customElements.define("elm-footer",T);window.customElements.define("elm-home",S);let R=class{static send(e,n=null){return e=new CustomEvent(e,{detail:n}),document.dispatchEvent(e)}};window.Events=R;document.querySelector("#app").innerHTML="<elm-home></elm-home>";
