module Tool
  PLUGIN_NAME = 'tool'
  PLUGIN_DESCRIPTION = "Tool for manipulating RJS files."

  module CLI
    module Arguments
      def self.init
        OptionParser.parse do |parser|
          parser.banner(
            "#{PLUGIN_DESCRIPTION}\n\n" +
            "Usage: #{APP_NAME} #{PLUGIN_NAME} [options]\n" +
            "\nOptions:"
          )
          parser.on( "-h", "--help", "Show help" ) do
            puts parser
            exit
          end
        end

        Tool.init()
      end
    end
  end

  def self.init()
    puts 'init'
  end
end