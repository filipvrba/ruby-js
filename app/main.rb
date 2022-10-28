require "ruby_js"
require_relative "arguments"
require_relative "signals"

def compile path_f
  if @options[:compile]
    RubyJS.compile path_f, @options[:output]
  else
    puts "This '#{path_f}' file was edited, but it wasn't made into a js file."
  end
end

if @options[:compile]
  RubyJS.get_files(@options[:source]).each do |path_f|
    RubyJS.compile path_f, @options[:output]
  end
end

if @options[:watch]
  path_s = @options[:source]
  RubyJS.watch path_s do |modified, added, removed|
    unless added.empty?
      compile(added.last)
    end

    unless modified.empty?
      compile(modified.last)
    end

    unless removed.empty?
      RubyJS.free removed.last, @options[:output]
    end
  end
end
