require "option_parser"

@options = {
  compile: false,
  watch:   false,
  output:  Dir.pwd,
  source:  Dir.pwd
}

OptionParser.parse do |parser|
  parser.banner(
    "Converts the syntax of ruby into javascript.\n" +
    "Usage: rubyjs [options] path/to/script.rjs\n" +
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
  parser.on( "-c", "--compile", "Compile to JavaScript and save as .js files." ) do
    @options[:compile] = true
  end
  parser.on( "-w", "--watch", "Watch scripts for changes and rerun commands." ) do
    @options[:watch] = true
  end
  parser.on("-o DIR", "--output DIR", "Set the output path or path/filename\n" +
            "for compiled JavaScript." ) do |dir|
    @options[:output] = dir
  end
  parser.on("-s DIR", "--source DIR", "Set the source path or path/filename\n" +
            "for RubyJS." ) do |dir|
    @options[:source] = dir
  end
end