module RJSV
  module Plugins
    module Scaffold
      module Templates
        require 'securerandom'

        module_function

        def component_inputs(element_attributes)
          generate_variable_assignment = ->(id) do
            var_name = id.camel_to_snake
            { template: "@#{var_name} = @parent.query_selector('##{id}')", name: var_name }
          end

          input_variables  = element_attributes[:inputs].map do |h|
            new_hash             = generate_variable_assignment.call(h[:id])
            new_hash[:button_id] = h[:button_id]

            new_hash
          end
          button_variables = element_attributes[:buttons].map { |h| generate_variable_assignment.call(h[:id]) }
        
          window_functions = element_attributes[:buttons].map do |h|
            win_name = h[:onclick].camel_to_snake.gsub(/[\(\)]/, '')
            { template: "window.#{win_name} = #{win_name}", name: win_name, id: h[:id] }
          end
        
          button_to_inputs = element_attributes[:inputs].group_by { |input| input[:button_id] }
          l_related_inputs = lambda do |win_func_id|
            inputs = []
            input_variables.map do |h|
              if h[:button_id] == win_func_id
                inputs << h
              end
            end

            inputs
          end

          generate_window_function_definitions = ->(window_functions) do
            window_functions.map do |win_func|
              btn_id = win_func[:id]
              related_inputs = l_related_inputs.call(btn_id)
        
              # Vygenerujeme validaci pro všechny inputy přidružené k tomuto buttonu
              validations = related_inputs.map do |input|
                var_name = input[:name]
                "is_#{var_name} = have_#{var_name}()"
              end
        
              # Vygenerujeme změnu validace u každého inputu
              change_validations = related_inputs.map do |input|
                var_name = input[:name]
                "Bootstrap.change_valid_element(@#{var_name}, is_#{var_name})"
              end
        
              # Vygenerujeme podmínku na validitu všech inputů
              unless_check = related_inputs.map { |input| "is_#{input[:name]}" }.join(" && ")
              variable_values = related_inputs.map {|h| "#{h[:name]}: @#{h[:name]}.value," }.join("\n" + ' ' * 6)

              """
  def #{win_func[:name]}()
    #{validations.join("\n    ")}

    #{change_validations.join("\n    ")}

    unless #{unless_check}
      return
    end

    @parent.#{win_func[:name]}({
      #{variable_values}
    })
  end
              """.strip
            end.join("\n\n  ")
          end
        
          generate_input_event_listeners = ->(input_variables, is_connect) do
            action = is_connect ? 'add' : 'remove'
            input_variables.map { |h| "@#{h[:name]}.#{action}_event_listener('keypress', @h_#{h[:name]}_keypress)" }.join("\n    ")
          end
        
          keypress_handlers = input_variables.map do |h|
            input = h[:name]
            keypress_fn = "#{input}_keypress"
            { template: "@h_#{input}_keypress = lambda { #{keypress_fn}() }", keypress_fn: keypress_fn }
          end
        
          generate_keypress_functions = ->(keypress_handlers) do
            keypress_handlers.map do |h|
              "def #{h[:keypress_fn]}()\n    return unless event.key == 'Enter'\n\n    # TODO: input.focus()\n  end"
            end.join("\n\n  ")
          end

          generate_input_validation_functions = input_variables.map do |h|
            var_name = h[:name]
            "
  def have_#{var_name}()
    @#{var_name}.value.length > 0
  end"
          end

          template = <<~RUBY
            export default class CInputs
              def initialize(parent)
                @parent = parent
        
                #{keypress_handlers.map { |h| h[:template] }.join("\n    ")}
        
                #{input_variables.map { |h| h[:template] }.join("\n    ")}
                #{button_variables.map { |h| h[:template] }.join("\n    ")}
        
                #{window_functions.map { |h| h[:template] }.join("\n    ")}
              end
        
              def connected_callback()
                #{generate_input_event_listeners.call(input_variables, true)}
              end
        
              def disconnected_callback()
                #{generate_input_event_listeners.call(input_variables, false)}
              end
        
              #{generate_window_function_definitions.call(window_functions)}

              #{generate_keypress_functions.call(keypress_handlers)}
              #{generate_input_validation_functions.join("\n")}
            end
          RUBY
        
          return template
        end
      end#Templates
    end
  end
end