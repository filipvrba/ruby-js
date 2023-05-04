module RubyJS
  module Scaffold
    require "json_parser"

    def self.create project
      path_as = File.expand_path("./share/template", ROOT)
      path_ao = File.join(Dir.pwd, project)

      puts "Scaffolding project in #{path_ao}..."
      unless Dir.exist? path_ao
        FileUtils.cp_r(path_as, path_ao)
      else
        files = Dir.glob("#{path_as}/**/*")
        files.each do |pas|
          pao = pas.sub(path_as, path_ao)
          FileUtils.cp_r(pas, pao)
        end
      end

      json_oc = JsonParser.new File.join(path_ao, "package.json")
      json_oc.parse :name, project.downcase

      json_cj = JsonParser.new File.join(path_ao, ".codejoin")
      json_cj.parse :name, project.downcase

      change_name_f(path_ao)
      install_vite(project, path_ao)
    end

    def self.change_name_f path_ao
      paths_bin_ao = Dir.glob("#{path_ao}/bin/*")
      paths_bin_ao.each do |p|
        content = Helper.open(p)
        content_ch = content.sub("APP_NAME", Constants::APP_NAME)
        Helper.write(p, content_ch)
      end
    end

    def self.install_vite project, path_ao
      is_done = system("cd #{path_ao} && npm install -D vite")
      if is_done
        puts "\nDone. Now run:\n\n  cd #{project}\n  bin/server\n\n"
      else
        wspaces = ' '*2
        puts "\nThe Vite library installation encountered an issue.\n" +
             "NodeJS is probably not installed on your machine.\n" +
             "Please rerun the Vite installation after installing NodeJS.\n" +
             "Use these instructions:\n\n" +
             "#{wspaces}cd #{project}\n" +
             "#{wspaces}npm install -D vite\n" +
             "#{wspaces}bin/server"
      end
    end
  end
end
