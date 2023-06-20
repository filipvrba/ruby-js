module RJSV
  module Plugins
    module Markdown
      module States
        module_function

        def to_html options
          if options[:to_html]
            path_input_raw  = File.join(Dir.pwd, 'src', 'md')
            files_md = Dir.glob(File.join(path_input_raw, '**', '*.md'))

            if files_md.empty?
              path_relative_input_raw = path_input_raw.sub(
                File.join(Dir.pwd, ''), '')
              RJSV::Core::Event.print('to-html',
                "No markdown file was found in " +
                "the #{path_relative_input_raw} folder."
              )
              return
            end

            open_and_write(files_md)
          end
        end

        def open_and_write(files_markdown)
          path_output_raw = File.join(Dir.pwd, 'src', 'html', 'generate')

          files_markdown.each do |path_file|
            content_md   = RJSV::Core::Files.open(path_file)
            content_html = Parser.render_html(content_md)
            name_file = File.basename(path_file).sub('.md', '.html')
            path_output_file = File.join(path_output_raw, name_file)
            path_relative_output_file = path_output_file.sub(
              File.join(Dir.pwd, ''), '')

            RJSV::Core::Files.write_with_dir(content_html, path_output_file)
            RJSV::Core::Event.print('to-html',
              "Saved #{path_relative_output_file} file."
            )
          end
        end
      end#States
    end
  end
end