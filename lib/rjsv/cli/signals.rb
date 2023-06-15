module RJSV
  module CLI
    ##
    # Dedicated to all signals for Unix system.
    # Here we find the signal for INT.

    module Signals
      Signal.trap("INT") do
        puts
        Core::Event.print("exiting")
        exit
      end
    end
  end
end