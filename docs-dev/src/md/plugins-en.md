# Plugins

It is an extension element of the CLI application. If a plugin is inserted into the root project, RubyJS will recognize the existence of the plugin in the 'plugins' folder. Everything is triggered with the 'rjsv' command and the plugin name. If we are not sure what the name of the plugin is, it is recommended to use the help command. This will print out all the arguments to the application itself with and plugins.

*Here is the command to display the help:*

```bash
rjsv -h
```

## 1 Location

As I mentioned before, the plugin is placed in the 'plugins' folder, which is located in the root folder of the project. Anything that can run a RubyJS application is taken as a project. As a RubyJS-Vite project itself, it already has its own plugin called 'scaffold'. So, it can be used all the time where it is needed.

*As an example, here I will give a tree structure of folders:*

```txt
A
└── plugins
    ├── markdown
    └── vue
B
└── plugins
    ├── docs
    └── react
```

> ### Info
> Plugins are relative to projects. If project A has a specific plugin, you won't see that plugin in project B.

## 2 Development

If you are developing a project with RubyJS and you need to change the way functions work, you need to create a specific plugin. To create a plugin, we need to know a few criteria to be able to initialize it in the CLI of the application. If these criteria are met and the specific plugin can initialize, then we can write the function logic.

> ### Info
> Here it should be emphasized that we can use the API Reference to manipulate an existing function. Most functions are independent and reusable.

### 2.1 Criteria

*Here is a list of criteria to be followed:*

1. Structure the folders so that everything is under the plugin name in the 'lib' folder.
2. Initialization is done in the 'init.rb' file. In it, the class 'Init' is written, which inherits the ready abstract class 'RSJV::Plugin'.
3. The 'Init' class is nested in modules to indicate that it is a plugin with that name.
4. The 'Init' class is taken as a representative content snippet of the plugin. Imported scripts are to be written here, and abstract functions are to be wrapped to run functions from different libraries (there should be no logic here).
5. The name of the plugin is automatically written according to the name of the module, which should be the third nested one.

I have described 5 criteria to follow when creating your own plugin. In order to understand it better, I will elaborate on each criterion separately.

### 2.1.1 Folder Structure

A folder structure is needed to better organize libraries. Therefore it is essential to make sure that the plugin itself is in the plugins folder and then in a folder under its own name. It should have a libraries folder and an initialization file in it. RubyJS recognizes this structuring and knows in advance that it will find there all the important information or functions to be run.

*Here is an example of the tree structure:*

```txt
.
└── plugins
    └── <plugin name>
        └── lib
            └── init.rb
```

### 2.1.2 Initialization File

Initialization is done in the 'init.rb' file. In it, the class 'Init' is written, which inherits the ready abstract class [RSJV::Plugin](#1-7-lib/rjsv/plugin). You need to know this abstract class, mainly because of the abstract methods. The methods should be defined in the class and populated.

*It is these abstract methods:*

- **description** - a short description of the plugin, which will be printed during help.
- **arguments** - initialization of arguments if the plugin is running.
- **init** - initialization method that starts the logic of the plugin functions. It is similar to a method like main().

*Here is a sample of the listed class:*

```ruby
# lib/init.rb

class Init < RJSV::Plugin
  def description
  end

  def arguments
  end

  def init()
  end
end
```

### 2.1.3 Nesting Modules

You need to pay attention to the structure of the modules when creating a plugin. In order for RubyJS to recognize a custom plugin, it looks for all classes in the RJSV::Plugins module. If they are not there, it cannot recognize that it is a plugin.

*Therefore, the initialization file should look similar:*

```ruby
# lib/init.rb

module RJSV
  module Plugins
    module <PluginName>
      class Init < RJSV::Plugin
        # ...
      end
    end
  end
end
```

> ### Info
> When creating plugin libraries, the structure of the modules should also be followed. If it is not followed, there is a possible conflict of functions from different plugins or separate RubyJS applications.

### 2.1.4 Representative Content Snippet

Simply put, an initialization file is like the contents of a book. If we open this file, we can see everything the plugin contains and what functions it runs when it initializes.

*Here is an example of what an initialization file should look like, for the scaffold plugin:*

```ruby
# lib/init.rb

module RJSV
  module Plugins
    module Scaffold
      require_relative './scaffold/cli/arguments'

      require_relative './scaffold/vite'
      require_relative './scaffold/states'
      require_relative './scaffold/create'

      class Init < RJSV::Plugin
        def initialize
          @arguments_cli = RJSV::Plugins::Scaffold::CLI::Arguments
        end

        def description
          "Scaffolding can create new\n" +
          "projects or create new elements."
        end

        def arguments
          @arguments_cli.init(self)
        end

        def init()
          Scaffold::States.create_web_state(@arguments_cli.options)
          Scaffold::States.create_element_state(@arguments_cli.options)
        end
      end
    end
  end
end
```

### 2.1.5 Plugin Name

The plugin name is automatically written from the third module. Therefore it is important to have the third module written. So the 'RJSV::Plugin.name()' method is not abstract, but it can be overloaded. Overloading this function is rare, but possible if we want to have a specific plugin name.

*Here is a sample name of the third plugin:*

```ruby
# lib/init.rb

module RJSV
  module Plugins
    module Scaffold  # This is the 'scaffold' plugin name.
    #...
```

*Or here is an example of overloading the 'name()' method, which shortens the plugin name:*

```ruby
# lib/init.rb

module RJSV
  module Plugins
    module Scaffold
      #...
      class Init < RJSV::Plugin
        #...
        def name
          'scaf'
        end
        #...
      end
    end
  end
end
```
### 2.2 Logic of Functions

Function logic should be split into libraries and should not be in the initialization file itself. When writing functions, we can use predefined functions in the RJSV module. It's a good idea to read the API Reference, which breaks down the module or function classes. If we use a function from the RJSV module, it is recommended to write the whole path to the function.