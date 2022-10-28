require 'ruby2js'
require "listen"
require "option_parser"

# TODO: Fix the inherit directory for the compile function.

module RubyJS
  require "ruby_js/version"
  require "ruby_js/helper"
  require "ruby_js/constants"

  def self.watch path
    listener = Listen.to(path, only: /\.#{Constants::FILE_TYPE}$/) do |modified, added, removed|
      yield modified, added, removed
    end
    listener.start
    sleep
  end

  def self.compile path_s, path_o
    content_rb = Helper.open(path_s)
    content_js = Ruby2JS.convert(content_rb)
    path_write = Helper.write(path_o, File.basename(path_s), content_js)

    puts Helper.event_p("compiled", path_write)
  end

  def self.free path_s, path_o
    result = Helper.free path_o, File.basename(path_s)
    puts Helper.event_p("deleted", result)
  end

  def self.get_files(path_s)
    path = "#{path_s}/**/*.#{Constants::FILE_TYPE}"
    Dir.glob(path)
  end
end