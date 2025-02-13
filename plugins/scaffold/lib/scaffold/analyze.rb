module RJSV
  module Plugins
    module Scaffold
      module Analyze
        require 'nokogiri'

        module_function

        def html_strings(path)
          ruby_code = RJSV::Core::Files.open(path)
          
          regex            = /"""(.*?)"""/m
          matches          = ruby_code.scan(regex)
          template_strings = matches.map {|match| match[0].strip }

          return template_strings
        end

        def element_attributes(contents)
          inputs  = []
          buttons = []

          contents.each do |content|
            doc = Nokogiri::HTML(content)
            inputs  = doc.css('input[id]')
            buttons = doc.css('button[id]')
          end

          h_inputs  = []
          h_buttons = []

          inputs.each do |input|
            h_inputs << {
              id:        input['id'],
              type:      input['type'],
              button_id: input['data-button-id'],
            }
          end

          buttons.each do |button|
            h_buttons << {
              id:      button['id'],
              onclick: button['onclick'],
            }
          end

          {
            inputs:  h_inputs,
            buttons: h_buttons,
          }
        end

        def element_path(name, path = nil)
          path_elements    = path || File.join(Dir.pwd, 'src', 'rb', 'elements.*.rb')
          content_elements = RJSV::Core::Files.open(path_elements)
      
          return unless content_elements
        
          package_imports = extract_package_imports(content_elements)
          import_map      = extract_import_map(content_elements)
          elements        = extract_elements(content_elements)
      
          if package_imports.any?
            result_package_imports = resolve_package_imports(name, package_imports, path_elements)
            
            if result_package_imports
              return result_package_imports
            else
              resolve_element_path(name, elements, import_map, path_elements)
            end
          else
            resolve_element_path(name, elements, import_map, path_elements)
          end
        end

        # Private
        
        def extract_package_imports(content)
          content.scan(/import\s+['"]([^'"]+)['"]\s*$/).flatten
        end
        
        def extract_import_map(content)
          imports = content.scan(/import\s+['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]/)
          imports.to_h
        end
        
        def extract_elements(content)
          content.scan(/window\.custom(?:_elements|Elements)\.define\s*\(\s*['"]([^'"]+)['"]\s*,\s*([\w\.]+)/)
        end
        
        def resolve_element_path(name, elements, import_map, path_elements)
          norm_name = normalize_name(name)

          elements.each do |element|
            if element.first == norm_name
              relevant_path = import_map[element.last].sub(/^\.\//, '')
              return File.join(File.dirname(path_elements), relevant_path.concat('.*.rb'))
            end
          end
        
          nil
        end
        
        def resolve_package_imports(name, package_imports, path_elements)
          package_imports.each do |package_import|
            package_path_element = package_import.sub(/^\./, File.dirname(path_elements)).concat('.*.rb')
            
            resutl_element_path = element_path(name, package_path_element)
            return resutl_element_path if resutl_element_path
          end
        
          nil
        end
        
        def normalize_name(name)
          name.downcase.sub(/^elm-/, '').prepend('elm-').gsub(/[._]/, '-')
        end        
      end#Analyze
    end
  end
end