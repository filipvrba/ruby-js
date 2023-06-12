module RJSV
  class Plugin
    def description
      abstract_error('description()')
    end

    def name
      self.class.name.split('::')[-2].downcase
    end

    def arguments
      abstract_error('arguments()')
    end

    def init
      abstract_error('init()')
    end

    private
    def abstract_error(fn_name)
      raise "The '#{fn_name}' method is abstract, " +
            "it needs to be implemented in a nested '#{self.class.name}' class."
    end
  end
end