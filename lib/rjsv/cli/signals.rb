module RJSV
  module CLI
    module Signals
      Signal.trap("INT") do
        puts
        Core::Event.print("exiting")
        exit
      end
    end
  end
end