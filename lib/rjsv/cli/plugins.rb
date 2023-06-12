module RJSV
  module CLI
    module Plugins
      PLUGIN_INFO = "(this is the next level of setup)"

      module_function

      def find_all_init(path = Dir.pwd)
        Dir.glob File.join(path, 'plugins', '**', 'init.rb')
      end

      def require_all_init()
        find_all_init().each do |plugin_index_path|
          require plugin_index_path
        end

        if defined?(RJSV::Plugins)
          return Core::Constants.get_classes(RJSV::Plugins)
        end

        return []
      end

      def add_arguments(parser)
        @classes.each_with_index do |plugin_class, i|
          begin
            if plugin_class
              plugin = plugin_class.new
              parser.on(plugin.name, "", "#{plugin.description}\n" +
                  "#{PLUGIN_INFO}#{"\n" if @classes.length == i+1}" ) do
                plugin.arguments()
                plugin.init()
              end
            end
          rescue
            Core::Event.print('class', "The program found the '#{plugin_class.name}' class, " +
                                        "but its arguments cannot be created.")
          end
        end
      end#add_arguments

      @classes = require_all_init()
    end
  end
end