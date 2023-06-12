module RJSV
  module Plugins
    module Scaffold
      require_relative './scaffold/cli/arguments'

      class Init < RJSV::Plugin
        def initialize
          @arguments_cli = RJSV::Plugins::Scaffold::CLI::Arguments
        end

        def description
          'lol'
        end

        def arguments
          @arguments_cli.init(self)
        end#arguments

        def init()
          # p @arguments_cli.options
        end
      end
    end
  end
end
