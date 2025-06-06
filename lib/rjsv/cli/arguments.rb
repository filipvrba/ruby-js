module RJSV
  module CLI
    ##
    # Module for all arguments to the CLI application.
    # The argument initializes the OptionParser,
    # which defines the arguments in detail.
    # It is also nested with a function that adds
    # all arguments from modules.

    module Arguments
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
                                        "in certain type files.\n" ) do
          @options[:translate] = true
        end
        parser.on("-s DIR", "--source DIR", "The path or paths of the source folder(s)\n" +
                                            "where all RB files are found\n" +
                                            "(e.g., files ending in *.js.#{RJSV::Constants::SUFFIX_RB}).") do |dir|
                                            
          @options[:source] = dir
        end
        parser.on("-o DIR", "--output DIR", "The path or paths of the output folder(s)\n" +
                                            "where all Ruby code will be translated into\n" +
                                            "JavaScript with the prepared file type.\n" ) do |dir|
                                            
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

      ##
      # Options is a get method and gets
      # all options from arguments.
      
      def self.options
        @options
      end

      ##
      # It finds out if the plugin is written in the argument.

      def self.active_plugin?
        unless ARGV.empty?
          return ARGV[0].index(/^-/) == nil
        end
      end
    end#Arguments
  end
end