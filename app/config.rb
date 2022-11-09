module Config
  module_function

  @default = JsonParser.new File.join(ROOT, 'config/default.json')
  # If eslevel doesn't already exist, the default value is used to initialize it.
  @default.on :eslevel, "2021"

  def get_eslevel
    @default.parse(:eslevel).to_i
  end
end