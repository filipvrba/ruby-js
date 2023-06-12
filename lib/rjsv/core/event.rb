module RJSV
  module Core
    module Event
      module_function

      def print(event, message = "")
        supplement = message.empty? ? message : " | #{message}"

        puts "#{Time.now.strftime("%l:%M:%S %p").lstrip} " +
        "[#{APP_NAME}] #{event.upcase}#{supplement}"
      end
    end
  end
end