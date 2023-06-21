# Scaffold

This is a plugin that extends the functionality of RubyJS-Vite. As the name implies, it is a scaffold that can create new projects and elements for an existing web project. To run this plugin, just type the name of the plugin (which is 'scaffold') after the command and use the ideal argument for the functionality. If you don't know what functionality exists, just view the help.

*The command to view the help for scaffold:*

```bash
rjsv scaffold -h
```

## 1 Web

This is an argument that can create a new web project. Just type the argument and add the project name after it. The project is created in the directory you have set as the default terminal directory. After the project is successfully created, the terminal will print the information procedure and it will tell you how to turn on the development server.

*Here is the command to create a web project:*

```bash
rjsv scaffold web NAME
```

## 2 Element

It is another argument that creates an element for an existing web project. This element is created in a specific element folder with an initialization file. After creation, the terminal will list the name under which you can call the element in the HTML file. The initialization file needs to be imported into the 'main.*.rb' file to recognize the server, the already existing elements.

*The command to create the element:*

```bash
rjsv scaffold element NAME
```

*Here is a Ruby script for importing existing elements:*

```ruby
# src/rb/main.*.rb

#...
import './elements'
#...
```