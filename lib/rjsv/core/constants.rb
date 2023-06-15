module RJSV
  module Core
    ##
    # The module is reserved for handling classes and modules.
    # Thus, it is a manipulation of constant keywords.

    module Constants
      module_function

      ##
      # This method tries to find already initialized
      # classes from the mod (module) using the abstract
      # class RJSV::Plugin. It returns an array of classes.

      def get_classes(mod)
        mod.constants.map do |c|
          const = mod.const_get(c)

          if const.is_a?(Class) &&
              const.superclass.name == 'RJSV::Plugin'
            const
          elsif const.is_a? Module
            get_classes(const)
          else
            next
          end
        end.flatten.compact
      end#get_classes
    end
  end
end