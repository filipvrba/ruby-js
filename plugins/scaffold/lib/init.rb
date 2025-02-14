module RJSV
  module Plugins
    module Scaffold
      require_relative './scaffold/cli/arguments'

      require_relative './scaffold/vite'
      require_relative './scaffold/states'
      require_relative './scaffold/create'
      require_relative './scaffold/analyze'
      require_relative './scaffold/templates'
      require_relative './scaffold/files'

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
          Scaffold::States.create_inputs_state(@arguments_cli.options)
        end
      end
    end
  end
end
