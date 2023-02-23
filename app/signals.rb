Signal.trap("INT") do
  puts "\n" + RubyJS::Helper.event_p("exiting")
  exit
end