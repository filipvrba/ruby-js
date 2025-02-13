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
                   "#{wspaces}npm install\n" +
                   "#{wspaces}bin/server"
            end
          end
        end

        def create_element_state(options)
          name = options[:element]
          if name
            Create.element(name) do |message|
              RJSV::Core::Event.print('scaffold', message)
            end
          end
        end

        def create_inputs_state(options)
          name = options[:inputs]
          if name
            file_path = Analyze.element_path(name)
            if file_path
              html_strings       = Analyze.html_strings(file_path)
              element_attributes = Analyze.element_attributes(html_strings)

              Create.component_inputs(element_attributes)
            else
              RJSV::Core::Event.print('scaffold', "This '#{name}' element does not exist.")
            end
          else
            RJSV::Core::Event.print('scaffold', "Cannot find the 'elements' file.")
          end
        end

        
      end#States
    end
  end
end