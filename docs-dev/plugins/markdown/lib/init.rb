module RJSV
  module Plugins
    module Markdown
      class Init < RJSV::Plugin
        require_relative './markdown/cli/arguments'
        require_relative './markdown/states'
        require_relative './markdown/parser'

        def initialize
          @options_cli = CLI::Arguments.options
        end

        def description
          'Manipulating markdown syntax.'
        end

        def arguments
          CLI::Arguments.init(self)
        end

        def init
          States.to_html(@options_cli)
        end
      end
    end
  end
end