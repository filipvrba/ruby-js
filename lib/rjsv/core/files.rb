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
            .sub(/\.#{Constants::SUFFIX_RB}$/, '')
            .prepend(options_cli[:output])
      end

      def find_all(path)
        path_all = File.join(path, '**', '*')
        Dir.glob("#{path_all}.*.#{Constants::SUFFIX_RB}")
      end
    end
  end
end