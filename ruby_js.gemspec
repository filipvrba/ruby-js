require_relative "lib/ruby_js/version"
require_relative "lib/ruby_js/constants"

EXECUTABLE = RubyJS::Constants::APP_NAME

Gem::Specification.new do |s|
  s.name        = "rubyjs-vite"
  s.version     = RubyJS::VERSION
  s.licenses    = ['MIT']
  s.summary     = "Converts the syntax of ruby into javascript."
  s.description = ""
  s.authors     = ["Filip Vrba"]
  s.email       = 'filipvrbaxi@gmail.com'
  s.files       = Dir.glob(["bin/#{EXECUTABLE}", 'app/**/*.rb', 'lib/**/*.rb', 'share/**/*'])
  s.homepage    = 'https://rubygems.org/gems/rubyjs-vite'
  s.metadata    = { "source_code_uri" => "https://github.com/filipvrba/ruby-js" }
  s.bindir      = 'bin'
  s.executables << EXECUTABLE
end
