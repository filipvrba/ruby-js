# RubyJS Vite
Web applications may be made with the help of RubyJS Vite. The programmer can avoid using JS syntax, which is helpful. Everything is done automatically; all you have to do is start the server and build a project using scaffolding.

Write your code using the JS api and Ruby syntax, and the server will automatically translate it. It then stores it in a file with the extension ".js". You will then be able to publish the project to [Vercel](https://vercel.com/) or directly to the [NPM package](https://www.npmjs.com/), and you will have a website that is written in the native JS language.

### Content
- [1 Installation](#1-installation)
- [2 Usage](#2-usage)
  - [2.1 Scaffold](#21-scaffold)
  - [2.2 More parameters](#22-more-parameters)
- [3 Development](#3-development)
- [4 Examples](#4-examples)
- [5 Contributors](#5-contributors)

## 1 Installation
The executable application and libraries are installed using the ruby gem during installation.

```bash
gem install rubyjs-vite
```

## 2 Usage
RubyJS Vite has a unique command that can be used at the terminal called **rjsv**.

### 2.1 Scaffold
The **—create** parameter should be followed by the project name if you want to create your own project.

*Use this command as an example, then follow the instructions the terminal gives you:*
```bash
rjsv --create hello
```

![rjsv-scaffold](./public/rjsv_scaffold.gif)

### 2.2 More parameters
If you only need to convert files to *.js* format rather than build scaffolding.
Therefore, there is an argument for this function called **-c** or **—compile**.

You must include an additional parameter called **-w** or **—watch** so that the compilation always happens after saving the *.rjs* file.

Other choices include which directory will be searched for updated files and which directory will house all transformed code. The code can also be converted into the chosen EC level, with 2021 as the default level. Enter **rjsv -h** in the terminal for more details.

*Example for compiling and tracking files:*
```bash
rjsv -c -w -s src/rjs -o src/js
```

![rjsv-compile-watch](./public/rjsv_cw.gif)

## 3 Development
Look in the *'lib'* folder if you want to edit this RubyJS Vite project. Everything you require for file transformation and change tracking is available. The console portion is under the *'app'* subdirectory. Everything that needs to be executed with various arguments is available here. 

*The following third-party libraries are employed:*
- [ruby2js](https://rubygems.org/gems/ruby2js)
- [listen](https://rubygems.org/gems/listen)

## 4 Examples
Here, I'll outline a few projects where RubyJS Vite was applied to alter code.

- [adb2-weapon-rjs](https://github.com/filipvrba/adb2-weapon-rjs) - Here, a web application was built with scaffolding and uploaded to Vercel.
- [suitescript-generator](https://github.com/filipvrba/suitescript-generator) - It is a console program that utilizes npm. Here, the file tracking and compilation command is employed. 

## 5 Contributors
- [Filip Vrba](https://github.com/filipvrba) - creator and maintainer
