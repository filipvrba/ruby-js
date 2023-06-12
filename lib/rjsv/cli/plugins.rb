module RJSV
  module CLI
    module Plugins
      PLUGIN_INFO = "(this is the next level of setup)"

      module_function

      def find_all_index(path = Dir.pwd)
        Dir.glob File.join(path, 'plugins', '**', 'index.rb')
      end

      def require_all_index(&block)
        indexs = []
        find_all_index().each do |plugin_index_path|
          require plugin_index_path
          
          File.open plugin_index_path do |f|
            module_name = f.read.scan(/module.*$/)[0].sub('module ', '')
            block.call(module_name) if block
            indexs << module_name
          end
        end

        return indexs
      end#require_all_index

      def add_arguments(parser)
        @modules.each_with_index do |module_name, i|
          begin
            if module_name
              constants = [
                eval("#{module_name}::PLUGIN_NAME"),
                eval("#{module_name}::PLUGIN_DESCRIPTION")
              ]
              parser.on( constants[0], "", "#{constants[1]}\n" +
                  "#{PLUGIN_INFO}#{"\n" if @modules.length == i+1}" ) do
                eval("#{module_name}::CLI::Arguments.init()")
              end
            end
          rescue
            Core::Event.print('module', "The program found the '#{module_name}' module, " +
                                        "but its arguments cannot be created.")
          end
        end
      end#add_arguments

      @modules = require_all_index()
    end
  end
end