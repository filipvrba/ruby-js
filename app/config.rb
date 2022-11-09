@config = JsonParser.new File.join(ROOT, 'share/config.json')

# If eslevel doesn't already exist, the default value is used to initialize it.
@config.on :eslevel, "2021" 
