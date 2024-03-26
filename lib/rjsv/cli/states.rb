module RJSV
  module CLI
    ##
    # Here are the code blocks that are activated when
    # the main function is triggered.
    # Functions communicate using arguments passed via
    # the command line, which are passed as options_cli.
    # These functions include translate and watch,
    # which can be reused when creating custom plugins.

    module States
      module_function

      ##
      # Block of code that handles the transpilation of script.
      # This is opening a Ruby script container file,
      # which is then converted into a JavaScript file.
      # The file is saved to the output path.

      def translate_state(path, options_cli)
        if options_cli[:translate]
          content_ruby = Core::Files.open(path)
          if content_ruby && path
            path_output = Core::Files.change_path_to_output(path, options_cli)
            RJSV::Translate.ruby_to_js_with_write(content_ruby, path_output) do |err|
              Core::Event.print('error', "#{path.sub(File.join(Dir.pwd, ''), '')} #{err}")
              return
            end
            Core::Event.print('translated', path_output)
          end
        end
      end

      ##
      # Block of code that tracks files under the input path.
      # If a file has been logged, several events are performed
      # such as to add, modify and remove logged files.
      # These then trigger procedural methods to process the requests.

      def watch_state(options_cli)
        if options_cli[:watch]
          Core::Event.print('message', 'There is now a watch for edited files.')
          RJSV::Watch.modified_files(options_cli[:source]) do |modified, added, removed|
            unless added.empty?
              added.each do |path|
                translate_state(path, options_cli)
              end
            end
        
            unless modified.empty?
              modified.each do |path|
                translate_state(path, options_cli)
              end
            end
        
            unless removed.empty?
              removed.each do |path|
                path_output = Core::Files.change_path_to_output(path, options_cli)
                Core::Files.remove(path_output)
                Core::Event.print('deleted', path_output)
              end
            end
          end
        end
      end#watch_state
    end#States
  end
end