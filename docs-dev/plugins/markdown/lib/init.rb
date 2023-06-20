module RJSV
  module Plugins
    module Markdown
      class Init < RJSV::Plugin
        require_relative './markdown/cli/arguments'
        require_relative './markdown/states'
        require_relative './markdown/parser'
        require_relative './markdown/constants'

        def initialize
          @options_cli = CLI::Arguments.options
          Constants::APP[:name] = self.name
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