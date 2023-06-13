module RJSV
  module Plugins
    module Scaffold
      module Create
        module_function

        def web path_output
          path_scaffold = File.expand_path('./share/scaffold/web', ROOT)

          puts "Scaffolding project in #{path_output}..."
          RJSV::Core::Files.copy(path_scaffold, path_output)
          
          json_package = JsonParser.new File.join(path_output, "package.json")
          json_package.parse :name, File.basename(path_output).downcase
        end

        def element(name, &block)
          name_class   = name.split(/[_-]/).map(&:capitalize).join
          name_file    = name.gsub('-', '_')
          name_element = name.gsub('_', '-')

          path_scaffold         = File.expand_path('./share/scaffold/element', ROOT)
          path_scaffold_element = File.join(path_scaffold, 'element.js.rb')
          path_scaffold_init    = File.join(path_scaffold, 'init.js.rb')
          
          content_element = RJSV::Core::Files.open(path_scaffold_element)
                            .sub('NAME_CLASS', name_class)
          content_init    = RJSV::Core::Files.open(path_scaffold_init)
                            .gsub('NAME_CLASS', name_class)
                            .sub('NAME_FILE', name_file)
                            .sub('NAME_ELEMENT', name_element)
          
          path_output_element = File.join(
            Dir.pwd, 'src', 'rb', 'elements', "elm_#{name_file}.js.rb"
          )
          path_output_init    = File.join(
            Dir.pwd, 'src', 'rb', 'elements.js.rb'
          )

          files = [
            {
              path: path_output_element,
              content: content_element,
              mode: 'w+'
            },
            {
              path: path_output_init,
              content: content_init,
              mode: 'a+'
            }
          ]

          files.each do |file|
            RJSV::Core::Files.write_with_dir(
              file[:content], file[:path], file[:mode]
            )
            block.call("Modified '.#{file[:path].sub(Dir.pwd, '')}'") if block
          end
          block.call("Element 'elm-#{name_element}'") if block
        end
      end#Create
    end
  end
end