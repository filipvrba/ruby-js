module RJSV
  module Plugins
    module Scaffold
      module Files
        module_function

        def generate_path_cinputs(file_path)
          path_with_suffixes     = Dir.glob(file_path)[0] 
          basename_with_suffixes = File.basename(path_with_suffixes)
          suffixes               = basename_with_suffixes.split('.')
                                    .select.with_index {|_, i| i > 0}.join('.')
          basename               = basename_with_suffixes.split('.').first
                                
          a_path_cinputs = File.dirname(file_path)

          index = a_path_cinputs.rindex("elements")
          if index
            new_path = a_path_cinputs.slice(0, index)
            return File.join new_path, 'components', basename.gsub('_', '-'), "c_inputs.#{suffixes}"
          end

          return nil
        end
      end
    end
  end
end