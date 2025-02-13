module RJSV
  module Plugins
    module Scaffold
      module CLI
        module Arguments
          @options = {
            create_web: nil,
            element: nil,
            inputs: nil,
          }

          module_function

          def init(scaffold)
            OptionParser.parse do |parser|
              parser.banner(
                "#{scaffold.description()}\n\n" +
                "Usage: #{APP_NAME} #{scaffold.name()} [options]\n" +
                "\nOptions:"
              )

              parser.on( "web NAME", "", "Creates a new web project with\n" +
                                                          "a basic code architecture." ) do |name|
                @options[:create_web] = name
              end
              parser.on( "element NAME", "", "Creates scaffolding for the new element." ) do |name|
                @options[:element] = name
              end
              parser.on( "inputs ELEMENT", "", "It creates a CInputs component for \n" +
                                               "the specified named element.\n" ) do |name|
                @options[:inputs] = name
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