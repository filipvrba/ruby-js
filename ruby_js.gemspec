require_relative "lib/ruby_js/version"
require_relative "lib/ruby_js/constants"
require_relative "lib/description"

EXECUTABLE = RubyJS::Constants::APP_NAME

Gem::Specification.new do |s|
  s.name        = "rubyjs-vite"
  s.version     = RubyJS::VERSION
  s.licenses    = ['MIT']
  s.summary     = "Converts the syntax of ruby into javascript."
  s.description = "#{Description::get_readme(2)}\n\nSee GitHub for further information. " +
                  "|> https://github.com/filipvrba/ruby-js"
  s.authors     = ["Filip Vrba"]
  s.email       = 'filipvrbaxi@gmail.com'
  s.files       = Dir.glob(["bin/#{EXECUTABLE}", 'app/**/*.rb', 'lib/**/*.rb', 'share/**/*'])
  s.homepage    = 'https://rubygems.org/gems/rubyjs-vite'
  s.metadata    = { "source_code_uri" => "https://github.com/filipvrba/ruby-js" }
  s.bindir      = 'bin'
  s.executables << EXECUTABLE

  s.add_dependency "ruby2js", "~> 5.0"
  s.add_dependency "listen", "~> 3.7"
end
