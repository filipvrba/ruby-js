module RJSV
  module CLI
    module Arguments
      require "option_parser"

      @options = {
        translate: false,
        watch:   false,
        source:  Dir.pwd,
        output:  Dir.pwd,
      }

      OptionParser.parse do |parser|
        parser.banner(
          "A transpiler tool that translates code\n" +
          "from Ruby to JS language and transforms it into\n" +
          "files that are readable by browsers.\n\n" +
          "Usage: #{APP_NAME} [options]\n" +
          "\nOptions:"
        )

        Plugins.add_arguments(parser)

        parser.on( "-w", "--watch", "Monitors all RB files in real time\n" +
                                    "to see if they have been modified." ) do
          @options[:watch] = true
        end
        parser.on( "-t", "--translate", "It translates all loaded RB files\n" +
                                        "into JavaScript code and stores them\n" +
                                        "in certain type files." ) do
          @options[:translate] = true
        end
        parser.on("-s DIR", "--source DIR", "The path of the source folder where\n" +
                                            "all RB files are found (example of\n" +
                                            "ending file type *.js.rb).\n") do |dir|
          @options[:source] = dir
        end
        parser.on("-o DIR", "--output DIR", "The path of the output folder where\n" +
                                            "all Ruby codes will be translated into\n" +
                                            "JavaScript with the prepared file type." ) do |dir|
          @options[:output] = dir
        end

        parser.on( "-h", "--help", "Show help" ) do
          puts parser
          exit
        end
        parser.on( "-v", "--version", "Show version" ) do
          puts "Version is #{RJSV::VERSION}"
          exit
        end
      end

      def self.options
        @options
      end
    end#arguments
  end
end