module RJSV
  module Core
    module Constants
      module_function

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