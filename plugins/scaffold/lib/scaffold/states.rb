module RJSV
  module Plugins
    module Scaffold
      module States
        module_function

        def create_web_state(options)
          if options[:create_web]
            path_output = File.join(Dir.pwd, options[:create_web])
            Create.web(path_output)
          end
        end
      end#States
    end
  end
end