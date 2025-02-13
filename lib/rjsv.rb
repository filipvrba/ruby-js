require 'option_parser'
require 'json_parser'

require 'rjsv/version'
require 'rjsv/constants'
require 'rjsv/plugin'

require 'rjsv/core/event'
require 'rjsv/core/files'
require 'rjsv/core/constants'
require 'rjsv/core/string'

require 'rjsv/translate'
require 'rjsv/watch'

require 'rjsv/cli/states'
require 'rjsv/cli/signals'
require 'rjsv/cli/plugins'
require 'rjsv/cli/arguments'

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
          CLI::States.translate_state(path, @options_cli)
        end
      end

      CLI::States.watch_state(@options_cli)
    end
  end#main
end