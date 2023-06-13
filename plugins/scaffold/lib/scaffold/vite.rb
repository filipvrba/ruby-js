module RJSV
  module Plugins
    module Scaffold
      module Vite
        module_function

        def install(path_output)
          system("cd #{path_output} && npm install")
        end
      end
    end
  end
end