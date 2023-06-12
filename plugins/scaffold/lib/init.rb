module RJSV
  module Plugins
    class Scaffold < RJSV::Plugin
      def initialize
      end

      def description
        'lol'
      end

      def arguments
        OptionParser.parse do |parser|
          parser.banner(
            "#{description()}\n\n" +
            "Usage: #{APP_NAME} #{name()} [options]\n" +
            "\nOptions:"
          )
          parser.on( "-h", "--help", "Show help" ) do
            puts parser
            exit
          end
        end
      end#arguments

      def init()
        
      end
    end
  end
end
