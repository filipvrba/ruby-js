module RJSV
  module Plugins
    module Docs
      module States
        require 'json'

        module_function

        def generate_json_state(options)
          path = options[:generate]
          if path
            input_path = File.expand_path(path, Dir.pwd)
            output_path_relative = File.join('src', 'json', 'docs_api.json')
            output_path = File.join(Dir.pwd, output_path_relative)

            docs_api = Generate.docs_api(input_path)
            docs_api_json = JSON.pretty_generate({
              docs_api: docs_api,
              generated: Time.now.strftime("%d. %m. %Y %H:%M:%S").lstrip,
              version: VERSION,
            })

            RJSV::Core::Files.write_with_dir(docs_api_json, output_path)
            RJSV::Core::Event.print('docs', "A '#{output_path_relative}' file has been generated.")
          end
        end
      end
    end
  end
end