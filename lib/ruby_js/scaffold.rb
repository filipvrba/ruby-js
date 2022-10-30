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
      %x(cd #{path_ao} && npm install -D vite)
      puts "\nDone. Now run:\n\n  cd #{project}\n  bin/server\n\n"
    end
  end
end
