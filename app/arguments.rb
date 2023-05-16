require "option_parser"

@options = {
  compile: false,
  generate: nil,
  watch:   false,
  output:  Dir.pwd,
  output_type: RubyJS::Constants::FILE_TYPE_O,
  source:  Dir.pwd,
  eslevel: Config::get_eslevel,
  pid: nil,
}

OptionParser.parse do |parser|
  parser.banner(
    "Converts the syntax of ruby into javascript.\n" +
    "Usage: #{RubyJS::Constants::APP_NAME} [options]\n" +
    "\nOptions:"
  )
  parser.on( "-h", "--help", "Show help" ) do
    puts parser
    exit
  end
  parser.on( "-v", "--version", "Show version" ) do
    puts "Version is #{RubyJS::VERSION}"
    exit
  end
  parser.on( "-w", "--watch", "Watch scripts for changes and rerun commands." ) do
    @options[:watch] = true
  end
  parser.on( "-c", "--compile", "Compile to JavaScript and save as .#{@options[:output_type]} files." ) do
    @options[:compile] = true
  end
  parser.on( "-g PATH", "--generate PATH", "Copies every rjs file into a single rjs file." ) do |path|
    if File.directory?(path)
      @options[:generate] = path
    else
      @options[:generate] = ""
    end
  end
  parser.on("-o DIR", "--output DIR", "Set the output path or path/filename\n" +
            "for compiled JavaScript." ) do |dir|
    @options[:output] = dir
  end
  parser.on("-ot TYPE", "--output-type TYPE", "Set the output type.\n" +
            "The default: #{@options[:output_type]}" ) do |type|
    @options[:output_type] = type
  end
  parser.on("-s DIR", "--source DIR", "Set the source path or path/filename\n" +
            "for RubyJS." ) do |dir|
    @options[:source] = dir
  end
  parser.on("-es LEVEL", "--eslevel LEVEL", "ECMAScript versions for compilation.\n" +
            "The default: #{@options[:eslevel]}\n" + 
            "(Accepted level ranges 2015...2022.)") do |level|

    @options[:eslevel] = level.to_i
  end
  parser.on("--pid PROCESS", "", "When the pid is set, the SIGUSR1\n" +
            "signal is triggered." ) do |pid|
    @options[:pid] = pid.to_i
  end
  parser.on("--create PROJECT", nil, "Creates a new project using scaffolding." ) do |project|
    RubyJS::Scaffold.create project
    exit
  end
end