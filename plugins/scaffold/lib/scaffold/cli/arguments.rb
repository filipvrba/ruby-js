module RJSV
  module Plugins
    module Scaffold
      module CLI
        module Arguments
          @options = {
            create_web: nil
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
              parser.on( "-cw NAME", "--create-web NAME", "Creates a new web project with\n" +
                                                          "a basic code architecture." ) do |name|
                @options[:create_web] = name
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