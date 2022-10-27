require "option_parser"

OptionParser.parse do |parser|
  parser.banner( "This is test app" )
  parser.on( "-h", "--help", "Show help" ) do
      puts parser
  end
  parser.on( "-v", "--version", "Show version" ) do
      puts "Version is 1.0.0"
  end
  parser.on( "-o NAME", "--open NAME", "This argument, opened an file." ) do |name|
      puts "Opening file..."
      File.open( name ) do |data|
          puts data.read
      end
  end
end