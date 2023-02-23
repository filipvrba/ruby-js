module RubyJS
  module Helper
    require 'fileutils'

    def self.open path
      result = ""

      if File.exist? path
        File.open path do |f|
          result = f.read
        end
      end

      result
    end

    def self.write path_o, content
      path_od = File.dirname(path_o)
      create_dir(path_od)

      file = File.new(path_o, "w+")
      file.write content
      file.close
    end

    def self.free path_fro
      # File
      File.delete(path_fro) if File.exists? path_fro
      # Dir
      path_dro = File.dirname(path_fro)
      Dir.delete(path_dro) if Dir.empty? path_dro
    end

    def self.event_p event, path_f = ""
      "#{Time.now.strftime("%l:%M:%S %p").lstrip} [#{Constants::APP_NAME}] #{event} #{path_f}"
    end

    def self.absolute_path path_f, path_options, prefix
      path_ffr = path_f.sub("#{Dir.pwd}/", '').sub(path_options[:path_s], '').sub(Constants::FILE_TYPE, prefix)
      path_ffa = File.join(path_options[:path_o], path_ffr)
      path_ffa
    end

    def self.create_dir path
      unless Dir.exist? path
        FileUtils.mkdir_p path
      end
    end
  end
end
