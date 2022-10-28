require "ruby_js"
require_relative "arguments"
require_relative "signals"

def compile_fun path_f
  RubyJS.compile path_f, {
    eslevel: @options[:eslevel],
    path_s:  @options[:source],
    path_o:  @options[:output]
  }
end

def compile path_f
  if @options[:compile]
    compile_fun(path_f)
  else
    puts "This '#{path_f}' file was edited, but it wasn't made into a js file."
  end
end

if @options[:compile]
  RubyJS.get_files(@options[:source]).each do |path_f|
    compile_fun(path_f)
  end
end

if @options[:watch]
  puts "There is now a watch for edited files."

  path_s = @options[:source]
  RubyJS.watch path_s do |modified, added, removed|
    unless added.empty?
      compile(added.last)
    end

    unless modified.empty?
      compile(modified.last)
    end

    unless removed.empty?
      RubyJS.free removed.last, {
        path_s:  @options[:source],
        path_o:  @options[:output]
      }
    end
  end
end
