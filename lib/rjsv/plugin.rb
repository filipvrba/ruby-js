module RJSV
  ##
  # Abstract 'class' for creating initialization plagins.
  # They are teachable for defining basic information
  # and is the starting point for triggering functions
  # using the init() function. If we are creating
  # a custom plugin, we need to inherit this 'class'
  # into its own 'class'.

  class Plugin
    ##
    # Description of the plugin that is printed to the CLI during help.

    def description
      abstract_error('description()')
    end

    ##
    # This function is not mandatory and automatically
    # defines the 'module' name according to
    # the plugin 'module'.

    def name
      self.class.name.split('::')[-2].downcase
    end

    ##
    # The method should pass an initialization
    # method for all arguments of this plugin.

    def arguments
      abstract_error('arguments()')
    end

    ##
    # The method that is the main initialization
    # block for the code that the plugin
    # should execute.

    def init
      abstract_error('init()')
    end

    private
    ##
    # A private method that raises an error
    # message about an abstract class with
    # a function name.

    def abstract_error(fn_name)
      raise "The '#{fn_name}' method is abstract, " +
            "it needs to be implemented in a nested '#{self.class.name}' class."
    end
  end
end