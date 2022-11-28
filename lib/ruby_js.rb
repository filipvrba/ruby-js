require 'ruby2js'
require "ruby2js/filter/esm"
require "listen"
require "option_parser"

module RubyJS
  require "ruby_js/version"
  require "ruby_js/helper"
  require "ruby_js/constants"
  require "ruby_js/scaffold"
  require "ruby_js/code_join"

  def self.watch path, ignore = ""
    listener = Listen.to(path, only: /\.#{Constants::FILE_TYPE}$/, ignore: /#{ignore}/) do |modified, added, removed|
      yield modified, added, removed
    end
    listener.start
    sleep
  end

  def self.compile path_f, options
    path_o = Helper.absolute_path path_f, { path_s: options[:path_s], path_o: options[:path_o] }

    begin
      content_rb = Helper.open(path_f)
      content_js = Ruby2JS.convert(content_rb, eslevel: options[:eslevel]) unless content_rb.empty?

      path_write = Helper.write(path_o, content_js)
      puts Helper.event_p("compiled", path_o)
    rescue => exception
        # p exception.inspect
        puts Helper.event_p("error", "#{path_o} #{exception}")
    end
  end

  def self.generate_cj path_s, path_g
    path_hfd = path_s
    unless File.exist?(File.join(path_s, CodeJoin::FILE_HN))
      path_hfd = Dir.pwd
    end

    code_join = CodeJoin.new path_hfd
    get_files(path_s).each do |path_f|
      unless path_f.index(/#{code_join.get_ignore_r}/)
        code_join.add_file(path_f)
      end
    end

    content_join = code_join.to_s

    name_f = "#{code_join.json_cj.parse(:name).downcase.gsub(' ', '_')}_" +
             "#{Time.now.strftime("%ya%m%d")}.#{Constants::FILE_TYPE}"
    path_w = path_g.empty? ? path_s : path_g
    path_f = File.join(path_w, name_f)
    RubyJS::Helper.write(path_f, content_join)
    puts Helper.event_p("generated", path_f)
    
    return code_join
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