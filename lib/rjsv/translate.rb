module RJSV
  ##
  # Here we can load everything necessary for
  # the transpilation process of Ruby script into JavaScript.
  # The transpilation process uses the Ruby2JS library.
  # The transpilation is safe and catches error messages
  # if the Ruby script has been written incorrectly.

  module Translate
    require 'ruby2js'

    module_function

    ##
    # Converts Ruby script to JavaScript using Ruby2JS library.
    # If an error occurs during transpilation, the error
    # message is raised in the next nested code block.

    def ruby_to_js(content_ruby, &block)
      begin
        return Ruby2JS.convert(content_ruby)
      rescue => exception
        block.call(exception) if block
        return nil
      end
    end

    ##
    # Converts Ruby script to JavaScript using Ruby2JS library.
    # The final transpilation is followed by saving it to
    # a file with a predefined path.

    def ruby_to_js_with_write(content_ruby, path)
      content_js = ruby_to_js(content_ruby) do |err|
        Core::Event.print('error', "#{path} #{err}")
      end
      Core::Files.write_with_dir(content_js, path) if content_js
    end
  end
end