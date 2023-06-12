require 'rjsv/version'
require 'rjsv/constants'
require 'rjsv/plugin'

require 'rjsv/core/event'
require 'rjsv/core/files'
require 'rjsv/core/constants'

require 'rjsv/cli/signals'
require 'rjsv/cli/plugins'
require 'rjsv/cli/arguments'

require 'rjsv/translate'
require 'rjsv/watch'

module RJSV
  @options_cli = CLI::Arguments.options
  
  module_function

  def translate_state(path)
    if @options_cli[:translate]
      content_ruby = Core::Files.open(path)
      if content_ruby && path
        path_output = Core::Files.change_path_to_output(path, @options_cli)
        Translate.ruby_to_js_with_write(content_ruby, path_output)
        Core::Event.print('translated', path_output)
      end
    end
  end

  def watch_state()
    if @options_cli[:watch]
      Core::Event.print('message', 'There is now a watch for edited files.')
      Watch.modified_files(@options_cli[:source]) do |modified, added, removed|
        unless added.empty?
          path = added.last
          translate_state(path)
        end
    
        unless modified.empty?
          path = modified.last
          translate_state(path)
        end
    
        unless removed.empty?
          path = removed.last
          path_output = Core::Files.change_path_to_output(path, @options_cli)
          Core::Files.remove(path_output)
          Core::Event.print('deleted', path_output)
        end
      end
    end
  end#watch_state

  def main()
    if @options_cli[:translate]
      files_rb = Core::Files.find_all(@options_cli[:source])
      files_rb.each do |path|
        translate_state(path)
      end
    end

    watch_state()
  end
end