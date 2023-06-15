module RJSV
  module Plugins
    module Docs
      require_relative './docs/core/content'
      require_relative './docs/cli/arguments'
      require_relative './docs/states'
      require_relative './docs/generate'

      class Init < RJSV::Plugin
        def initialize
          @arguments_cli = RJSV::Plugins::Docs::CLI::Arguments
        end

        def description
          "Docs for generating information from modules."
        end

        def arguments
          @arguments_cli.init(self)
        end

        def init()
          Docs::States.generate_json_state(@arguments_cli.options)
        end
      end
    end
  end
end
