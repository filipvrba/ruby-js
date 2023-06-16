require 'option_parser'
require 'json_parser'

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

##
# This is the main initialization module of
# all modules that are needed for the functionality
# of this RubyJS-Vite transpiler. The methods that
# shape the direction of the application are
# also written here.

module RJSV
  @options_cli = CLI::Arguments.options
  
  module_function

  ##
  # Block of code that handles the transpilation of scipt.
  # This is opening a Ruby scipt container file,
  # which is then converted into a JavaScript file.
  # The file is saved to the output path.

  def translate_state(path)
    if @options_cli[:translate]
      content_ruby = Core::Files.open(path)
      if content_ruby && path
        path_output = Core::Files.change_path_to_output(path, @options_cli)
        Translate.ruby_to_js_with_write(content_ruby, path_output) do |err|
          Core::Event.print('error', "#{path} #{err}")
        end
        Core::Event.print('translated', path_output)
      end
    end
  end

  ##
  # Block of code that tracks files under the input path.
  # If a file has been logged, several events are performed
  # such as to add, modify and remove logged files.
  # These then trigger procedural methods to process the requests.

  def watch_state()
    if @options_cli[:watch]
      Core::Event.print('message', 'There is now a watch for edited files.')
      Watch.modified_files(@options_cli[:source]) do |modified, added, removed|
        unless added.empty?
          added.each do |path|
            translate_state(path)
          end
        end
    
        unless modified.empty?
          modified.each do |path|
            translate_state(path)
          end
        end
    
        unless removed.empty?
          removed.each do |path|
            path_output = Core::Files.change_path_to_output(path, @options_cli)
            Core::Files.remove(path_output)
            Core::Event.print('deleted', path_output)
          end
        end
      end
    end
  end#watch_state

  ##
  # This is the main function to run the desired
  # block function scenarios. In order to arm itself
  # regarding plugins and directly Arguments,
  # this method checks the accessibility of the plugin
  # by checking if it is active or attached in
  # the argument given by the confirmed command
  # from the terminal.

  def main()
    unless CLI::Arguments.active_plugin?
      if @options_cli[:translate]
        files_rb = Core::Files.find_all(@options_cli[:source])
        files_rb.each do |path|
          translate_state(path)
        end
      end

      watch_state()
    end
  end#main
end