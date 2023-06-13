module RJSV
  module Core
    module Files
      require 'fileutils'

      module_function

      def open(path)
        if File.exist? path
          File.open path do |f|
            return f.read
          end
        end

        return nil
      end

      def write_with_dir(content, path)
        unless Dir.exist? File.dirname(path)
          FileUtils.mkdir_p File.dirname(path)
        end

        File.open path, "w+" do |f|
          f.write(content)
        end
      end

      def remove(path)
        File.delete(path) if File.exist?(path)
        path_dir = File.dirname(path)
        Dir.delete(path_dir) if Dir.empty?(path_dir)
      end

      def change_path_to_output(path, options_cli)
        path.sub(File.join(Dir.pwd, ''), '')
            .sub(options_cli[:source], '')
            .sub(/\.#{RJSV::Constants::SUFFIX_RB}$/, '')
            .prepend(options_cli[:output])
      end

      def find_all(path)
        path_all = File.join(path, '**', '*')
        Dir.glob("#{path_all}.*.#{RJSV::Constants::SUFFIX_RB}")
      end

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