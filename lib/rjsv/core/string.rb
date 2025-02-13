class String
  def camel_to_snake()
    self.gsub(/([a-z])([A-Z])/, '\1_\2').downcase
  end
end