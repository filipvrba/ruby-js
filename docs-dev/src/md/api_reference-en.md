# API Reference

This is the basic API of the modules, or classes, of the RubyJS application itself. They are written in Ruby language and can be further used to create custom plugins. In order to navigate which module belongs where. They have submodules starting with the 'lib' component tag. The basic module is 'RJSV', in which we find the main() method. This executes a particular function marked 'state'.

The API does not specify basic constants in the module like application name and root folder. This is because they are defined directly in the 'bin/rjsv' executable.

*These are constants:*

- **APP_NAME**
- **ROOT**

> ### Info
> Modules or classes don't need to be imported in plugins, they are already imported when the RubyJS application starts.

API reference is automatically generated from Ruby scripts. If you want to see the source script, just click on the link below the module or class name.