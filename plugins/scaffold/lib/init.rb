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
        end
      end
    end
  end
end
