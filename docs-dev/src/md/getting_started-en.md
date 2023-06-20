# Getting Started

Before we start using the RubyJS tool, let me give you some background information. You'll learn how to install the CLI application, how to use it with basic features and a little bit about configuring the transpiler.

## 1 Installation

Installing the RubyJS CLI tool is simple and we use the Ruby language ecosystem to do it using the 'gem' command. This installs everything needed for RubyJS and then creates an executable file called 'rjsv'.

*Just type this command into the terminal to install it:*
```bash
gem install rubyjs-vite
```

After successful installation, we can test the functionality of the application by typing the RubyJS version into the terminal.

*This command will print the version:*
```bash
rjsv -v
```

> ### Info
> If you see version 2.0.0 or greater and it doesn't throw any errors, you have RubyJS-Vite installed correctly.

## 2 Basic usage

At the base RubyJS has 4 functions that are used for transpiling Ruby scripts. The most basic is defining input and output paths that will be used during transpilation. In order for transpilation to take place, it needs to be marked as active and if it is not done, no file is transpiled. The last feature is file tracking, which is useful for rapid web development and communicates with the Vite tool.

The way it works is that if we create, edit or remove a file, the tracker will capture the event that the transpilation is working with next (that's why it's important that the transpilation is always active). Once the files are transpiled into the native JavaScript syntax, the Vite tool catches the changes and it automatically restarts the server and refreshes the web page if necessary.

*Here are the 4 basic functions that are broken down into points and are applicable as the 'rjsv' cli application argument:*

1. **-s DIR, --source DIR** (The path of the source folder where all RB files are found. Example of ending file type *.js.rb.)    
2. **-o DIR, --output DIR** (The path of the output folder where all Ruby codes will be translated into JavaScript with the prepared file type.)
3. **-t, --translate** (It translates all loaded RB files into JavaScript code and stores them in certain type files.)
4. **-w, --watch** (Monitors all RB files in real time to see if they have been modified.)

### 2.1 Paths & Suffix

I'd better mention here that input and output paths can be relative. Files in the input directory for Ruby scripts should have 2x extensions. The idea is that the 1st suffix is the file type, for the output folder, and the 2nd suffix is to indicate the RB file. So if we want to store JavaScript syntax in a 'js' extension, we do that by writing two '\*.js.rb' extensions. Or, if we want to use a specific file type, we write this '\*.jsx.rb' extension (this 'jsx' extension is used for React). If we don't write 2x extension then RubyJS won't automatically recognize the file in the input folder.

## 3 Configuration

Configuration of the Ruby2JS transpiler can be done in the 'config/ruby2js.rb' file and should be allocated in the project root. If a RubyJS-Vite (rjsv) application is enabled with the transpilation argument enabled. So the config file is automatically detected and the transpilation is adapted as you expect.

You can find this configuration file if you have created a new web project using scaffolding. If you are creating a project manually, it is required that you create a configuration file. If the configuration file does not exist, Ruby2JS has predefined default configuration parameters. It shouldn't happen that RubyJS doesn't throw an error message. The error message happens when the Ruby script is poorly written and the transpiler fails to recognize the syntax.

### 3.1 Basic Configuration

The configuration can be varied, so I will list the basic file configuration here. If you don't understand the configuration, I recommend reading the [Options](https://www.ruby2js.com/docs/options) article. It will walk you through everything you need to know.

*Here is the basic configuration:*

```ruby
# config/ruby2js.rb

preset

filter :functions
filter :camelCase

eslevel 2021

include_method :class
```