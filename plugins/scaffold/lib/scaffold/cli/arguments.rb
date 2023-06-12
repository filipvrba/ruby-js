module RJSV
  module Plugins
    module Scaffold
      module CLI
        module Arguments
          @options = {
            
          }

          module_function

          def init(scaffold)
            OptionParser.parse do |parser|
              parser.banner(
                "#{scaffold.description()}\n\n" +
                "Usage: #{APP_NAME} #{scaffold.name()} [options]\n" +
                "\nOptions:"
              )
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