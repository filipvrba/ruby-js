require_relative "lib/rjsv/version"

EXECUTABLE = 'rjsv'

Gem::Specification.new do |s|
  s.name        = "rubyjs-vite"
  s.version     = RJSV::VERSION
  s.licenses    = ['MIT']
  s.summary     = "CLI application with RB file transpilation that communicates with the Vite tool."
  s.description = "This is a tool that behaves like a CLI application. " +
                  "The tool can track RB files in real time and transpile " +
                  "them into JS files. RubyJS-Vite has its own ecosystem and " +
                  "various plugins can be added. This tool can also communicate " +
                  "with Vite tool for easier web development. " +
                  "Read the documentation for more information."
  s.authors     = ["Filip Vrba"]
  s.email       = 'filipvrbaxi@gmail.com'
  s.files       = Dir.glob(["bin/#{EXECUTABLE}", 'lib/**/*.rb', 'plugins/**/*.rb']) +
                  Dir.glob('share/**/*', File::FNM_DOTMATCH).select { |f| File.file?(f) }
  s.homepage    = 'https://rubygems.org/gems/rubyjs-vite'
  s.metadata    = {
    "source_code_uri" => "https://github.com/filipvrba/ruby-js",
    "documentation_uri" => "https://filipvrba.github.io/ruby-js/"
  }
  s.bindir      = 'bin'
  s.executables << EXECUTABLE

  s.add_dependency "ruby2js", "~> 5.1"
  s.add_dependency "listen", "~> 3.8"
end
