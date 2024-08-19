module RJSV
  ##
  # Module for real-time monitoring of files on
  # the local disk. It uses the 'listen' library
  # for this function. There is only one method
  # that can be loaded here which triggers everything.

  module Watch
    require "listen"

    module_function

    ##
    # Tracks modified files in the path that is
    # defined as the source directory. When this
    # function is called, the event listener is triggered
    # for events such as modified, added, and deleted
    # file events. Therefore, the method can put
    # the application to sleep and silently monitor
    # the event process. It watches all files with
    # extension '.*.rb', which asterisk means
    # any sub extension such as '.js'.

    def modified_files(*paths, &block)
      listener = Listen.to(*paths,
        only: /\..*\.#{Constants::SUFFIX_RB}$/
      ) do |m, a, r|
        
        block.call(m, a, r) if block
      end
      listener.start
      sleep
    end
  end
end