module RJSV
  module Translate
    require 'ruby2js'

    module_function

    def ruby_to_js(content_ruby, &block)
      begin
        return Ruby2JS.convert(content_ruby)
      rescue => exception
        block.call(exception) if block
        return nil
      end
    end

    def ruby_to_js_with_write(content_ruby, path)
      content_js = ruby_to_js(content_ruby) do |err|
        Core::Event.print('error', "#{path} #{err}")
      end
      Core::Files.write_with_dir(content_js, path) if content_js
    end
  end
end