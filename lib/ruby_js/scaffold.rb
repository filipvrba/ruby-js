module RubyJS
  module Scaffold
    require "json_parser"

    def self.create project
      path_as = File.expand_path("./share/template", ROOT)
      path_ao = File.join(Dir.pwd, project)

      puts "Scaffolding project in #{path_ao}..."
      FileUtils.copy_entry path_as, path_ao

      json_oc = JsonParser.new File.join(path_ao, "package.json")
      json_oc.parse :name, project.downcase

      change_server_f(path_ao)
      install_vite(project, path_ao)
    end

    def self.change_server_f path_ao
      path_bin_ao = "#{path_ao}/bin/server"
      content = Helper.open(path_bin_ao)
      content_ch = content.sub("APP_NAME", Constants::APP_NAME)
      Helper.write(path_bin_ao, content_ch)
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
