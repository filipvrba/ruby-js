module RJSV
  module Core
    ##
    # The file module ensures safe handling of files.
    # It always checks if a file really exists on
    # the input path or if a certain folder exists
    # on the output path. It can also change
    # the absolute path or find all necessary files
    # for further manipulation.

    module Files
      require 'fileutils'

      module_function

      ##
      # Opens the file securely and returns the content
      # from the file. If the file does not exist,
      # it returns nil.

      def open(path)
        if File.exist? path
          File.open path do |f|
            return f.read
          end
        else
          files      = Dir.glob(path)
          have_files = files.length > 0
          if have_files
            return open(files.first)
          end
        end

        return nil
      end

      ##
      # Stores the file with the assigned container
      # by safely discovering its folder and, if necessary,
      # creating it when it does not exist in the path.
      # It can also be assigned a file write mode.

      def write_with_dir(content, path, mode = 'w+')
        unless Dir.exist? File.dirname(path)
          FileUtils.mkdir_p File.dirname(path)
        end

        File.open path, mode do |f|
          f.write(content)
        end
      end

      ##
      # Safely removes the file from the path.
      # If the file is the last one in the folder,
      # the folder is also deleted with the file.

      def remove(path)
        File.delete(path) if File.exist?(path)
        path_dir = File.dirname(path)
        Dir.delete(path_dir) if Dir.empty?(path_dir)
      end

      ##
      # The method is special in that it examines arguments
      # from the CLI and modifies the definition
      # path for the output path.

      def change_path_to_output(path, options_cli)
        find_output_path = lambda do
          index_s_path = options_cli[:source].split(RJSV::Constants::PATH_SPLIT)
                        .index {|e| path.index(e) != nil }
          s_path  = options_cli[:source].split(RJSV::Constants::PATH_SPLIT)[index_s_path]
          mo_path = options_cli[:output].split(RJSV::Constants::PATH_SPLIT)[index_s_path]

          unless mo_path
            mo_path = options_cli[:output].split(RJSV::Constants::PATH_SPLIT)[0]
            Core::Event.print('warning', "Output path not found for '#{s_path}'.")
          end

          return path.sub(s_path, mo_path)
        end

        find_output_path.call()
          .sub(/\.#{RJSV::Constants::SUFFIX_RB}$/, '')
          .sub(File.join(Dir.pwd(), ''), '')
      end

      ##
      # Finds all files with the extension '.*.rb'
      # from the defined paths.

      def find_all(paths)
        path_all = []
        paths.split(RJSV::Constants::PATH_SPLIT).each do |path|
          path_all << File.join(path, '**', '*') + ".*.#{RJSV::Constants::SUFFIX_RB}"
        end

        Dir.glob(path_all)
      end

      ##
      # Copies all files from the input path to the
      # output path. This is a method that copies all
      # files even those that are invisible to the
      # UNIX system (dot file).

      def copy(path_input, path_output)
        files = Dir.glob("#{path_input}/**/*", File::FNM_DOTMATCH)
                .select { |f| File.file?(f) }
        files.each do |path_file|
          path_cp = path_file.sub(path_input, path_output)
          FileUtils.mkdir_p File.dirname(path_cp)
          FileUtils.cp(path_file, path_cp)
        end
      end
    end
  end
end