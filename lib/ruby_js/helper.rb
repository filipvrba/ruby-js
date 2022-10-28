module RubyJS
  module Helper
    def self.open path
      result = ""

      if File.exist? path
        File.open path do |f|
          result = f.read
        end
      end

      result
    end

    def self.write path, name, content, prefix = "js"
      absolute_path = File.join(path, name.sub(Constants::FILE_TYPE, prefix))

      unless Dir.exist? path
        FileUtils.mkdir_p File.dirname(path)
      end

      file = File.new(absolute_path, "w+")
      file.write content
      file.close

      return absolute_path
    end

    def self.free path_f, name, prefix = "js"
      absolute_path = File.join(path_f, name.sub(Constants::FILE_TYPE, prefix))
      is_exist = File.exists? path_f
      
      File.delete(absolute_path) if is_exist
      absolute_path
    end

    def self.event_p event, path_f
      "#{Time.now.strftime("%H:%M:%S")} - #{event} #{path_f}"
    end
  end
end
