module RJSV
  module CLI
    ##
    # This is the module that handles plugins so
    # that they are found, imported and inizialized.

    module Plugins
      PLUGIN_INFO = "(this is a plugin)"

      module_function

      ##
      # Finds all init.rb files in the plugins folder.
      # Otherwise, the absolute path is determined
      # by the Dir.pwd() method.

      def find_all_init(path = Dir.pwd)
        l_path = lambda { |p| File.join(p, 'plugins', '**', 'init.rb') }
        Dir.glob [
          l_path.call(path),
          l_path.call(ROOT),
          l_path.call(File.join(Dir.home, '.rjsv'))
        ]
      end

      ##
      # Imports all found init.rb files into Ruby script.
      #
      # Returns the classes that are imported,
      # otherwise returns an empty array.

      def require_all_init()
        find_all_init().each do |plugin_index_path|
          require plugin_index_path
        end

        if defined?(RJSV::Plugins)
          return Core::Constants.get_classes(RJSV::Plugins)
        end

        return []
      end

      ##
      # Adds a plugin argument and initializes its nested arguments.
      #
      # It chooses the name and description of the argument
      # to be the one written on behalf of the plugin, 
      # which is found from the RJSV::Plugin class.

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
          rescue => exception
            Core::Event.print('class', "The program found the '#{plugin_class.name}' class, " +
                                        "but its arguments cannot be created.\n\n")
          end
        end
      end#add_arguments

      @classes = require_all_init()
    end
  end
end