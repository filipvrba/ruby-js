module RJSV
  module Plugins
    module Markdown
      module CLI
        module Arguments
          @options = {
            to_html: false
          }

          module_function

          def init(plugin)
            OptionParser.parse do |parser|
              parser.banner(
                "#{plugin.description()}\n\n" +
                "Usage: #{APP_NAME} #{plugin.name()} [options]\n" +
                "\nOptions:"
              )

              parser.on( "to-html", "", "Markdown style converts to html\n" +
                                        "cascading style and recognizes folders\n" +
                                        "in src automatically.\n" ) do
                @options[:to_html] = true
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