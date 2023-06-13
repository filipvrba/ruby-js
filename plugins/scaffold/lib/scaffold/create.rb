module RJSV
  module Plugins
    module Scaffold
      module Create
        module_function

        def web path_output
          path_scaffold = File.expand_path('./share/scaffold/web', ROOT)

          puts "Scaffolding project in #{path_output}..."
          RJSV::Core::Files.copy(path_scaffold, path_output)
          
        end
      end
    end
  end
end