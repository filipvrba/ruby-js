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
  if @options[:compile]
    compile_fun(path_f)
  else
    puts RubyJS::Helper.event_p("warning", "This '#{path_f}' file was edited, " +
                                "but it wasn't made into a js file.")
  end
end

def generate
  if @options[:generate]
    path_s = @options[:source]
    code_j = RubyJS.generate_cj path_s
    return code_j.get_ignore_r
  end

  return RubyJS::CodeJoin::TEST_N
end
ignore_cjfs = generate()

if @options[:compile]
  RubyJS.get_files(@options[:source]).each do |path_f|
    compile_fun(path_f)
  end
end

if @options[:watch]
  puts RubyJS::Helper.event_p("message", "There is now a watch for edited files.")
  path_s = @options[:source]
  
  RubyJS::Helper.create_dir(path_s)
  RubyJS.watch path_s, ignore_cjfs do |modified, added, removed|
    generate()

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
