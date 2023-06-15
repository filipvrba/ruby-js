module RJSV
  module Core
    ##
    # Event module for handling fifo events. This is
    # so far a module for just the basic event
    # printing element.

    module Event
      module_function

      ##
      # Prints an event type using the puts() method
      # that shows the time, cli application name,
      # event and event message.

      def print(event, message = "")
        supplement = message.empty? ? message : " | #{message}"

        puts "#{Time.now.strftime("%l:%M:%S %p").lstrip} " +
        "[#{APP_NAME}] #{event.upcase}#{supplement}"
      end
    end
  end
end