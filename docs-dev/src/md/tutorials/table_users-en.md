# Table Users

In this tutorial, we'll show how to create a web project using scaffolding and adding a new element. The element will render a table with user information that we have stored in a json file. This is a simple project so we won't be creating anything complicated for styling.

## 1 New Project

In order to start developing, we need RubyJS-Vite, so make sure you already have this tool since version 2.0.0. Using the 'scaffold' plugin, we will create a project called 'tutorial_table_users'. Make sure the default directory is set to the desktop. This is where the already created web project will be located.

*Here is the overall command to set up the directory and create the web project:*

```bash
cd ~/Desktop &&
rjsv scaffold web tutorial_table_users
```

After creation, the terminal tells us that the project is already created and we can access it in the directory and start the server. If we do so, the server starts and we get the url address where we can view the site. If you issue 'Hello RubyJS' on the site, then you have a properly working server with the RubyJS-Vite tool.

*Here is the command to start the server:*

```bash
cd tutorial_table_users &&
bin/server
```

## 2 Creating an Element

We have already created a web project and we create a new element using the 'scaffold' plugin. This plugin takes an argument named 'element' and we type the name of the element as a parameter. We name the element 'table_users' and let it be created. Once created, the terminal will tell us that it has modified the files and the name of the element to use in the HTML syntax.

*Here is the command to create the new element:*

```bash
rjsv scaffold element table_users
```

### 2.1 Importing Elements

In order for the server to recognize the created elements, it is necessary to import the library that initializes the elements. This is the 'elements.js.rb' file. This is done by opening the 'main.js.rb' file and writing the import of the required file here.

*Here is an example script:*

```ruby
# src/rb/main.js.rb

import '../css/style.css'

import './elements'
#...
```

After inserting the import, save the file and the server will respond immediately. From now on we can insert elements in HTML syntax and they are non-binding.

## 3 Element Table Users

Now we need the element to be in HTML. We do this by using 'innerHTML' in the 'main.js.rb' file to insert the DOM tag 'elm-table-users'. This will run the script in 'elm_table_users.js.rb'. We will then modify the script to use a single method called 'init_elm()'. We need to have some user data. So we will create a file 'users.json' and put some data in it. We will open this data using import and convert it into HTML syntax. This will create a table, which we will further customize to a neater styling using a 'style.css' file.

### 3.1 Inner HTML

So, first we edit the 'main.js.rb' file and insert the DOM label of our already created element into the innerHTML.

*Here is the script of the solution:*

```ruby
# src/rb/main.js.rb

#...
document.querySelector('#app').innerHTML = "<elm-table-users></elm-table-users>"
```

### 3.2 Json

Another thing needed for rendering data is a json file. Therefore, this will list the user content that will be put into the 'users.json' file. We then import it over the ElmTableUsers class to have this data present in the 'elm_table_users.js.rb' file.

### 3.2.1 Users Content

This dumped content is stored in the 'users.json' file. Therefore it is necessary to create the necessary folder or file.

```json
{
  "users": [
    {
      "company": "Alfreds Futterkiste",
      "contact": "Maria Anders",
      "country": "Germany"
    },
    {
      "company": "Centro comercial Moctezuma",
      "contact": "Francisco Chang",
      "country": "Mexico"
    },
    {
      "company": "Ernst Handel",
      "contact": "Roland Mendel",
      "country": "Austria"
    }
  ]
}
```

### 3.2.2 Import Content

Finally, we import the container so that the server recognizes that it is a JSON file. We do this by appending an extension after the file. We'll put the import in the 'elm_table_users.js.rb' file, so we need to modify it. We will wrap the import under the 'usersObj' name.

*The modification should look like this:*

```ruby
# src/rb/elements/elm_table_users.js.rb

import 'usersObj', '../../json/users.json'

export default class ElmTableUsers < HTMLElement
#...
```

### 3.3 Init Element

In order to render everything, we need to modify the initialization of the element. Therefore, in the 'elm_table_users.js.rb' file we will modify the 'init_elm()' function and modify the variable to render the table. To make the table have some data, we will create an anonymous function that will create a nested element for the table.

### 3.3.1 Template

We'll start by preparing the temple. The template will contain a name and a table with three columns. The columns will have their own name and will not be empty.

*The modification of the 'init_elm()' function will be as follows:*

```ruby
# src/rb/elements/elm_table_users.js.rb

#...
def init_elm()
  template = """
  <h1>Users</h1>
  <table>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
  </table>
  """

  self.innerHTML = template
end
#...
```

### 3.3.2 Anonymous Function

To insert data from the 'users.json' file, we open its container and start exploring the users. The exploration is done via a loop, which gives us one user and we can manipulate their data. So we'll put them into a template that is designed to nest the information for that column separately. The anonymous function will return HTML content with the elements already prepared. This anonymous function, needs to be called inside the base templates and under 'tr' markup which has column names inside. All of the above is again modified in the 'init_elm()' function.

*Another modification of the 'init_elm()' function:*

```ruby
# src/rb/elements/elm_table_users.js.rb

#...
def init_elm()
  l_tr_users = lambda do
    dom_elements = []
    users_obj.users.each do |user|
      template = """
      <tr>
        <td>#{user.company}</td>
        <td>#{user.contact}</td>
        <td>#{user.country}</td>
      </tr>
      """
      dom_elements << template
    end
    dom_elements.join("\n")
  end

  template = """
  <h1>Users</h1>
  <table>
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
    #{l_tr_users()}
  </table>
  """

  self.innerHTML = template
end
#...
```

### 3.4 Stylization

If you have the server turned on and you are viewing a web project in the browser, you can see the organized data with the users. There is no stylization that would be clearer. We can solve this problem simply by modifying the 'style.css' file and adding values for table, td, th and tr.

```css
/* src/css/style.css */

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #bababa;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
```

## 4 Conclusion

If we save the css file, we can see the change immediately and we can see a neater stylization of the table. If any file is changed (if it is imported), the server records the change and restarts the server immediately. This is a quick moment that we don't even notice that the server has restarted. Which is a big advantage for web project development.

RubyJS-Vite is a tool that communicates well with the Vite tool and in real time. The magic is that when the server is turned on, RubyJS-Vite is turned on after the fact and recognizes all file event activity in the defined path where the RB files are stored. If there is an event then RubyJS transforms the script into a JS file and the Vite tool, recognizes any files with JS syntax and it communicates with the server.

As far as the 'scaffold' plugin is concerned, it should assist in faster project development. We tried out how to create an element in that tutorial and didn't have to go round a new round by not having to write all the script that keeps repeating if we want to have multiple elements in a web project.