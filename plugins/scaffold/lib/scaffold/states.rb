module RJSV
  module Plugins
    module Scaffold
      module States
        module_function

        def create_web_state(options)
          project = options[:create_web]
          if project
            path_output = File.join(Dir.pwd, project)
            Create.web(path_output)
            is_installed = Vite.install(path_output)

            if is_installed
              puts "\nDone. Now run:\n\n  cd #{project}\n  bin/server\n\n"
            else
              wspaces = ' '*2
              puts "\nThe Vite library installation encountered an issue.\n" +
                   "NodeJS is probably not installed on your machine.\n" +
                   "Please rerun the Vite installation after installing NodeJS.\n" +
                   "Use these instructions:\n\n" +
                   "#{wspaces}cd #{project}\n" +
                   "#{wspaces}npm install -D vite\n" +
                   "#{wspaces}bin/server"
            end
          end
        end
      end#States
    end
  end
end