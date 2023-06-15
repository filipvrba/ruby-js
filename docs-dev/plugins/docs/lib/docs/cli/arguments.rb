module RJSV
  module Plugins
    module Docs
      module CLI
        module Arguments
          @options = {
            generate: nil
          }

          module_function

          def init(docs)
            OptionParser.parse do |parser|
              parser.banner(
                "#{docs.description()}\n\n" +
                "Usage: #{APP_NAME} #{docs.name()} [options]\n" +
                "\nOptions:"
              )

              parser.on( "generate PATH", "", "Generates a json file from a method\n" +
                                              "from modules with a description.\n" ) do |path|
                @options[:generate] = path
              end

              parser.on( "-h", "--help", "Show help" ) do
                puts parser
                exit
              end
            end
          end

          def options
            @options
          end
        end
      end
    end
  end
end