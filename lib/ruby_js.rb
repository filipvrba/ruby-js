require 'ruby2js'
require "ruby2js/filter/esm"
require "listen"
require "option_parser"

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

  def self.compile path_f, options
    content_rb = Helper.open(path_f)
    content_js = Ruby2JS.convert(content_rb, eslevel: options[:eslevel])

    path_o = Helper.absolute_path path_f, { path_s: options[:path_s], path_o: options[:path_o] }
    path_write = Helper.write(path_o, content_js)

    puts Helper.event_p("compiled", path_o)
  end

  def self.free path_f, options
    path_o = Helper.absolute_path path_f, options
    Helper.free path_o

    puts Helper.event_p("deleted", path_o)
  end

  def self.get_files(path_s)
    path = "#{path_s}/**/*.#{Constants::FILE_TYPE}"
    Dir.glob(path)
  end
end