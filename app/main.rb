require "ruby_js"
require_relative "config"
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
  if @options[:compile] == 0
    compile_fun(path_f)
  else
    puts "This '#{path_f}' file was edited, but it wasn't made into a js file."
  end
end

if @options[:compile] > -1
  def state_two
    path_s = @options[:source]
    path_f = RubyJS.generate_cj path_s
    compile_fun(path_f)
  end

  case @options[:compile]
  when 0..1
    RubyJS.get_files(@options[:source]).each do |path_f|
      compile_fun(path_f)
    end
    state_two if @options[:compile] == 1
  when 2
    state_two
  end
end

if @options[:watch]
  puts "There is now a watch for edited files."
  path_s = @options[:source]
  
  RubyJS::Helper.create_dir(path_s)
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
